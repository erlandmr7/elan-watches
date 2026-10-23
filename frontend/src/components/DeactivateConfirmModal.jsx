import React, { useState } from 'react';
import { Modal } from './Modal';
import { AlertTriangleIcon } from './Icons';
import { useAuth } from '../context/AuthContext';

export function DeactivateConfirmModal({ isOpen, onClose, user, onConfirm }) {
  const { user: currentLoggedUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!user) return null;

  const isSelf = user.id === currentLoggedUser?.id;
  const isCurrentlyActive = user.status === 'ACTIVO';

  const handleConfirm = async () => {
    if (isSelf) {
      setErrorMsg('No puedes desactivar tu propia cuenta activa de administrador.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');
      await onConfirm(user.id);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Error al modificar el estado del usuario.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isCurrentlyActive ? "Confirmar Desactivación de Cuenta" : "Confirmar Reactivación de Cuenta"}
    >
      <div>
        {errorMsg && (
          <div className="alert alert-danger">
            <AlertTriangleIcon size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: isCurrentlyActive ? 'var(--color-danger-bg)' : 'var(--color-success-bg)',
            border: `1px solid ${isCurrentlyActive ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isCurrentlyActive ? 'var(--color-danger)' : 'var(--color-success)',
            flexShrink: 0
          }}>
            <AlertTriangleIcon size={20} />
          </div>

          <div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              ¿Está seguro de que desea {isCurrentlyActive ? 'desactivar' : 'reactivar'} al usuario{' '}
              <strong style={{ color: 'var(--gold-light)' }}>{user.full_name}</strong> ({user.email})?
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {isCurrentlyActive
                ? 'Esta acción realizará una desactivación lógica (soft delete). El usuario no podrá iniciar sesión en la plataforma mientras se encuentre inactivo, pero sus registros de compras y auditoría se mantendrán intactos.'
                : 'Esta acción reactivará la cuenta permitiendo al usuario volver a iniciar sesión con sus credenciales habituales.'}
            </p>
          </div>
        </div>

        {isSelf && (
          <div className="alert alert-warning" style={{ fontSize: '0.82rem' }}>
            <span>Operación bloqueada: No está permitido que un administrador desactive su propia sesión activa.</span>
          </div>
        )}

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
            type="button"
            className={`btn ${isCurrentlyActive ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleConfirm}
            disabled={submitting || isSelf}
          >
            {submitting ? (
              <>
                <span className="spinner" />
                <span>Procesando...</span>
              </>
            ) : (
              <span>{isCurrentlyActive ? 'Sí, Desactivar Usuario' : 'Sí, Reactivar Usuario'}</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
