import { ShieldIcon, ArrowRightIcon } from '../Icons';

export function LandingFooter({ onNavigateToLogin, user, onReturnToDashboard }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="landing-footer">
      <div className="landing-container">
        
        {/* Cabecera del Footer con Logotipo */}
        <div className="footer-top-row">
          <div className="footer-brand-wrap">
            <div className="brand-emblem-gold" style={{ width: '44px', height: '44px' }}>
              <span style={{ fontSize: '1.4rem' }}>É</span>
            </div>
            <div>
              <span className="footer-brand-title">ÉLAN WATCHES</span>
              <span className="footer-brand-subtitle">HAUTE HORLOGERIE · GENÈVE</span>
            </div>
          </div>

          <div className="footer-scroll-top">
            <a href="#inicio" onClick={scrollToTop} className="btn-back-top">
              <span>Volver Arriba</span>
              <span>↑</span>
            </a>
          </div>
        </div>

        <div className="footer-divider" />

        {/* Columnas Principales */}
        <div className="footer-columns-grid">
          
          {/* Columna 1: Presentación y Créditos Académicos */}
          <div className="footer-col about-col">
            <h4 className="footer-heading">Maison Élan Watches</h4>
            <p className="footer-text">
              Firma suiza de alta manufactura relojera dedicada a la creación de piezas mecánicas 
              con calibres propios, esferas artesanales y metales preciosos certificados.
            </p>
            
            {/* Reconocimiento del Proyecto Académico Grupo 22 */}
            <div className="academic-badge-footer">
              <span className="academic-tag">PROYECTO ACADÉMICO</span>
              <p className="academic-info">
                <strong>Grupo 22</strong> — Ingeniería de Software (SIS 324) <br />
                Carrera de Ingeniería de Sistemas · Universidad Mayor Real y Pontificia de San Francisco Xavier
              </p>
            </div>
          </div>

          {/* Columna 2: Navegación del Sitio */}
          <div className="footer-col">
            <h4 className="footer-heading">Navegación</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')}>
                  Portada Principal
                </a>
              </li>
              <li>
                <a href="#coleccion" onClick={(e) => handleNavClick(e, 'coleccion')}>
                  Colección de Relojes
                </a>
              </li>
              <li>
                <a href="#filosofia" onClick={(e) => handleNavClick(e, 'filosofia')}>
                  Nuestra Filosofía
                </a>
              </li>
              <li>
                <a href="#ventajas" onClick={(e) => handleNavClick(e, 'ventajas')}>
                  Pilares de Excelencia
                </a>
              </li>
              <li>
                <a href="#contacto" onClick={(e) => handleNavClick(e, 'contacto')}>
                  Concierge & Citas Privadas
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información y Servicios */}
          <div className="footer-col">
            <h4 className="footer-heading">Atelier & Garantía</h4>
            <ul className="footer-link-list">
              <li><span>Garantía Vitalicia de Calibre</span></li>
              <li><span>Certificado Oficial C.O.S.C.</span></li>
              <li><span>Cuidado y Mantenimiento</span></li>
              <li><span>Registro de Piezas Numeradas</span></li>
              <li><span>Código Ético de Metales Nobles</span></li>
            </ul>
          </div>

          {/* Columna 4: Acceso al Sistema y Gestión */}
          <div className="footer-col">
            <h4 className="footer-heading">Acceso de Personal</h4>
            <p className="footer-text" style={{ marginBottom: '1rem' }}>
              Portal seguro para administradores, personal de almacén y clientes registrados.
            </p>

            {user ? (
              <button 
                className="btn-gold-solid full-width"
                onClick={onReturnToDashboard}
                style={{ padding: '0.65rem 1rem' }}
              >
                <span>Panel de {user.role}</span>
                <ArrowRightIcon size={14} />
              </button>
            ) : (
              <button 
                className="btn-gold-outline full-width"
                onClick={onNavigateToLogin}
                style={{ padding: '0.65rem 1rem' }}
              >
                <ShieldIcon size={14} />
                <span>Acceso al Subsistema</span>
              </button>
            )}

            <div className="system-status-indicator">
              <span className="status-dot-active" />
              <span>Servicio de Autenticación Activo</span>
            </div>
          </div>

        </div>

        <div className="footer-divider" />

        {/* Fila Inferior de Copyright */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © 2026 ÉLAN WATCHES S.A. Todos los derechos reservados. Genève, Suisse.
          </p>

          <div className="footer-bottom-links">
            <span>Privacidad & Confidencialidad</span>
            <span className="dot-sep">•</span>
            <span>Términos de Servicio</span>
            <span className="dot-sep">•</span>
            <span>Seguridad Criptográfica</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
