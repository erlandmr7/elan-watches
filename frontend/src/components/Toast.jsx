import React from 'react';
import { CheckCircleIcon, AlertTriangleIcon, XIcon } from './Icons';

export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          {toast.type === 'success' ? (
            <CheckCircleIcon size={20} color="var(--color-success)" />
          ) : (
            <AlertTriangleIcon size={20} color="var(--color-danger)" />
          )}
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block' }}>
              {toast.message}
            </span>
          </div>
          <button
            className="btn-icon"
            style={{ width: '24px', height: '24px', border: 'none', background: 'transparent' }}
            onClick={() => onDismiss(toast.id)}
            aria-label="Cerrar notificación"
          >
            <XIcon size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
