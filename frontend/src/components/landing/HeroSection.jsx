import { ArrowRightIcon, CrownIcon, CompassIcon, AwardIcon } from '../Icons';

export function HeroSection() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-background-overlay" />
      
      {/* Elementos decorativos sutiles */}
      <div className="hero-glow-sphere" />

      <div className="hero-container">
        
        {/* Badge Superior de Prestigio */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">MANUFACTURE D'HORLOGERIE SUISSE · GENÈVE</span>
        </div>

        {/* Título Principal */}
        <h1 className="hero-title">
          La Elegancia del Tiempo, <br />
          <span className="gold-text-gradient">Esculpida en Perfección.</span>
        </h1>

        {/* Descripción Editorial */}
        <p className="hero-description">
          En la cúspide de la alta relojería suiza, <strong>Élan Watches</strong> trasciende lo cotidiano.
          Creamos piezas mecánicas atemporales concebidas en metales nobles, cristales de zafiro
          y movimientos de manufactura de precisión inquebrantable.
        </p>

        {/* Botones de Acción */}
        <div className="hero-actions">
          <button 
            className="btn-hero-primary"
            onClick={() => handleScrollTo('coleccion')}
          >
            <span>Descubrir Colección</span>
            <ArrowRightIcon size={16} />
          </button>
          
          <button 
            className="btn-hero-secondary"
            onClick={() => handleScrollTo('filosofia')}
          >
            <span>Nuestra Filosofía</span>
          </button>
        </div>

        {/* Métricas y Sellos de Excelencia */}
        <div className="hero-metrics-grid">
          <div className="hero-metric-item">
            <div className="metric-icon-wrap">
              <CrownIcon size={18} color="#c5a059" />
            </div>
            <div className="metric-content">
              <span className="metric-number">100%</span>
              <span className="metric-label">Manufactura Suiza</span>
            </div>
          </div>

          <div className="hero-metric-item">
            <div className="metric-icon-wrap">
              <CompassIcon size={18} color="#c5a059" />
            </div>
            <div className="metric-content">
              <span className="metric-number">72 Horas</span>
              <span className="metric-label">Reserva de Marcha</span>
            </div>
          </div>

          <div className="hero-metric-item">
            <div className="metric-icon-wrap">
              <AwardIcon size={18} color="#c5a059" />
            </div>
            <div className="metric-content">
              <span className="metric-number">COSC</span>
              <span className="metric-label">Precisión Certificada</span>
            </div>
          </div>

          <div className="hero-metric-item">
            <div className="metric-icon-wrap">
              <span className="metric-gold-symbol">∞</span>
            </div>
            <div className="metric-content">
              <span className="metric-number">Vitalicia</span>
              <span className="metric-label">Garantía de Atelier</span>
            </div>
          </div>
        </div>

        {/* Indicador de Desplazamiento */}
        <div className="hero-scroll-indicator" onClick={() => handleScrollTo('coleccion')}>
          <span className="scroll-text">EXPLORAR</span>
          <div className="scroll-line">
            <div className="scroll-dot" />
          </div>
        </div>

      </div>
    </section>
  );
}
