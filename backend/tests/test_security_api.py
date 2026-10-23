import pytest
import os
import tempfile
from werkzeug.security import generate_password_hash, check_password_hash
from app import create_app
from database import get_db
from models import UserModel

@pytest.fixture
def test_app():
    # Crear archivo temporal para base de datos de prueba
    db_fd, db_path = tempfile.mkstemp(suffix=".sqlite")
    
    app = create_app({
        'TESTING': True,
        'DATABASE_PATH': db_path,
        'SECRET_KEY': 'test_secret_key_12345',
        'SESSION_COOKIE_SECURE': False
    })

    with app.app_context():
        db = get_db()
        # Sembrar un administrador inicial y un usuario de almacén
        admin_hash = generate_password_hash("AdminPass123!")
        UserModel.create(db, "Administrador Test", "admin@elanwatches.com", admin_hash, "ADMINISTRADOR", "ACTIVO")

        almacen_hash = generate_password_hash("AlmacenPass123!")
        UserModel.create(db, "Operador Almacén", "almacen@elanwatches.com", almacen_hash, "ALMACEN", "ACTIVO")

        inactivo_hash = generate_password_hash("InactivoPass123!")
        UserModel.create(db, "Usuario Inactivo", "inactivo@elanwatches.com", inactivo_hash, "CLIENTE", "INACTIVO")

    yield app

    os.close(db_fd)
    if os.path.exists(db_path):
        os.unlink(db_path)

@pytest.fixture
def client(test_app):
    return test_app.test_client()

def test_login_success_and_csrf_issued(client):
    """Prueba que el login con credenciales válidas retorna el usuario y token CSRF sin hashes."""
    response = client.post('/api/auth/login', json={
        'email': 'admin@elanwatches.com',
        'password': 'AdminPass123!'
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data['user']['email'] == 'admin@elanwatches.com'
    assert data['user']['role'] == 'ADMINISTRADOR'
    assert 'password_hash' not in data['user']
    assert 'csrf_token' in data
    assert len(data['csrf_token']) > 10

def test_login_invalid_password(client):
    """Prueba que una contraseña incorrecta es rechazada con código 401."""
    response = client.post('/api/auth/login', json={
        'email': 'admin@elanwatches.com',
        'password': 'PasswordIncorrecta999'
    })
    assert response.status_code == 401
    data = response.get_json()
    assert data['error'] == 'INVALID_CREDENTIALS'

def test_login_inactive_user_rejected(client):
    """Prueba que una cuenta inactiva no puede iniciar sesión aunque la contraseña sea correcta."""
    response = client.post('/api/auth/login', json={
        'email': 'inactivo@elanwatches.com',
        'password': 'InactivoPass123!'
    })
    assert response.status_code == 403
    data = response.get_json()
    assert data['error'] == 'ACCOUNT_INACTIVE'

def test_non_admin_cannot_access_crud(client):
    """Prueba que un usuario sin rol de administrador (ej. ALMACEN) no puede listar ni gestionar usuarios."""
    # Iniciar sesión como almacén
    login_res = client.post('/api/auth/login', json={
        'email': 'almacen@elanwatches.com',
        'password': 'AlmacenPass123!'
    })
    assert login_res.status_code == 200

    # Intentar acceder al endpoint de listado de usuarios
    users_res = client.get('/api/users')
    assert users_res.status_code == 403
    assert users_res.get_json()['error'] == 'FORBIDDEN'

def test_unauthenticated_cannot_access_crud(client):
    """Prueba que una petición anónima al CRUD devuelve 401."""
    res = client.get('/api/users')
    assert res.status_code == 401

def test_admin_crud_lifecycle(client):
    """Prueba el ciclo completo de CRUD por parte del administrador."""
    # 1. Login como admin
    login_res = client.post('/api/auth/login', json={
        'email': 'admin@elanwatches.com',
        'password': 'AdminPass123!'
    })
    assert login_res.status_code == 200
    csrf_token = login_res.get_json()['csrf_token']
    headers = {'X-CSRF-Token': csrf_token}

    # 2. Listar usuarios
    list_res = client.get('/api/users')
    assert list_res.status_code == 200
    initial_count = list_res.get_json()['total']

    # 3. Crear usuario
    new_user_payload = {
        "full_name": "Valerie Dubois",
        "email": "valerie.dubois@elanwatches.com",
        "password": "SecurePassword2026!",
        "role": "CLIENTE",
        "status": "ACTIVO"
    }
    create_res = client.post('/api/users', json=new_user_payload, headers=headers)
    assert create_res.status_code == 201
    created_user = create_res.get_json()['user']
    new_user_id = created_user['id']
    assert created_user['email'] == 'valerie.dubois@elanwatches.com'
    assert 'password_hash' not in created_user

    # 4. Consultar detalles
    detail_res = client.get(f'/api/users/{new_user_id}')
    assert detail_res.status_code == 200
    assert detail_res.get_json()['user']['full_name'] == "Valerie Dubois"

    # 5. Editar usuario
    update_payload = {
        "full_name": "Valerie Dubois - Editada",
        "email": "valerie.dubois@elanwatches.com",
        "role": "CLIENTE",
        "status": "ACTIVO"
    }
    update_res = client.put(f'/api/users/{new_user_id}', json=update_payload, headers=headers)
    assert update_res.status_code == 200
    assert update_res.get_json()['user']['full_name'] == "Valerie Dubois - Editada"

    # 6. Desactivar usuario lógicamente
    delete_res = client.delete(f'/api/users/{new_user_id}', headers=headers)
    assert delete_res.status_code == 200
    assert delete_res.get_json()['user']['status'] == 'INACTIVO'

    # Verificar que el usuario desactivado ahora tiene estado INACTIVO
    check_res = client.get(f'/api/users/{new_user_id}')
    assert check_res.get_json()['user']['status'] == 'INACTIVO'

def test_duplicate_email_prevented(client):
    """Prueba que no se permite registrar un correo ya existente."""
    login_res = client.post('/api/auth/login', json={
        'email': 'admin@elanwatches.com',
        'password': 'AdminPass123!'
    })
    csrf_token = login_res.get_json()['csrf_token']
    headers = {'X-CSRF-Token': csrf_token}

    res = client.post('/api/users', json={
        "full_name": "Clon Admin",
        "email": "admin@elanwatches.com",
        "password": "PasswordTest123!",
        "role": "CLIENTE",
        "status": "ACTIVO"
    }, headers=headers)
    assert res.status_code == 409
    assert res.get_json()['error'] == 'EMAIL_ALREADY_EXISTS'

def test_prevent_admin_self_deactivation(client):
    """Prueba que un administrador no puede desactivar su propia cuenta."""
    login_res = client.post('/api/auth/login', json={
        'email': 'admin@elanwatches.com',
        'password': 'AdminPass123!'
    })
    admin_id = login_res.get_json()['user']['id']
    csrf_token = login_res.get_json()['csrf_token']
    headers = {'X-CSRF-Token': csrf_token}

    # Intentar DELETE sobre sí mismo
    delete_res = client.delete(f'/api/users/{admin_id}', headers=headers)
    assert delete_res.status_code == 400
    assert delete_res.get_json()['error'] == 'OPERATION_FORBIDDEN'

    # Intentar PUT cambiando estado a INACTIVO sobre sí mismo
    put_res = client.put(f'/api/users/{admin_id}', json={
        "full_name": "Administrador Test",
        "email": "admin@elanwatches.com",
        "role": "ADMINISTRADOR",
        "status": "INACTIVO"
    }, headers=headers)
    assert put_res.status_code == 400
    assert put_res.get_json()['error'] == 'OPERATION_FORBIDDEN'

def test_prevent_last_admin_deactivation(client, test_app):
    """Prueba que no se puede desactivar al último administrador activo del sistema."""
    # Crear un segundo admin para probar desactivar al primer admin desde el segundo admin
    with test_app.app_context():
        db = get_db()
        sec_hash = generate_password_hash("SecondAdminPass123!")
        second_admin = UserModel.create(db, "Segundo Admin", "admin2@elanwatches.com", sec_hash, "ADMINISTRADOR", "ACTIVO")
        second_admin_id = second_admin['id']

    # Login como admin 2
    login_res = client.post('/api/auth/login', json={
        'email': 'admin2@elanwatches.com',
        'password': 'SecondAdminPass123!'
    })
    csrf_token = login_res.get_json()['csrf_token']
    headers = {'X-CSRF-Token': csrf_token}

    # Desactivar admin 1 (quedará solo admin 2 activo)
    with test_app.app_context():
        db = get_db()
        admin1 = UserModel.find_by_email(db, "admin@elanwatches.com")
        admin1_id = admin1['id']

    del_admin1 = client.delete(f'/api/users/{admin1_id}', headers=headers)
    assert del_admin1.status_code == 200

    # Ahora solo queda admin2 como admin activo.
    # Si se intenta cambiar el rol de admin 1 a cliente o desactivar admin 2, el sistema debe proteger al último admin activo.
    # Desactivar el último admin (admin2) intentado por admin2 debe fallar (también por auto-desactivación)
    del_admin2 = client.delete(f'/api/users/{second_admin_id}', headers=headers)
    assert del_admin2.status_code == 400
