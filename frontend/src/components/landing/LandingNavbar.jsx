import { useState, useEffect } from 'react';
import { MenuIcon, XIcon, UserIcon, ShieldIcon } from '../Icons';

export function LandingNavbar({ onNavigateToLogin, user, onReturnToDashboard }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`landing-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="landing-nav-container">
        
        {/* Logotipo y Monograma Élan */}
        <a 
          href="#inicio" 
          className="landing-brand"
          onClick={(e) => handleNavClick(e, 'inicio')}
        >
          <div className="brand-emblem-gold">
            <span>É</span>
          </div>
          <div className="brand-text-block">
            <span className="brand-title">ÉLAN WATCHES</span>
            <span className="brand-tagline">HAUTE HORLOGERIE · SUISSE</span>
          </div>
        </a>

        {/* Enlaces de Navegación Escritorio */}
        <nav className="landing-nav-desktop">
          <ul className="landing-nav-links">
            <li>
              <a href="#coleccion" onClick={(e) => handleNavClick(e, 'coleccion')}>
                Colección
              </a>
            </li>
            <li>
              <a href="#filosofia" onClick={(e) => handleNavClick(e, 'filosofia')}>
                Filosofía
              </a>
            </li>
            <li>
              <a href="#ventajas" onClick={(e) => handleNavClick(e, 'ventajas')}>
                Manufactura
              </a>
            </li>
            <li>
              <a href="#contacto" onClick={(e) => handleNavClick(e, 'contacto')}>
                Concierge & Citas
              </a>
            </li>
          </ul>
        </nav>

        {/* Acciones y Acceso al Sistema */}
        <div className="landing-nav-actions">
          {user ? (
            <button 
              className="btn-gold-outline"
              onClick={onReturnToDashboard}
              title={`Sesión iniciada como ${user.full_name} (${user.role})`}
            >
              <UserIcon size={15} color="currentColor" />
              <span>Mi Panel ({user.role})</span>
            </button>
          ) : (
            <button 
              className="btn-gold-solid"
              onClick={onNavigateToLogin}
              title="Acceso al Subsistema de Seguridad y Gestión"
            >
              <ShieldIcon size={14} color="currentColor" />
              <span>Acceso Privado</span>
            </button>
          )}

          {/* Botón de Menú Móvil */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <XIcon size={24} color="#c5a059" /> : <MenuIcon size={24} color="#c5a059" />}
          </button>
        </div>

      </div>

      {/* Menú Desplegable para Móviles */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-list">
            <li>
              <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')}>
                Portada
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
                Concierge & Citas
              </a>
            </li>
          </ul>

          <div className="mobile-menu-footer">
            {user ? (
              <button 
                className="btn-gold-outline full-width"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReturnToDashboard();
                }}
              >
                <UserIcon size={16} />
                <span>Volver a Mi Panel ({user.role})</span>
              </button>
            ) : (
              <button 
                className="btn-gold-solid full-width"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToLogin();
                }}
              >
                <ShieldIcon size={16} />
                <span>Acceso al Sistema Élan</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
