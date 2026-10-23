import sqlite3
import os
from flask import g, current_app

def get_db():
    """Obtiene o crea una conexión SQLite para el contexto de la petición actual."""
    if 'db' not in g:
        db_path = current_app.config['DATABASE_PATH']
        # Asegurar que el directorio de la base de datos exista
        os.makedirs(os.path.dirname(os.path.abspath(db_path)), exist_ok=True)
        
        g.db = sqlite3.connect(db_path)
        g.db.row_factory = sqlite3.Row
        # Habilitar claves foráneas
        g.db.execute("PRAGMA foreign_keys = ON;")
    return g.db

def close_db(e=None):
    """Cierra la conexión a la base de datos al finalizar la petición."""
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db(app):
    """Inicializa la estructura de la base de datos si no existe.
    No sobrescribe ni borra los datos existentes.
    """
    with app.app_context():
        db = get_db()
        schema_sql = """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE COLLATE NOCASE,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('ADMINISTRADOR', 'ALMACEN', 'CLIENTE')),
            status TEXT NOT NULL DEFAULT 'ACTIVO' CHECK(status IN ('ACTIVO', 'INACTIVO')),
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        """
        db.executescript(schema_sql)
        db.commit()

def get_standalone_db(db_path):
    """Retorna una conexión directa a SQLite para scripts CLI (como init_admin.py)."""
    os.makedirs(os.path.dirname(os.path.abspath(db_path)), exist_ok=True)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn
