import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBagIcon, ShieldIcon, UserIcon } from '../components/Icons';

export function ClientView() {
  const { user } = useAuth();

  return (
    <div>
      <div className="page-header">
        <div className="page-titles">
          <span className="page-category">Área Privada de Clientes</span>
          <h2 className="page-title">Bienvenido a Élan Watches</h2>
          <p className="page-subtitle">
            Alta relojería y precisión cronométrica suiza a su disposición.
          </p>
        </div>
      </div>

      <div className="card card-luxury" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '780px', margin: '2rem auto' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(197, 160, 89, 0.1)',
          border: '1.5px solid var(--gold-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--gold-primary)',
          margin: '0 auto 1.5rem auto'
        }}>
          <ShoppingBagIcon size={34} />
        </div>

        <span className="badge badge-cliente" style={{ marginBottom: '1rem' }}>
          Cuenta de Cliente Verificada
        </span>

        <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Portal del Cliente — Colecciones Exclusivas
        </h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: 1.7 }}>
          Estimado(a) <strong style={{ color: 'var(--gold-light)' }}>{user?.full_name}</strong>, su sesión segura se encuentra activa. Desde este espacio podrá explorar piezas de alta manufactura, registrar garantías y dar seguimiento a sus órdenes en los próximos módulos del sistema.
        </p>

        {/* Resumen de Cuenta del Cliente */}
        <div style={{
          background: 'var(--bg-surface)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-muted)',
          maxWidth: '460px',
          margin: '0 auto 1.5rem auto',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Titular:</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{user?.full_name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Correo Registrado:</span>
            <span style={{ color: 'var(--text-primary)' }}>{user?.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Estado de Cuenta:</span>
            <span style={{ color: '#34d399', fontWeight: 600 }}>{user?.status}</span>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-surface)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-muted)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--text-muted)',
          fontSize: '0.82rem'
        }}>
          <ShieldIcon size={16} color="var(--gold-primary)" />
          <span>Acceso Protegido: Los módulos de gestión administrativa no son accesibles para clientes.</span>
        </div>
      </div>
    </div>
  );
}
