import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { EyeIcon, EyeOffIcon, AlertTriangleIcon } from './Icons';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/;

export function UserFormModal({ isOpen, onClose, onSave, initialData = null }) {
  const isEditing = Boolean(initialData);
  const { user: currentLoggedUser } = useAuth();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'CLIENTE',
    status: 'ACTIVO'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        full_name: initialData.full_name || '',
        email: initialData.email || '',
        password: '',
        role: initialData.role || 'CLIENTE',
        status: initialData.status || 'ACTIVO'
      });
    } else {
      setFormData({
        full_name: '',
        email: '',
        password: '',
        role: 'CLIENTE',
        status: 'ACTIVO'
      });
    }
    setErrors({});
    setServerError('');
    setShowPassword(false);
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.full_name.trim() || formData.full_name.trim().length < 2) {
      newErrors.full_name = 'El nombre completo debe tener al menos 2 caracteres.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = 'Ingrese un formato de correo electrónico válido (ejemplo: usuario@elan.com).';
    }

    if (!isEditing) {
      if (!formData.password) {
        newErrors.password = 'La contraseña es obligatoria para nuevos usuarios.';
      } else if (formData.password.length < 8) {
        newErrors.password = 'La contraseña debe tener un mínimo de 8 caracteres.';
      }
    }

    // Regla de negocio preventiva en frontend: admin no debe desactivarse a sí mismo
    if (isEditing && initialData?.id === currentLoggedUser?.id && formData.status === 'INACTIVO') {
      newErrors.status = 'No puedes desactivar tu propia cuenta activa de administrador.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSave(formData, initialData?.id);
      onClose();
    } catch (err) {
      setServerError(err.message || 'Error al procesar la solicitud en el servidor.');
    } finally {
      setSubmitting(false);
    }
  };

  const isSelf = isEditing && initialData?.id === currentLoggedUser?.id;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Editar Usuario — ${initialData?.full_name}` : 'Crear Nuevo Usuario'}
    >
      <form onSubmit={handleSubmit}>
        {serverError && (
          <div className="alert alert-danger">
            <AlertTriangleIcon size={18} />
            <span>{serverError}</span>
          </div>
        )}

        {isSelf && (
          <div className="alert alert-warning" style={{ fontSize: '0.8rem' }}>
            <span>Nota: Estás editando tu propia cuenta actual de Administrador.</span>
          </div>
        )}

        {/* Nombre Completo */}
        <div className="form-group">
          <label className="form-label" htmlFor="full_name">Nombre Completo *</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            className={`form-input ${errors.full_name ? 'error' : ''}`}
            placeholder="Ej. Jean-Luc Girard"
            value={formData.full_name}
            onChange={handleChange}
            autoFocus
          />
          {errors.full_name && <span className="form-error">{errors.full_name}</span>}
        </div>

        {/* Correo Electrónico */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">Correo Electrónico *</label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="usuario@elanwatches.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        {/* Contraseña (Solo en creación) */}
        {!isEditing && (
          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña Criptográfica *</label>
            <div className="input-with-action">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleChange}
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
            <small style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '0.2rem' }}>
              La contraseña será protegida mediante hashing seguro en el backend con Werkzeug.
            </small>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Rol */}
          <div className="form-group">
            <label className="form-label" htmlFor="role">Rol del Sistema *</label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="CLIENTE">CLIENTE</option>
              <option value="ALMACEN">ALMACEN</option>
              <option value="ADMINISTRADOR">ADMINISTRADOR</option>
            </select>
            {errors.role && <span className="form-error">{errors.role}</span>}
          </div>

          {/* Estado */}
          <div className="form-group">
            <label className="form-label" htmlFor="status">Estado de Cuenta *</label>
            <select
              id="status"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="ACTIVO">ACTIVO</option>
              <option value="INACTIVO" disabled={isSelf}>
                INACTIVO {isSelf ? '(Bloqueado para ti)' : ''}
              </option>
            </select>
            {errors.status && <span className="form-error">{errors.status}</span>}
          </div>
        </div>

        <div className="modal-footer" style={{ margin: '1.5rem -1.5rem -1.5rem -1.5rem', padding: '1rem 1.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={submitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner" />
                <span>Guardando...</span>
              </>
            ) : (
              <span>{isEditing ? 'Guardar Cambios' : 'Crear Usuario'}</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
