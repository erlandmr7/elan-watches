import { useState, useEffect } from 'react';
import { BOUTIQUES, WATCHES } from '../../data/watchesData';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, CheckCircleIcon, ArrowRightIcon } from '../Icons';

export function ContactSection({ preselectedModel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    model: '',
    boutique: 'Ginebra (Maison Mère)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (preselectedModel) {
      setFormData(prev => ({ ...prev, model: preselectedModel }));
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedModel]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Por favor ingrese su nombre y apellido.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Por favor ingrese su correo electrónico.';
    } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email.trim())) {
      errs.email = 'Formato de correo electrónico no válido.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulación de envío comercial con respuesta de lujo inmediata
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      model: '',
      boutique: 'Ginebra (Maison Mère)',
      message: ''
    });
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="landing-container">
        
        {/* Cabecera */}
        <div className="section-header text-center">
          <span className="section-pretitle">ATENCIÓN EXCLUSIVA</span>
          <h2 className="section-title">
            Concierge Privado & <span className="gold-text-gradient">Citas Demostrativas</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Permítanos guiarle en la elección de su próxima pieza de alta relojería o agendar 
            una presentación privada en cualquiera de nuestras boutiques.
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Columna de Formulario */}
          <div className="contact-form-panel">
            {submitted ? (
              <div className="contact-success-state">
                <div className="success-icon-wrap">
                  <CheckCircleIcon size={48} color="#c5a059" />
                </div>
                <h3 className="success-title">Solicitud Recibida por Nuestro Concierge</h3>
                <p className="success-desc">
                  Estimado(a) <strong style={{ color: 'var(--gold-light)' }}>{formData.name}</strong>, 
                  su solicitud para conocer la pieza <em>{formData.model || 'Élan Watches'}</em> en nuestra 
                  boutique de <em>{formData.boutique}</em> ha sido registrada exitosamente.
                </p>
                <p className="success-note">
                  Un asesor privado de la Maison se pondrá en contacto con usted en un plazo no mayor 
                  a 24 horas a través de <strong>{formData.email}</strong>.
                </p>
                <button 
                  className="btn-gold-solid"
                  onClick={handleReset}
                  style={{ marginTop: '1.5rem' }}
                >
                  Enviar Otra Consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="form-panel-title">Solicitud de Presentación Privada</h3>
                <p className="form-panel-desc">
                  Complete los siguientes datos y nuestro equipo preparará una selección a su medida.
                </p>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="landing-label" htmlFor="concierge-name">
                      Nombre y Apellido *
                    </label>
                    <input 
                      id="concierge-name"
                      type="text" 
                      className={`landing-input ${errors.name ? 'error' : ''}`}
                      placeholder="Ej. Jean-Luc Delacroix"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                    />
                    {errors.name && <span className="landing-form-error">{errors.name}</span>}
                  </div>

                  <div className="form-group flex-1">
                    <label className="landing-label" htmlFor="concierge-email">
                      Correo Electrónico *
                    </label>
                    <input 
                      id="concierge-email"
                      type="email" 
                      className={`landing-input ${errors.email ? 'error' : ''}`}
                      placeholder="delacroix@hautehorlogerie.ch"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                    />
                    {errors.email && <span className="landing-form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label className="landing-label" htmlFor="concierge-phone">
                      Teléfono Móvil
                    </label>
                    <input 
                      id="concierge-phone"
                      type="tel" 
                      className="landing-input"
                      placeholder="+41 22 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group flex-1">
                    <label className="landing-label" htmlFor="concierge-model">
                      Pieza o Colección de Interés
                    </label>
                    <select
                      id="concierge-model"
                      className="landing-input landing-select"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    >
                      <option value="">Seleccione una pieza...</option>
                      {WATCHES.map(w => (
                        <option key={w.id} value={w.name}>
                          {w.name} ({w.collection})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="landing-label" htmlFor="concierge-boutique">
                    Boutique de Preferencia para Cita
                  </label>
                  <select
                    id="concierge-boutique"
                    className="landing-input landing-select"
                    value={formData.boutique}
                    onChange={(e) => setFormData({ ...formData, boutique: e.target.value })}
                  >
                    {BOUTIQUES.map((b, i) => (
                      <option key={i} value={b.city}>{b.city} — {b.address}</option>
                    ))}
                    <option value="Virtual VIP">Presentación Virtual en Línea (VIP Concierge)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="landing-label" htmlFor="concierge-message">
                    Mensaje o Requerimientos Particulares
                  </label>
                  <textarea 
                    id="concierge-message"
                    rows="3"
                    className="landing-input landing-textarea"
                    placeholder="Describa el horario preferente, grabados conmemorativos u ocasiones especiales..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-gold-solid full-width"
                  disabled={loading}
                  style={{ marginTop: '0.75rem', padding: '0.95rem' }}
                >
                  {loading ? (
                    <span>Procesando Solicitud...</span>
                  ) : (
                    <>
                      <span>Solicitar Cita con Concierge</span>
                      <ArrowRightIcon size={16} />
                    </>
                  )}
                </button>

                <p className="form-privacy-note">
                  Su privacidad es de la mayor importancia. Sus datos personales no serán compartidos 
                  y se tratarán bajo los más altos estándares de confidencialidad suiza.
                </p>
              </form>
            )}
          </div>

          {/* Columna de Boutiques y Contacto Directo */}
          <div className="contact-info-panel">
            <h3 className="boutiques-title">Nuestras Boutiques Principales</h3>
            <p className="boutiques-desc">
              Espacios dedicados al silencio, el lujo discreto y la apreciación de la alta relojería.
            </p>

            <div className="boutiques-list">
              {BOUTIQUES.map((b, i) => (
                <div key={i} className="boutique-card">
                  <div className="boutique-city-header">
                    <MapPinIcon size={16} color="#c5a059" />
                    <span className="boutique-city">{b.city}</span>
                  </div>
                  <p className="boutique-address">{b.address}</p>
                  
                  <div className="boutique-details">
                    <div className="boutique-detail-item">
                      <PhoneIcon size={13} color="#a0a0ab" />
                      <span>{b.phone}</span>
                    </div>
                    <div className="boutique-detail-item">
                      <ClockIcon size={13} color="#a0a0ab" />
                      <span>{b.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Canal VIP Directo */}
            <div className="vip-channel-card">
              <div className="vip-channel-header">
                <MailIcon size={16} color="#c5a059" />
                <span className="vip-channel-title">Atelier & Consultas Directas</span>
              </div>
              <p className="vip-channel-desc">
                Para solicitudes de prensa, piezas a medida o colecciones especiales:
              </p>
              <div className="vip-email">concierge@elanwatches.com</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
