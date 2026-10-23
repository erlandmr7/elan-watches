import React from 'react';
import { Modal } from './Modal';
import { ShieldIcon, UserIcon, CheckCircleIcon } from './Icons';

export function UserDetailModal({ isOpen, onClose, user }) {
  if (!user) return null;

  const getRoleDescription = (role) => {
    switch (role) {
      case 'ADMINISTRADOR':
        return 'Acceso total al Subsistema de Seguridad, gestión y administración de usuarios, auditoría y control de accesos.';
      case 'ALMACEN':
        return 'Acceso reservado a la gestión futura de catálogo, inventario y órdenes de distribución de relojes.';
      case 'CLIENTE':
      default:
        return 'Acceso al portal de compras, visualización de colecciones y estado de pedidos de relojes.';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ficha Detallada de Usuario"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Encabezado con Avatar e Identidad */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-muted)' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--gold-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-primary)'
          }}>
            <UserIcon size={26} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {user.full_name}
            </h4>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {user.email}
            </span>
          </div>
        </div>

        {/* Grilla de Datos Clave */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-muted)' }}>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block' }}>
              Identificador (ID)
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              #{user.id}
            </span>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-muted)' }}>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block' }}>
              Fecha de Registro
            </span>
            <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)' }}>
              {user.created_at || 'No especificada'}
            </span>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-muted)' }}>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block' }}>
              Rol en el Sistema
            </span>
            <div style={{ marginTop: '0.25rem' }}>
              <span className={`badge ${user.role === 'ADMINISTRADOR' ? 'badge-admin' : (user.role === 'ALMACEN' ? 'badge-almacen' : 'badge-cliente')}`}>
                {user.role}
              </span>
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-muted)' }}>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block' }}>
              Estado Actual
            </span>
            <div style={{ marginTop: '0.25rem' }}>
              <span className={`badge ${user.status === 'ACTIVO' ? 'badge-active' : 'badge-inactive'}`}>
                <span className={`status-dot ${user.status === 'ACTIVO' ? 'active' : 'inactive'}`} />
                {user.status}
              </span>
            </div>
          </div>
        </div>

        {/* Alcance de Permisos */}
        <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-muted)' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-primary)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
            Alcance de Permisos
          </span>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {getRoleDescription(user.role)}
          </p>
        </div>

        {/* Indicador de Privacidad Criptográfica */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem', background: 'rgba(197, 160, 89, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-border)' }}>
          <ShieldIcon size={16} color="var(--gold-primary)" />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Cumplimiento de seguridad: Las credenciales y hashes están aislados en el servidor y no son transmitidos al frontend.
          </span>
        </div>

        <div className="modal-footer" style={{ margin: '0.5rem -1.5rem -1.5rem -1.5rem', padding: '1rem 1.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cerrar Ficha
          </button>
        </div>
      </div>
    </Modal>
  );
}
