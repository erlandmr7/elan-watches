import re
from flask import Blueprint, request, jsonify, session, current_app
from werkzeug.security import generate_password_hash
from database import get_db
from models import UserModel
from decorators import login_required, admin_required, csrf_protect

users_bp = Blueprint('users', __name__, url_prefix='/api/users')

EMAIL_REGEX = re.compile(r'^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$')

def validate_user_payload(data, is_creation=False):
    """Valida los datos recibidos para creación o edición de usuarios."""
    errors = []
    
    full_name = str(data.get('full_name', '')).strip()
    if not full_name or len(full_name) < 2:
        errors.append("El nombre completo debe tener al menos 2 caracteres.")

    email = str(data.get('email', '')).strip()
    if not email or not EMAIL_REGEX.match(email):
        errors.append("Debe proporcionar un correo electrónico con formato válido.")

    role = str(data.get('role', '')).strip().upper()
    allowed_roles = current_app.config['ROLES_PERMITIDOS']
    if role not in allowed_roles:
        errors.append(f"El rol debe ser uno de los permitidos: {', '.join(allowed_roles)}.")

    status = str(data.get('status', 'ACTIVO')).strip().upper()
    allowed_status = current_app.config['ESTADOS_PERMITIDOS']
    if status not in allowed_status:
        errors.append(f"El estado debe ser uno de: {', '.join(allowed_status)}.")

    if is_creation:
        password = str(data.get('password', ''))
        if not password or len(password) < 8:
            errors.append("La contraseña debe tener una longitud mínima de 8 caracteres.")

    return errors, {
        "full_name": full_name,
        "email": email,
        "role": role,
        "status": status,
        "password": data.get('password', '') if is_creation else None
    }

@users_bp.route('', methods=['GET'])
@login_required
@admin_required
def list_users():
    """Lista todos los usuarios del sistema (solo administradores)."""
    db = get_db()
    users = UserModel.get_all(db)
    return jsonify({
        "total": len(users),
        "users": users
    }), 200

@users_bp.route('', methods=['POST'])
@login_required
@admin_required
@csrf_protect
def create_user():
    """Crea un nuevo usuario en el sistema con contraseña hasheada."""
    data = request.get_json(silent=True) or {}
    errors, cleaned = validate_user_payload(data, is_creation=True)
    
    if errors:
        return jsonify({
            "error": "VALIDATION_ERROR",
            "message": "Errores de validación en los datos enviados.",
            "details": errors
        }), 400

    db = get_db()
    # Verificar si el correo ya existe
    existing_user = UserModel.find_by_email(db, cleaned['email'])
    if existing_user:
        return jsonify({
            "error": "EMAIL_ALREADY_EXISTS",
            "message": f"Ya existe una cuenta registrada con el correo '{cleaned['email']}'."
        }), 409

    # Generar hash seguro con Werkzeug
    password_hash = generate_password_hash(cleaned['password'])

    created_user = UserModel.create(
        db=db,
        full_name=cleaned['full_name'],
        email=cleaned['email'],
        password_hash=password_hash,
        role=cleaned['role'],
        status=cleaned['status']
    )

    return jsonify({
        "message": "Usuario creado exitosamente.",
        "user": created_user
    }), 201

@users_bp.route('/<int:user_id>', methods=['GET'])
@login_required
@admin_required
def get_user_detail(user_id):
    """Consulta la información detallada de un usuario específico."""
    db = get_db()
    user = UserModel.find_by_id(db, user_id)
    if not user:
        return jsonify({
            "error": "NOT_FOUND",
            "message": f"No se encontró ningún usuario con el identificador {user_id}."
        }), 404

    return jsonify({
        "user": user
    }), 200

