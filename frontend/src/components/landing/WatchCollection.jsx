import { useState } from 'react';
import { WATCHES } from '../../data/watchesData';
import { WatchDetailModal } from './WatchDetailModal';
import { CompassIcon, GemIcon, ArrowRightIcon } from '../Icons';

export function WatchCollection({ onSelectWatchForContact }) {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedWatch, setSelectedWatch] = useState(null);

  const filters = [
    { id: 'todos', label: 'Todas las Piezas' },
    { id: 'haute-horlogerie', label: 'Alta Relojería' },
    { id: 'cronografos', label: 'Cronógrafos' },
    { id: 'clasicos', label: 'Clásicos Atemporales' },
    { id: 'deportivos', label: 'Deportivos de Lujo' }
  ];

  const filteredWatches = activeFilter === 'todos' 
    ? WATCHES 
    : WATCHES.filter(w => w.category === activeFilter);

  return (
    <section id="coleccion" className="collection-section">
      <div className="landing-container">
        
        {/* Cabecera de Sección */}
        <div className="section-header text-center">
          <span className="section-pretitle">CATÁLOGO EXCLUSIVO</span>
          <h2 className="section-title">
            Obras Maestras de la <span className="gold-text-gradient">Maison Élan</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Cada reloj Élan es una convergencia entre siglos de saber relojero helvético, 
            geometría sagrada y los materiales más puros de la tierra.
          </p>
        </div>

        {/* Filtros de Categoría */}
        <div className="collection-filters">
          {filters.map(f => (
            <button
              key={f.id}
              className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cuadrícula de Relojes */}
        <div className="watches-grid">
          {filteredWatches.map(watch => (
            <article key={watch.id} className="watch-card">
              
              {/* Badge Superior */}
              <div className="watch-card-tag">{watch.tag}</div>

              {/* Imagen del Reloj */}
              <div 
                className="watch-card-image-wrap"
                onClick={() => setSelectedWatch(watch)}
              >
                <img 
                  src={watch.image} 
                  alt={watch.name} 
                  className="watch-card-img"
                  loading="lazy"
                />
                <div className="watch-card-overlay">
                  <span className="overlay-btn-text">
                    Ver Ficha Técnica
                  </span>
                </div>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="watch-card-content">
                <span className="watch-card-collection">{watch.collection}</span>
                <h3 className="watch-card-title">{watch.name}</h3>
                
                <p className="watch-card-desc">{watch.shortDescription}</p>

                {/* Especificaciones Rápidas */}
                <div className="watch-card-highlights">
                  <div className="highlight-pill" title="Calibre">
                    <CompassIcon size={13} color="#c5a059" />
                    <span>{watch.specs.calibre.split(' ')[0]} {watch.specs.calibre.split(' ')[1]}</span>
                  </div>
                  <div className="highlight-pill" title="Reserva">
                    <span>{watch.specs.reserva}</span>
                  </div>
                  <div className="highlight-pill" title="Caja">
                    <GemIcon size={13} color="#c5a059" />
                    <span>{watch.specs.caja.split('(')[0]}</span>
                  </div>
                </div>

                {/* Pie de Tarjeta: Precio y Acción */}
                <div className="watch-card-footer">
                  <div className="price-container">
                    <span className="price-label">Precio Referencial</span>
                    <span className="price-value">{watch.priceFormatted}</span>
                  </div>

                  <button 
                    className="btn-card-details"
                    onClick={() => setSelectedWatch(watch)}
                    aria-label={`Ver especificaciones de ${watch.name}`}
                  >
                    <span>Detalles</span>
                    <ArrowRightIcon size={14} />
                  </button>
                </div>

              </div>

            </article>
          ))}
        </div>

        {/* Nota aclaratoria sobre pedidos y comercio */}
        <div className="collection-disclaimer">
          <p>
            * Las piezas presentadas en este catálogo corresponden a ediciones de alta manufactura demostrativas. 
            Para conocer disponibilidad de piezas numeradas, agende una cita con nuestro Concierge privado.
          </p>
        </div>

      </div>

      {/* Modal de Detalle */}
      {selectedWatch && (
        <WatchDetailModal 
          watch={selectedWatch} 
          onClose={() => setSelectedWatch(null)}
          onSelectForContact={(watchName) => {
            if (onSelectWatchForContact) {
              onSelectWatchForContact(watchName);
            }
          }}
        />
      )}
    </section>
  );
}
