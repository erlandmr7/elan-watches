# ÉLAN WATCHES — SUBSISTEMA DE SEGURIDAD

Prototipo académico y funcional del **Subsistema de Seguridad y Control de Acceso** para la plataforma de comercio electrónico de alta relojería **Élan Watches**.

---

### 📋 Información del Proyecto Académico

| Campo | Detalle |
| :--- | :--- |
| **Grupo** | **Grupo 22** |
| **Asignatura** | **Ingeniería de Software (SIS 324)** |
| **Docente** | **Ing. Ramiro Alberto Duran Quiroga** |
| **Carrera** | **Ingeniería de Sistemas** |
| **Integrantes** | • **Chumacero Steffany**<br>• **Anagua Muñoz Jhaqueline**<br>• **Monasterios Rojas Erland Mauricio** |
| **Lugar y Fecha** | **Sucre, 16 de octubre de 2026** |

---

## 1. Objetivo del Prototipo

El objetivo primordial de este prototipo es proveer una arquitectura segura, escalable y robusta para la autenticación y administración de usuarios en el e-commerce de relojes **Élan Watches**. Implementa:

- Autenticación segura basada en credenciales con protección contra fuerza bruta y cuentas inactivas.
- Manejo de sesiones seguras del lado del servidor utilizando cookies **HttpOnly**, **SameSite=Lax** y protección contra **CSRF**.
- Almacenamiento criptográfico de contraseñas mediante algoritmos de derivación segura (**Werkzeug / pbkdf2:sha256 / scrypt**).
- Módulo administrativo integral (**CRUD de usuarios**) con reglas estrictas de autorización por roles y protección de cuentas maestras.
- Interfaz web inspirada en la elegancia y sobriedad de las casas suizas de alta relojería.

---

## 2. Tecnologías Utilizadas

- **Backend**: Python 3.9+ / 3.14 con el framework **Flask**.
- **Base de Datos**: **SQLite 3** con consultas estrictamente parametrizadas y aislamiento relacional.
- **Seguridad Criptográfica**: **Werkzeug Security** (`generate_password_hash`, `check_password_hash`).
- **Frontend**: **React 18** empaquetado con **Vite**.
- **Lenguaje Frontend**: JavaScript (ES6+ / JSX).
- **Estilos**: **CSS3 Moderno** (variables CSS, diseño adaptativo mobile-first, estética dark luxury inspirada en alta relojería).
- **Comunicación**: **API REST** con intercambio de datos exclusivamente en formato **JSON**.
- **Pruebas Automatizadas**: **Pytest** para pruebas unitarias e integración de endpoints en el backend.
- **Control de Versiones**: **Git** y **GitHub**.

---

## 3. Requisitos de Instalación

Antes de iniciar, verifique que su entorno de trabajo cuente con:

- **Sistema Operativo**: Windows 10/11 (o Linux / macOS).
- **Python**: Versión 3.9 o superior instalada y accesible en el PATH del sistema.
- **Node.js**: Versión 18.x o superior con **npm**.
- **Git**: Para control de versiones.
- **Consola**: Windows PowerShell (o terminal Bash/Zsh).

---

## 4. Estructura de Carpetas

```text
elan-watches-seguridad/
│
├── .gitignore                      # Exclusión de venvs, bases de datos y node_modules
├── README.md                       # Documentación técnica y manual de ejecución
│
├── backend/                        # Núcleo del servidor y API REST en Flask
│   ├── app.py                      # Fábrica Flask, registro de rutas y manejadores globales
│   ├── auth_routes.py              # Endpoints de autenticación (/api/auth)
│   ├── user_routes.py              # Endpoints CRUD administrativo (/api/users)
│   ├── models.py                   # Modelo y consultas parametrizadas SQLite
│   ├── database.py                 # Conexión, ciclo de vida e inicialización de esquemas
│   ├── decorators.py               # Decoradores @login_required, @admin_required, @csrf_protect
│   ├── config.py                   # Configuración y variables de entorno
│   ├── init_admin.py               # Script CLI interactivo/CLI para crear el primer administrador
│   ├── requirements.txt            # Dependencias Python del backend
│   ├── .env.example                # Plantilla de variables de entorno recomendadas
│   └── tests/                      # Suite de pruebas automatizadas
│       └── test_security_api.py    # Pruebas unitarias de seguridad y CRUD
│
└── frontend/                       # Aplicación de interfaz de usuario en React + Vite
    ├── index.html                  # Plantilla HTML con tipografías de lujo (Cinzel, Montserrat)
    ├── package.json                # Dependencias y scripts de npm
    ├── vite.config.js              # Configuración de Vite con proxy hacia Flask (:5000)
    └── src/
        ├── main.jsx                # Entrada React con AuthProvider
        ├── App.jsx                 # Enrutamiento de vistas según estado y rol
        ├── index.css               # Sistema de diseño dark luxury para Élan Watches
        ├── api/
        │   └── client.js           # Cliente Fetch con envío automático de cookies y tokens CSRF
        ├── context/
        │   └── AuthContext.jsx     # Contexto global de autenticación y estado de sesión
        ├── components/
        │   ├── Navbar.jsx          # Barra superior con monograma de lujo y acciones
        │   ├── Modal.jsx           # Contenedor modal reutilizable
        │   ├── Icons.jsx           # Iconografía SVG vectorial integrada
        │   ├── UserFormModal.jsx   # Formulario de alta y edición con validación
        │   ├── UserDetailModal.jsx # Ficha técnica de usuario (sin revelar hashes)
        │   ├── DeactivateConfirmModal.jsx # Confirmación de desactivación lógica
        │   └── Toast.jsx           # Notificaciones flotantes de éxito y error
        └── views/
            ├── LoginView.jsx       # Pantalla de inicio de sesión
            ├── AdminView.jsx       # Dashboard administrativo con métricas y tabla CRUD
            ├── WarehouseView.jsx   # Pantalla reservada para rol ALMACEN
            └── ClientView.jsx      # Portal exclusivo para rol CLIENTE
```

