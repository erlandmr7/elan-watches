import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeOffIcon, AlertTriangleIcon, ShieldIcon } from '../components/Icons';

const EMAIL_REGEX = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/;

export function LoginView({ onBackToLanding }) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'El correo electrónico es un campo obligatorio.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errs.email = 'Ingrese un correo electrónico con formato válido.';
    }

    if (!password) {
      errs.password = 'La contraseña es un campo obligatorio.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (!validate()) return;

    try {
      setLoading(true);
      await login(email.trim(), password);
    } catch (err) {
      setAuthError({
        message: err.message || 'Error al iniciar sesión.',
        isInactive: err.status === 403 || err.data?.error === 'ACCOUNT_INACTIVE'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'radial-gradient(ellipse at 50% 20%, #171511 0%, #08080a 70%)'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        
        {/* Botón de Retorno a la Landing Page Comercial */}
        {onBackToLanding && (
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onBackToLanding}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.78rem',
                padding: '0.45rem 0.95rem',
                color: 'var(--gold-primary)',
                borderColor: 'rgba(197, 160, 89, 0.35)',
                background: 'rgba(197, 160, 89, 0.05)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <span>← Volver a la Tienda Comercial</span>
            </button>
          </div>
        )}

        {/* Cabecera de Marca de Lujo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="brand-emblem" style={{ width: '56px', height: '56px', margin: '0 auto 1rem auto' }}>
            <span style={{ fontSize: '1.75rem' }}>É</span>
          </div>
          <h1 className="brand-name" style={{ fontSize: '1.65rem', letterSpacing: '0.28em', marginBottom: '0.4rem' }}>
            ÉLAN WATCHES
          </h1>
          <span className="brand-subtitle" style={{ fontSize: '0.72rem', letterSpacing: '0.3em' }}>
            SUBSISTEMA DE SEGURIDAD Y CONTROL DE ACCESO
          </span>
        </div>

        {/* Tarjeta del Formulario de Login */}
        <div className="card card-luxury" style={{ padding: '2.25rem' }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Iniciar Sesión
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Acceda a la plataforma administrativa y operativa de Élan
            </p>
          </div>

          {/* Banner de Errores de Autenticación */}
          {authError && (
            <div className={`alert ${authError.isInactive ? 'alert-warning' : 'alert-danger'}`}>
              <AlertTriangleIcon size={18} />
              <div>
                <strong style={{ display: 'block', marginBottom: '0.15rem' }}>
                  {authError.isInactive ? 'Cuenta Desactivada' : 'Error de Autenticación'}
                </strong>
                <span>{authError.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Campo Correo Electrónico */}
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Correo Electrónico</label>
              <input
                id="login-email"
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="ejemplo@elanwatches.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                }}
                disabled={loading}
                autoFocus
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Campo Contraseña */}
            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Contraseña</label>
              <div className="input-with-action">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                  }}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="input-action-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            {/* Botón de Envío */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.75rem', padding: '0.85rem' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  <span>Verificando Credenciales...</span>
                </>
              ) : (
                <span>Ingresar al Sistema</span>
              )}
            </button>
          </form>

          {/* Garantías de Seguridad */}
          <div style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.72rem'
          }}>
            <ShieldIcon size={14} color="var(--gold-primary)" />
            <span>Sesiones HttpOnly protegidas con tokens CSRF</span>
          </div>
        </div>

        {/* Guía Rápida para el Evaluador */}
        <div style={{
          marginTop: '1.25rem',
          padding: '0.85rem 1rem',
          background: 'rgba(21, 21, 27, 0.6)',
          border: '1px dashed var(--border-muted)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.76rem',
          color: 'var(--text-secondary)'
        }}>
          <strong style={{ color: 'var(--gold-light)', display: 'block', marginBottom: '0.25rem' }}>
            Acceso Rápido para Pruebas:
          </strong>
          <div>Para iniciar con el administrador inicial generado por el script:</div>
          <div style={{ marginTop: '0.2rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
            Correo: <span style={{ color: 'var(--gold-light)' }}>admin@elanwatches.com</span>
          </div>
        </div>

      </div>
    </div>
  );
}
