import re
import secrets
from flask import Blueprint, request, jsonify, session, current_app, make_response
from werkzeug.security import check_password_hash
from database import get_db
from models import UserModel

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

EMAIL_REGEX = re.compile(r'^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$')

@auth_bp.route('/login', methods=['POST'])
def login():
    """Inicia sesión validando credenciales y estado del usuario."""
    data = request.get_json(silent=True) or {}
    email = str(data.get('email', '')).strip()
    password = str(data.get('password', ''))

    # Validaciones del lado del servidor
    if not email or not password:
        return jsonify({
            "error": "VALIDATION_ERROR",
            "message": "El correo electrónico y la contraseña son campos obligatorios."
        }), 400

    if not EMAIL_REGEX.match(email):
        return jsonify({
            "error": "INVALID_EMAIL",
            "message": "El formato del correo electrónico es inválido."
        }), 400

    db = get_db()
    # Buscar usuario incluyendo hash para verificación interna
    user = UserModel.find_by_email(db, email, include_hash=True)

    if not user or not check_password_hash(user['password_hash'], password):
        return jsonify({
            "error": "INVALID_CREDENTIALS",
            "message": "Credenciales incorrectas. Verifique su correo y contraseña."
        }), 401

    # Verificar si la cuenta está inactiva
    if user['status'] != 'ACTIVO':
        return jsonify({
            "error": "ACCOUNT_INACTIVE",
            "message": "Su cuenta se encuentra desactivada. Comuníquese con la administración."
        }), 403

    # Establecer sesión segura
    session.clear()
    session['user_id'] = user['id']
    session['user_email'] = user['email']
    session['user_name'] = user['full_name']
    session['user_role'] = user['role']
    session['csrf_token'] = secrets.token_hex(32)
    session.permanent = True

    user_info = UserModel.to_dict(user, include_hash=False)
    
    resp = make_response(jsonify({
        "message": "Inicio de sesión exitoso.",
        "user": user_info,
        "csrf_token": session['csrf_token']
    }), 200)

    # Cookie XSRF-TOKEN legible por el cliente para adjuntar en encabezados X-CSRF-Token
    resp.set_cookie(
        'XSRF-TOKEN',
        session['csrf_token'],
        httponly=False,
        samesite=current_app.config['SESSION_COOKIE_SAMESITE'],
        secure=current_app.config['SESSION_COOKIE_SECURE']
    )
    return resp

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Cierra la sesión actual y elimina cookies asociadas."""
    session.clear()
    resp = make_response(jsonify({
        "message": "Sesión finalizada con éxito."
    }), 200)
    resp.delete_cookie(current_app.config['SESSION_COOKIE_NAME'])
    resp.delete_cookie('XSRF-TOKEN')
    return resp

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    """Retorna la información del usuario autenticado en la sesión actual."""
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({
            "authenticated": False,
            "message": "No hay sesión activa."
        }), 401

    db = get_db()
    user = UserModel.find_by_id(db, user_id, include_hash=False)

    if not user:
        session.clear()
        return jsonify({
            "authenticated": False,
            "message": "Usuario no encontrado en la base de datos."
        }), 401

    if user['status'] != 'ACTIVO':
        session.clear()
        return jsonify({
            "authenticated": False,
            "error": "ACCOUNT_INACTIVE",
            "message": "Su cuenta ha sido desactivada."
        }), 403

    # Asegurar token CSRF en sesión
    if not session.get('csrf_token'):
        session['csrf_token'] = secrets.token_hex(32)

    resp = make_response(jsonify({
        "authenticated": True,
        "user": user,
        "csrf_token": session['csrf_token']
    }), 200)

    resp.set_cookie(
        'XSRF-TOKEN',
        session['csrf_token'],
        httponly=False,
        samesite=current_app.config['SESSION_COOKIE_SAMESITE'],
        secure=current_app.config['SESSION_COOKIE_SECURE']
    )
    return resp