---

## 5. Creación y Activación del Entorno Virtual de Python

Abra **Windows PowerShell** en la raíz del proyecto (`elan-watches-seguridad`):

```powershell
# 1. Crear el entorno virtual en la carpeta backend/venv
python -m venv backend\venv

# 2. Activar el entorno virtual
backend\venv\Scripts\Activate.ps1
```

> **Nota para PowerShell:** Si la directiva de ejecución le impide ejecutar scripts, habilítela en su sesión con:
> `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`

---

## 6. Instalación de Dependencias del Backend

Con el entorno virtual activado, instale las dependencias especificadas en `requirements.txt`:

```powershell
python -m pip install --upgrade pip
pip install -r backend\requirements.txt
```

---

## 7. Configuración de Variables de Entorno

Puede copiar el archivo de ejemplo a un archivo `.env` en `backend/` si desea personalizar claves o puertos:

```powershell
Copy-Item backend\.env.example backend\.env
```

Variables disponibles:
- `SECRET_KEY`: Llave criptográfica para firmas de sesión y protección CSRF.
- `DATABASE_PATH`: Ruta al archivo SQLite local (por defecto `elan_security.db`).
- `FRONTEND_URL`: Origen habilitado en CORS (por defecto `http://localhost:5173`).
- `PORT`: Puerto de escucha del backend (por defecto `5000`).
- `SESSION_COOKIE_SAMESITE`: Configuración SameSite para cookies (por defecto `Lax`).
- `SESSION_COOKIE_SECURE`: Establecer en `True` solo en entornos de producción con HTTPS.

---

## 8. Inicialización del Primer Administrador

El sistema cuenta con el script seguro `init_admin.py`, el cual **no almacena contraseñas fijas en el código fuente**.

### Opción A: Modo Interactivo (Recomendado)
Ejecute el script y el sistema solicitará la contraseña mediante entrada oculta en consola (`getpass`):

```powershell
backend\venv\Scripts\python.exe backend\init_admin.py
```

### Opción B: Modo por Parámetros CLI
```powershell
backend\venv\Scripts\python.exe backend\init_admin.py --name "Administrador Principal" --email "admin@elanwatches.com" --password "TuClaveSegura2026!"
```

### Opción C: Mediante Variables de Entorno
```powershell
$env:INIT_ADMIN_NAME="Administrador Principal"
$env:INIT_ADMIN_EMAIL="admin@elanwatches.com"
$env:INIT_ADMIN_PASSWORD="TuClaveSegura2026!"
backend\venv\Scripts\python.exe backend\init_admin.py
```

---

## 9. Inicio del Backend (Servidor Flask)

Inicie el servidor de desarrollo Flask en el puerto `5000`:

```powershell
backend\venv\Scripts\python.exe backend\app.py
```

El backend se iniciará e indicará:
`* Running on http://127.0.0.1:5000`

---

## 10. Instalación de Dependencias del Frontend

Abra una **segunda ventana de PowerShell** y sitúese en la carpeta `frontend/`:

```powershell
cd frontend
npm install
```

---

## 11. Inicio del Frontend (Servidor Vite)

Ejecute el servidor de desarrollo de Vite:

