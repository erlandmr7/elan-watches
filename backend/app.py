import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from database import close_db, init_db
from auth_routes import auth_bp
from user_routes import users_bp

def create_app(test_config=None):
    """Fábrica de la aplicación Flask para Élan Watches - Seguridad."""
    app = Flask(__name__)
    
    # Cargar configuración base
    app.config.from_object(Config)

    # Permitir sobreescritura de configuración para pruebas automatizadas
    if test_config:
        app.config.update(test_config)

    # Configuración de CORS estricta para el origen del frontend local
    allowed_origins = [
        app.config['FRONTEND_URL'],
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ]
    # Eliminar duplicados manteniendo orden
    unique_origins = list(dict.fromkeys(allowed_origins))

    CORS(
        app,
        resources={r"/api/*": {"origins": unique_origins}},
        supports_credentials=True,
        expose_headers=['X-CSRF-Token', 'Set-Cookie']
    )

    # Manejo de ciclo de vida de la base de datos
    app.teardown_appcontext(close_db)

    # Inicializar tablas si no existen (sin borrar datos)
    init_db(app)

    # Registro de Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(users_bp)

    # Endpoint de verificación de estado
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "Élan Watches - Subsistema Seguridad",
            "version": "1.0.0"
        }), 200

    # Manejadores globales de errores para respuestas JSON consistentes y seguras
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "error": "BAD_REQUEST",
            "message": "Solicitud errónea o datos con formato inválido."
        }), 400

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "error": "NOT_FOUND",
            "message": "El recurso solicitado no fue encontrado en el servidor."
        }), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            "error": "METHOD_NOT_ALLOWED",
            "message": "Método HTTP no permitido para este endpoint."
        }), 405

    @app.errorhandler(500)
    def internal_server_error(error):
        # No exponer detalles internos del error o trazas en la respuesta
        return jsonify({
            "error": "INTERNAL_SERVER_ERROR",
            "message": "Ha ocurrido un error interno en el servidor. Por favor intente más tarde."
        }), 500

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug=True)
