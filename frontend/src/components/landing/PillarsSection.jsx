import { BRAND_VALUES } from '../../data/watchesData';
import { CrownIcon, CompassIcon, GemIcon, AwardIcon } from '../Icons';

export function PillarsSection() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Crown':
        return <CrownIcon size={28} color="#c5a059" />;
      case 'Compass':
        return <CompassIcon size={28} color="#c5a059" />;
      case 'Gem':
        return <GemIcon size={28} color="#c5a059" />;
      case 'Award':
      default:
        return <AwardIcon size={28} color="#c5a059" />;
    }
  };

  return (
    <section id="ventajas" className="pillars-section">
      <div className="landing-container">
        
        {/* Encabezado */}
        <div className="section-header text-center">
          <span className="section-pretitle">PILARES DE EXCELENCIA</span>
          <h2 className="section-title">
            Diseño, Precisión y <span className="gold-text-gradient">Exclusividad Absoluta</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Cuatro pilares innegociables rigen cada boceto, cada rueda de engranaje y cada terminación 
            en nuestros talleres suizos.
          </p>
        </div>

        {/* Cuadrícula de Pilares */}
        <div className="pillars-grid">
          {BRAND_VALUES.map((pillar, index) => (
            <div key={index} className="pillar-card">
              <div className="pillar-index">0{index + 1}</div>
              
              <div className="pillar-icon-box">
                {getIcon(pillar.icon)}
              </div>

              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>

              <div className="pillar-accent-line" />
            </div>
          ))}
        </div>

        {/* Franja de Métricas de Manufactura */}
        <div className="pillars-stats-banner">
          <div className="stat-banner-item">
            <span className="stat-num">1,000h</span>
            <span className="stat-label">De Pruebas Cronométricas</span>
          </div>

          <div className="stat-banner-divider" />

          <div className="stat-banner-item">
            <span className="stat-num">0.001 mm</span>
            <span className="stat-label">Tolerancia de Mecanizado</span>
          </div>

          <div className="stat-banner-divider" />

          <div className="stat-banner-item">
            <span className="stat-num">100%</span>
            <span className="stat-label">Cristal de Zafiro Grado Óptico</span>
          </div>

          <div className="stat-banner-divider" />

          <div className="stat-banner-item">
            <span className="stat-num">No. 1</span>
            <span className="stat-label">Serie Numerada e Individual</span>
          </div>
        </div>

      </div>
    </section>
  );
}