```powershell
npm run dev
```

El frontend se iniciará y estará disponible en `http://localhost:5173`.

---

## 12. URLs Locales de Acceso

| Servicio | URL Local | Descripción |
| :--- | :--- | :--- |
| **Frontend Web** | `http://localhost:5173` | Aplicación interactiva React de Élan Watches |
| **Backend REST API** | `http://127.0.0.1:5000` | Servidor Flask |
| **Health Check API** | `http://127.0.0.1:5000/api/health` | Verificación de estado del servidor |

---

## 13. Endpoints de la API REST

Todos los endpoints retornan respuestas estructuradas en **JSON** con códigos de estado HTTP semánticos (200, 201, 400, 401, 403, 404, 409).

### Módulo de Autenticación (`/api/auth`)

| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Público | Autentica usuario con `email` y `password`. Establece cookie de sesión HttpOnly y emite token CSRF. |
| `POST` | `/api/auth/logout` | Autenticado | Invalida y destruye la sesión actual y elimina las cookies correspondientes. |
| `GET` | `/api/auth/me` | Autenticado | Devuelve los datos del perfil activo y valida si la cuenta sigue activa. |

### Módulo de Usuarios (`/api/users`)

| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Admin | Lista todos los usuarios registrados (excluyendo hashes). |
| `POST` | `/api/users` | Admin + CSRF | Registra un nuevo usuario con validación estricta y contraseña hasheada. |
| `GET` | `/api/users/<id>` | Admin | Consulta detallada de un usuario por su ID. |
| `PUT` | `/api/users/<id>` | Admin + CSRF | Actualiza nombre, correo, rol y estado aplicando reglas de protección. |
| `DELETE` | `/api/users/<id>` | Admin + CSRF | **Desactivación lógica (Soft Delete)** cambiando su estado a `INACTIVO`. |

---

## 14. Roles y Permisos del Sistema

El subsistema aplica un modelo de control de acceso basado en roles (**RBAC**):

| Rol | Alcance y Permisos | Comportamiento en la Interfaz |
| :--- | :--- | :--- |
| **ADMINISTRADOR** | Control total sobre el módulo de usuarios. Crear cuentas, listar, ver detalles, editar información y desactivar o reactivar usuarios. | Acceso al Dashboard de Seguridad con tabla de usuarios, métricas de cuentas y modales de gestión. |
| **ALMACEN** | Autenticación válida. No posee permisos para consultar ni manipular el CRUD de usuarios. | Se presenta una vista elegante indicando que el módulo de logística e inventario será implementado en la siguiente fase. |
| **CLIENTE** | Autenticación válida. No posee acceso a funciones administrativas ni de gestión de cuentas. | Se presenta el portal privado del cliente con su información de perfil y confirmación de privilegios protegidos. |

---

## 15. Cómo Probar Cada Operación y el Login

### A. Prueba de Inicio de Sesión
1. Ingrese a `http://localhost:5173`.
2. Intente enviar el formulario en blanco: comprobará las validaciones en tiempo real.
3. Ingrese credenciales erróneas: observará el mensaje de error: *"Credenciales incorrectas"*.
4. Ingrese con el administrador inicial (`admin@elanwatches.com` y la contraseña asignada): el sistema le otorgará acceso al **Panel de Seguridad**.

### B. Prueba de Creación de Usuarios (CRUD - Create)
1. En el panel de administrador, haga clic en el botón dorado **"Nuevo Usuario"**.
2. Complete el formulario con nombre, correo, contraseña y seleccione el rol deseado (`ALMACEN` o `CLIENTE`).
3. Guarde el registro: aparecerá de inmediato en la tabla y se actualizarán los contadores de métricas.
4. Intente crear otro usuario con el mismo correo: la API denegará la solicitud con un código `409 Conflict`.

### C. Prueba de Consulta de Detalles (CRUD - Read)
1. En la fila de cualquier usuario, haga clic en el ícono de **Ojo (Ver Detalles)**.
2. Se desplegará la ficha del usuario mostrando su ID, fecha de registro, rol, estado y permisos asignados.
3. Observe que en ningún momento se transmiten ni muestran hashes o credenciales.

### D. Prueba de Edición (CRUD - Update)
1. Haga clic en el ícono de **Lápiz (Editar)** en el usuario creado.
2. Modifique su nombre o rol y guarde los cambios.
3. La tabla reflejará las modificaciones al instante.

### E. Prueba de Desactivación Lógica (CRUD - Delete)
1. Haga clic en el ícono de **Papelera (Desactivar)** sobre el usuario secundario.
2. El modal de confirmación solicitará verificación explicando que es una desactivación lógica.
3. Confirme: el usuario pasará a estado `INACTIVO` con distintivo visual en rojo.

