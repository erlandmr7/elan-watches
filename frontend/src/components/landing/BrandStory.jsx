import { CrownIcon, GemIcon, CompassIcon } from '../Icons';

export function BrandStory() {
  return (
    <section id="filosofia" className="brand-story-section">
      <div className="landing-container">
        
        <div className="story-grid">
          
          {/* Columna de Texto Editorial */}
          <div className="story-content">
            <span className="section-pretitle">FILOSOFÍA & TRADICIÓN</span>
            <h2 className="section-title">
              El Arte Eterno de la <br />
              <span className="gold-text-gradient">Alta Relojería Suiza</span>
            </h2>
            <div className="gold-divider left-aligned" />

            <p className="story-lead">
              Nacida en el corazón de Ginebra, la <strong>Maison Élan Watches</strong> fue fundada 
              con una convicción inquebrantable: el tiempo verdadero no puede medirse únicamente en segundos, 
              sino en la pasión, el virtuosismo y el alma invertidos en cada mecanismo.
            </p>

            <blockquote className="story-quote">
              <span className="quote-mark">“</span>
              <p>
                No creamos simples instrumentos para medir las horas. Esculpimos legados mecánicos destinados 
                a trascender generaciones enteras.
              </p>
              <cite>— Atelier de Alta Relojería Élan, Ginebra</cite>
            </blockquote>

            <div className="story-features">
              <div className="story-feature-item">
                <div className="feature-icon-box">
                  <CrownIcon size={20} color="#c5a059" />
                </div>
                <div>
                  <h4 className="feature-item-title">Saber Hacer Tradicional</h4>
                  <p className="feature-item-desc">
                    Mantenemos vivas técnicas seculares de grabado manual, esmaltado Grand Feu y decoración con 
                    patrones <em>Côtes de Genève</em> y <em>Perlage</em>.
                  </p>
                </div>
              </div>

              <div className="story-feature-item">
                <div className="feature-icon-box">
                  <CompassIcon size={20} color="#c5a059" />
                </div>
                <div>
                  <h4 className="feature-item-title">Innovación Micromecánica</h4>
                  <p className="feature-item-desc">
                    Aliaciones de última generación en espirales antimagnéticas de silicio y rodamientos de cerámica 
                    que aseguran una exactitud cronométrica imperturbable.
                  </p>
                </div>
              </div>

              <div className="story-feature-item">
                <div className="feature-icon-box">
                  <GemIcon size={20} color="#c5a059" />
                </div>
                <div>
                  <h4 className="feature-item-title">Nobleza sin Concesiones</h4>
                  <p className="feature-item-desc">
                    Metales preciosos de procedencia ética certificada: oro macizo de 18K reciclado responsablemente 
                    y platino 950 de pureza extrema.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Columna Visual / Composición */}
          <div className="story-visual">
            <div className="story-visual-frame">
              <img 
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" 
                alt="Taller de alta relojería Élan" 
                className="story-img-main"
                loading="lazy"
              />
              <div className="story-badge-floating">
                <span className="floating-years">18K</span>
                <span className="floating-text">Oro y Platino Certificado</span>
              </div>
              <div className="story-seal-floating">
                <div className="seal-inner">
                  <span>SWISS</span>
                  <strong>MADE</strong>
                  <span>GENÈVE</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
