import { useEffect } from 'react';
import { XIcon, CrownIcon, CompassIcon, ArrowRightIcon } from '../Icons';

export function WatchDetailModal({ watch, onClose, onSelectForContact }) {
  // Manejar cierre con tecla Escape y bloquear scroll del body
  useEffect(() => {
    if (!watch) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [watch, onClose]);

  if (!watch) return null;

  const handleConsult = () => {
    if (onSelectForContact) {
      onSelectForContact(watch.name);
    }
    onClose();
  };

  return (
    <div className="watch-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="watch-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Botón de Cierre */}
        <button 
          className="watch-modal-close" 
          onClick={onClose}
          aria-label="Cerrar ficha técnica"
        >
          <XIcon size={20} color="#c5a059" />
        </button>

        <div className="watch-modal-body">
          
          {/* Columna Visual */}
          <div className="watch-modal-visual">
            <div className="watch-modal-badge">{watch.tag}</div>
            <div className="watch-modal-image-wrapper">
              <img 
                src={watch.image} 
                alt={watch.name} 
                className="watch-modal-img"
                loading="lazy"
              />
            </div>
            <div className="watch-modal-origin">
              <CrownIcon size={16} color="#c5a059" />
              <span>Fabricación Artesanal en Ginebra, Suiza</span>
            </div>
          </div>

          {/* Columna de Información y Especificaciones */}
          <div className="watch-modal-info">
            <span className="watch-modal-collection">{watch.collection}</span>
            <h2 className="watch-modal-title">{watch.name}</h2>
            
            <div className="watch-modal-price-row">
              <span className="watch-modal-price">{watch.priceFormatted}</span>
              <span className="watch-modal-price-note">Precio Demostrativo Referencial</span>
            </div>

            <p className="watch-modal-desc">{watch.description}</p>

            {/* Ficha Técnica Detallada */}
            <div className="watch-modal-specs-block">
              <h3 className="specs-block-title">
                <CompassIcon size={16} color="#c5a059" />
                <span>Especificaciones Técnicas del Calibre</span>
              </h3>

              <div className="specs-table">
                {Object.entries(watch.specs).map(([key, val]) => (
                  <div key={key} className="specs-row">
                    <span className="spec-key">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className="spec-val">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="watch-modal-actions">
              <button 
                className="btn-modal-action"
                onClick={handleConsult}
              >
                <span>Solicitar Cita con Concierge</span>
                <ArrowRightIcon size={16} />
              </button>
              
              <button 
                className="btn-modal-dismiss"
                onClick={onClose}
              >
                Cerrar Ficha
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