### F. Prueba de Restricción para Cuentas Desactivadas
1. Cierre sesión e intente iniciar sesión con la cuenta recién desactivada.
2. El sistema bloqueará el acceso retornando un código `403 Forbidden` con el mensaje:
   *"Su cuenta se encuentra desactivada. Comuníquese con la administración."*

### G. Prueba de Autoprotección del Administrador
1. Intente desactivar al administrador que tiene la sesión activa: el botón estará protegido en la interfaz y el backend responderá con error `400 Bad Request` prohibiendo la auto-desactivación.
2. Intente desactivar al último administrador activo del sistema: la API rechazará la operación para garantizar que el sistema nunca quede sin acceso administrativo.

---

## 16. Medidas de Seguridad Implementadas

1. **Hashing Criptográfico con Werkzeug**: Todas las contraseñas son transformadas mediante algoritmos seguros de derivación de claves antes de ingresar a SQLite. Jamás se almacena texto plano.
2. **Cookies de Sesión HttpOnly**: La cookie `elan_session` no es accesible mediante scripts JavaScript (`document.cookie`), neutralizando ataques de robo de sesión por **XSS**.
3. **Protección contra CSRF**: Las peticiones mutables (`POST`, `PUT`, `DELETE`) exigen la cabecera `X-CSRF-Token`, la cual es validada con comparación de digest criptográfico `hmac.compare_digest`.
4. **Consultas SQL Parametrizadas**: El 100% de las consultas a SQLite utilizan sentencias preparadas con placeholders `?`, eliminando riesgos de inyección SQL.
5. **Aislamiento de Privilegios en Backend**: El control de acceso está respaldado por decoradores (`@login_required`, `@admin_required`), asegurando que no baste con modificar la interfaz para saltarse permisos.
6. **Protección de Cuenta Maestra**: Reglas de negocio en el backend impiden la auto-desactivación y evitan la eliminación del último administrador activo.
7. **Política de CORS Restringida**: El backend solo acepta peticiones provenientes del origen configurado para el frontend local (`http://localhost:5173`).
8. **Prevención de Exposición de Información**: No se devuelven trazas de pila (stack traces), hashes de contraseñas ni detalles internos de la base de datos en respuestas de error.

---

## 17. Ejecución de la Suite de Pruebas Automatizadas

El backend incluye pruebas unitarias y de integración desarrolladas con **pytest**.

Para ejecutar toda la suite de pruebas desde PowerShell:

```powershell
backend\venv\Scripts\pytest.exe -o pythonpath=backend backend\tests -v
```

Resultado verificado:
```text
test_login_success_and_csrf_issued PASSED
test_login_invalid_password PASSED
test_login_inactive_user_rejected PASSED
test_non_admin_cannot_access_crud PASSED
test_unauthenticated_cannot_access_crud PASSED
test_admin_crud_lifecycle PASSED
test_duplicate_email_prevented PASSED
test_prevent_admin_self_deactivation PASSED
test_prevent_last_admin_deactivation PASSED
==================== 9 passed in 4.58s ====================
```

---

## 18. Pasos para Publicar el Proyecto en GitHub

Si desea versionar y publicar este proyecto en su cuenta de GitHub:

1. **Inicializar el repositorio local y registrar el primer commit**:
   ```powershell
   git init
   git add .
   git commit -m "feat(security): prototipo inicial completo del subsistema de seguridad Élan Watches"
   ```

2. **Crear un nuevo repositorio en GitHub** (por ejemplo, `elan-watches-seguridad`) desde [github.com/new](https://github.com/new) sin inicializar con README ni `.gitignore` (ya están creados en este proyecto).

3. **Vincular el origen remoto y subir el código**:
   ```powershell
   git branch -M main
   git remote add origin https://github.com/<TU_USUARIO>/elan-watches-seguridad.git
   git push -u origin main
   ```

---

## 19. Información del Equipo y Datos Académicos

- **Asignatura:** Ingeniería de Software (SIS 324)
- **Docente:** Ing. Ramiro Alberto Duran Quiroga
- **Carrera:** Ingeniería de Sistemas
- **Grupo:** 22
- **Universitarios (Integrantes):**
  1. **Chumacero Steffany**
  2. **Anagua Muñoz Jhaqueline**
  3. **Monasterios Rojas Erland Mauricio**
- **Lugar y Fecha:** Sucre, 16 de octubre de 2026

---
*Élan Watches — Subsistema de Seguridad desarrollado con altos estándares de ingeniería de software.*
