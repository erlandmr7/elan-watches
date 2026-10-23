import os
import sys
import getpass
import argparse
import re
from werkzeug.security import generate_password_hash
from config import Config
from database import get_standalone_db

EMAIL_REGEX = re.compile(r'^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$')

def initialize_database_schema(conn):
    """Crea la tabla si no existe aún."""
    schema = """
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
    conn.executescript(schema)
    conn.commit()

def setup_admin():
    parser = argparse.ArgumentParser(description="Inicializador del Administrador de Élan Watches")
    parser.add_argument("--name", help="Nombre completo del administrador", default=None)
    parser.add_argument("--email", help="Correo electrónico del administrador", default=None)
    parser.add_argument("--password", help="Contraseña segura (mínimo 8 caracteres)", default=None)
    args = parser.parse_args()

    print("=" * 60)
    print("   ÉLAN WATCHES — INICIALIZADOR DE ADMINISTRADOR")
    print("=" * 60)

    db_path = Config.DATABASE_PATH
    conn = get_standalone_db(db_path)
    initialize_database_schema(conn)

    # Verificar si ya existe algún administrador
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as total FROM users WHERE role = 'ADMINISTRADOR'")
    admin_count = cursor.fetchone()["total"]

    if admin_count > 0:
        print(f"[!] Aviso: Ya existen {admin_count} cuenta(s) con rol ADMINISTRADOR en la base de datos.")
        # Si no se pasó argumento explícito, preguntar si desea continuar
        if not args.email:
            confirm = input("¿Desea crear un administrador adicional? (s/n): ").strip().lower()
            if confirm != 's':
                print("Operación cancelada por el usuario.")
                conn.close()
                return

    # Obtener Nombre
    name = args.name or os.environ.get("INIT_ADMIN_NAME")
    if not name:
        if sys.stdin.isatty():
            name = input("Nombre completo del administrador [Admin Élan]: ").strip()
            if not name:
                name = "Admin Élan"
        else:
            name = "Admin Élan"

    # Obtener Correo
    email = args.email or os.environ.get("INIT_ADMIN_EMAIL")
    if not email:
        if sys.stdin.isatty():
            while True:
                email = input("Correo electrónico del administrador [admin@elanwatches.com]: ").strip()
                if not email:
                    email = "admin@elanwatches.com"
                if EMAIL_REGEX.match(email):
                    break
                print("[-] Formato de correo inválido. Intente de nuevo.")
        else:
            email = "admin@elanwatches.com"

    # Verificar si el correo ya existe
    cursor.execute("SELECT id FROM users WHERE LOWER(email) = LOWER(?)", (email,))
    if cursor.fetchone():
        print(f"[-] Error: Ya existe un usuario registrado con el correo '{email}'.")
        conn.close()
        sys.exit(1)

    # Obtener Contraseña
    password = args.password or os.environ.get("INIT_ADMIN_PASSWORD")
    if not password:
        if sys.stdin.isatty():
            while True:
                password = getpass.getpass("Ingrese una contraseña segura (mín. 8 caracteres): ")
                if len(password) < 8:
                    print("[-] La contraseña debe tener al menos 8 caracteres.")
                    continue
                confirm_password = getpass.getpass("Confirme la contraseña: ")
                if password != confirm_password:
                    print("[-] Las contraseñas no coinciden. Intente de nuevo.")
                    continue
                break
        else:
            print("[-] Error: Debe definir la variable de entorno INIT_ADMIN_PASSWORD o el argumento --password.")
            conn.close()
            sys.exit(1)

    if len(password) < 8:
        print("[-] Error: La contraseña debe tener al menos 8 caracteres.")
        conn.close()
        sys.exit(1)

    # Hashear contraseña de forma segura con Werkzeug
    password_hash = generate_password_hash(password)

    # Insertar administrador
    cursor.execute(
        """
        INSERT INTO users (full_name, email, password_hash, role, status)
        VALUES (?, LOWER(?), ?, 'ADMINISTRADOR', 'ACTIVO')
        """,
        (name, email, password_hash)
    )
    conn.commit()
    user_id = cursor.lastrowid
    conn.close()

    print("[+] Administrador creado exitosamente:")
    print(f"    - ID: {user_id}")
    print(f"    - Nombre: {name}")
    print(f"    - Correo: {email}")
    print(f"    - Rol: ADMINISTRADOR")
    print(f"    - Estado: ACTIVO")
    print("[+] La contraseña ha sido almacenada de forma segura mediante hash criptográfico.")
    print("=" * 60)

if __name__ == '__main__':
    setup_admin()
