import hmac
from functools import wraps
from flask import session, jsonify, request

def login_required(f):
    """Decorador que verifica la existencia de una sesión de usuario válida."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({
                "error": "UNAUTHORIZED",
                "message": "Sesión no válida o expirada. Por favor inicie sesión."
            }), 401
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    """Decorador que verifica que el usuario autenticado posea el rol ADMINISTRADOR."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        role = session.get('user_role')
        if role != 'ADMINISTRADOR':
            return jsonify({
                "error": "FORBIDDEN",
                "message": "Acceso restringido. Requiere privilegios de Administrador."
            }), 403
        return f(*args, **kwargs)
    return decorated_function

def csrf_protect(f):
    """Decorador para validar el token CSRF en solicitudes que modifican el estado (POST, PUT, DELETE)."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Excluir métodos de solo lectura
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return f(*args, **kwargs)
        
        session_csrf = session.get('csrf_token')
        header_csrf = request.headers.get('X-CSRF-Token') or request.headers.get('X-XSRF-TOKEN')
        
        if not session_csrf or not header_csrf or not hmac.compare_digest(session_csrf, header_csrf):
            return jsonify({
                "error": "CSRF_ERROR",
                "message": "Token de protección CSRF inválido o ausente. Recargue la página e intente nuevamente."
            }), 403
            
        return f(*args, **kwargs)
    return decorated_function