@users_bp.route('/<int:user_id>', methods=['PUT'])
@login_required
@admin_required
@csrf_protect
def update_user(user_id):
    """Actualiza los datos de un usuario existente (nombre, correo, rol, estado)."""
    data = request.get_json(silent=True) or {}
    errors, cleaned = validate_user_payload(data, is_creation=False)

    if errors:
        return jsonify({
            "error": "VALIDATION_ERROR",
            "message": "Errores de validación en los datos enviados.",
            "details": errors
        }), 400

    db = get_db()
    target_user = UserModel.find_by_id(db, user_id)
    if not target_user:
        return jsonify({
            "error": "NOT_FOUND",
            "message": f"No se encontró ningún usuario con el identificador {user_id}."
        }), 404

    # Verificar colisión de correo con otro usuario distinto
    existing_with_email = UserModel.find_by_email(db, cleaned['email'])
    if existing_with_email and existing_with_email['id'] != user_id:
        return jsonify({
            "error": "EMAIL_ALREADY_EXISTS",
            "message": f"El correo electrónico '{cleaned['email']}' ya está en uso por otro usuario."
        }), 409

    current_session_uid = session.get('user_id')

    # REGLA DE SEGURIDAD 1: Un administrador no puede desactivarse a sí mismo
    if current_session_uid == user_id and cleaned['status'] == 'INACTIVO':
        return jsonify({
            "error": "OPERATION_FORBIDDEN",
            "message": "Operación denegada: Un administrador no puede desactivar su propia cuenta."
        }), 400

    # REGLA DE SEGURIDAD 2: No permitir desactivar o cambiar el rol del ÚLTIMO administrador activo
    if target_user['role'] == 'ADMINISTRADOR' and target_user['status'] == 'ACTIVO':
        if cleaned['status'] == 'INACTIVO' or cleaned['role'] != 'ADMINISTRADOR':
            active_admins = UserModel.count_active_admins(db)
            if active_admins <= 1:
                return jsonify({
                    "error": "LAST_ADMIN_PROTECTED",
                    "message": "Operación denegada: No es posible desactivar ni cambiar el rol del último administrador activo del sistema."
                }), 400

    # Actualizar registro
    updated_user = UserModel.update(
        db=db,
        user_id=user_id,
        full_name=cleaned['full_name'],
        email=cleaned['email'],
        role=cleaned['role'],
        status=cleaned['status']
    )

    # Si el usuario editado es el mismo de la sesión actual, actualizar nombre y correo en la sesión
    if current_session_uid == user_id:
        session['user_name'] = updated_user['full_name']
        session['user_email'] = updated_user['email']
        session['user_role'] = updated_user['role']

    return jsonify({
        "message": "Usuario actualizado exitosamente.",
        "user": updated_user
    }), 200

@users_bp.route('/<int:user_id>', methods=['DELETE'])
@login_required
@admin_required
@csrf_protect
def delete_user(user_id):
    """Realiza la desactivación lógica (borrado suave) de un usuario."""
    db = get_db()
    target_user = UserModel.find_by_id(db, user_id)
    if not target_user:
        return jsonify({
            "error": "NOT_FOUND",
            "message": f"No se encontró ningún usuario con el identificador {user_id}."
        }), 404

    current_session_uid = session.get('user_id')

    # REGLA DE SEGURIDAD 1: Un administrador no puede desactivarse a sí mismo
    if current_session_uid == user_id:
        return jsonify({
            "error": "OPERATION_FORBIDDEN",
            "message": "Operación denegada: No puedes desactivar tu propia cuenta activa de administrador."
        }), 400

    # REGLA DE SEGURIDAD 2: No se puede desactivar al último administrador activo
    if target_user['role'] == 'ADMINISTRADOR' and target_user['status'] == 'ACTIVO':
        active_admins = UserModel.count_active_admins(db)
        if active_admins <= 1:
            return jsonify({
                "error": "LAST_ADMIN_PROTECTED",
                "message": "Operación denegada: No es posible desactivar al último administrador activo del sistema."
            }), 400

    # Desactivación lógica (status = 'INACTIVO')
    updated_user = UserModel.set_status(db, user_id, 'INACTIVO')

    return jsonify({
        "message": f"El usuario '{target_user['full_name']}' ha sido desactivado lógicamente.",
        "user": updated_user
    }), 200
