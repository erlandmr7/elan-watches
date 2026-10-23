import os
from datetime import timedelta
from dotenv import load_dotenv

# Cargar variables de entorno desde .env si existe
load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    """Configuración base para el backend de Élan Watches - Subsistema Seguridad."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'elan_watches_super_secret_key_dev_2026')
    DATABASE_PATH = os.environ.get(
        'DATABASE_PATH',
        os.path.join(BASE_DIR, 'elan_security.db')
    )
    FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:5173')
    
    # Configuración de sesión y cookies de seguridad
    SESSION_COOKIE_NAME = 'elan_session'
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = os.environ.get('SESSION_COOKIE_SAMESITE', 'Lax')
    SESSION_COOKIE_SECURE = os.environ.get('SESSION_COOKIE_SECURE', 'False').lower() in ('true', '1')
    PERMANENT_SESSION_LIFETIME = timedelta(hours=8)
    
    # Roles permitidos en el subsistema
    ROLES_PERMITIDOS = ['ADMINISTRADOR', 'ALMACEN', 'CLIENTE']
    
    # Estados permitidos
    ESTADOS_PERMITIDOS = ['ACTIVO', 'INACTIVO']
