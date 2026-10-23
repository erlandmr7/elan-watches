import sqlite3

class UserModel:
    """Modelo de operaciones para la entidad de Usuarios en SQLite."""

    @staticmethod
    def to_dict(row, include_hash=False):
        """Convierte una fila sqlite3.Row a diccionario, excluyendo por defecto el hash."""
        if row is None:
            return None
        
        user_dict = {
            "id": row["id"],
            "full_name": row["full_name"],
            "email": row["email"],
            "role": row["role"],
            "status": row["status"],
            "created_at": str(row["created_at"]) if row["created_at"] else None
        }
        if include_hash:
            user_dict["password_hash"] = row["password_hash"]
        return user_dict

    @staticmethod
    def find_by_id(db, user_id, include_hash=False):
        """Busca un usuario por su ID primario mediante consulta parametrizada."""
        cursor = db.execute(
            "SELECT id, full_name, email, password_hash, role, status, created_at FROM users WHERE id = ?",
            (user_id,)
        )
        row = cursor.fetchone()
        return UserModel.to_dict(row, include_hash=include_hash)

    @staticmethod
    def find_by_email(db, email, include_hash=False):
        """Busca un usuario por su correo electrónico único."""
        cursor = db.execute(
            "SELECT id, full_name, email, password_hash, role, status, created_at FROM users WHERE LOWER(email) = LOWER(?)",
            (email.strip(),)
        )
        row = cursor.fetchone()
        return UserModel.to_dict(row, include_hash=include_hash)

    @staticmethod
    def get_all(db):
        """Obtiene todos los usuarios ordenados por ID descendente. Sin hashes."""
        cursor = db.execute(
            "SELECT id, full_name, email, role, status, created_at FROM users ORDER BY id DESC"
        )
        rows = cursor.fetchall()
        return [UserModel.to_dict(row) for row in rows]

    @staticmethod
    def count_active_admins(db):
        """Cuenta el número de administradores activos en el sistema."""
        cursor = db.execute(
            "SELECT COUNT(*) as count FROM users WHERE role = 'ADMINISTRADOR' AND status = 'ACTIVO'"
        )
        row = cursor.fetchone()
        return row["count"] if row else 0

    @staticmethod
    def create(db, full_name, email, password_hash, role="CLIENTE", status="ACTIVO"):
        """Crea un nuevo usuario en la base de datos."""
        cursor = db.execute(
            """
            INSERT INTO users (full_name, email, password_hash, role, status)
            VALUES (?, LOWER(?), ?, ?, ?)
            """,
            (full_name.strip(), email.strip(), password_hash, role, status)
        )
        db.commit()
        return UserModel.find_by_id(db, cursor.lastrowid)

    @staticmethod
    def update(db, user_id, full_name, email, role, status):
        """Actualiza la información básica de un usuario."""
        db.execute(
            """
            UPDATE users
            SET full_name = ?, email = LOWER(?), role = ?, status = ?
            WHERE id = ?
            """,
            (full_name.strip(), email.strip(), role, status, user_id)
        )
        db.commit()
        return UserModel.find_by_id(db, user_id)

    @staticmethod
    def set_status(db, user_id, status):
        """Actualiza el estado (ACTIVO / INACTIVO) de un usuario para borrado lógico o reactivación."""
        db.execute(
            "UPDATE users SET status = ? WHERE id = ?",
            (status, user_id)
        )
        db.commit()
        return UserModel.find_by_id(db, user_id)
