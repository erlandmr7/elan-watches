import React from 'react';
import { useAuth } from '../context/AuthContext';
import { WarehouseIcon, ShieldIcon } from '../components/Icons';

export function WarehouseView() {
  const { user } = useAuth();

  return (
    <div>
      <div className="page-header">
        <div className="page-titles">
          <span className="page-category">Subsistema de Logística & Inventario</span>
          <h2 className="page-title">Módulo de Almacén</h2>
          <p className="page-subtitle">
            Control de piezas de alta relojería suiza, movimientos y existencias de colecciones Élan.
          </p>
        </div>
      </div>

      <div className="card card-luxury" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '780px', margin: '2rem auto' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1.5px solid rgba(59, 130, 246, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#60a5fa',
          margin: '0 auto 1.5rem auto'
        }}>
          <WarehouseIcon size={34} />
        </div>

        <span className="badge badge-almacen" style={{ marginBottom: '1rem' }}>
          Rol Asignado: {user?.role}
        </span>

        <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Módulo de Almacén en Fase de Desarrollo
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: 1.7 }}>
          Bienvenido(a), <strong style={{ color: 'var(--text-primary)' }}>{user?.full_name}</strong>. Su cuenta ha sido autenticada exitosamente a través del Subsistema de Seguridad de Élan Watches. 
          De acuerdo con los requerimientos del proyecto, este módulo de inventario y distribución será implementado en las entregas posteriores.
        </p>

        <div style={{
          background: 'var(--bg-surface)',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-muted)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--text-muted)',
          fontSize: '0.82rem'
        }}>
          <ShieldIcon size={16} color="var(--gold-primary)" />
          <span>Aislamiento de Seguridad: Su rol no posee permisos de administración sobre otros usuarios.</span>
        </div>
      </div>
    </div>
  );
}
