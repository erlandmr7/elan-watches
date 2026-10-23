import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldIcon, LogOutIcon, UserIcon } from './Icons';

export function Navbar({ activeTab, onSelectTab, onOpenLanding }) {
  const { user, logout, isAdmin, isAlmacen, isCliente } = useAuth();

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'ADMINISTRADOR':
        return 'badge-admin';
      case 'ALMACEN':
        return 'badge-almacen';
      case 'CLIENTE':
      default:
        return 'badge-cliente';
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logotipo y Título de Marca */}
        <div className="brand-container" onClick={() => onSelectTab && onSelectTab(isAdmin ? 'admin' : (isAlmacen ? 'almacen' : 'cliente'))}>
          <div className="brand-emblem">
            <span>É</span>
          </div>
          <div className="brand-titles">
            <span className="brand-name">ÉLAN WATCHES</span>
            <span className="brand-subtitle">SUBSISTEMA SEGURIDAD</span>
          </div>
        </div>

        {/* Enlaces de Navegación según Rol */}
        {user && (
          <nav>
            <ul className="nav-links">
              {isAdmin && (
                <li>
                  <button
                    className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
                    onClick={() => onSelectTab('admin')}
                  >
                    Gestión de Usuarios
                  </button>
                </li>
              )}
              {isAlmacen && (
                <li>
                  <button
                    className={`nav-link ${activeTab === 'almacen' ? 'active' : ''}`}
                    onClick={() => onSelectTab('almacen')}
                  >
                    Módulo de Almacén
                  </button>
                </li>
              )}
              {isCliente && (
                <li>
                  <button
                    className={`nav-link ${activeTab === 'cliente' ? 'active' : ''}`}
                    onClick={() => onSelectTab('cliente')}
                  >
                    Portal de Cliente
                  </button>
                </li>
              )}
            </ul>
          </nav>
        )}

        {/* Acciones de Usuario y Cierre de Sesión */}
        {user && (
          <div className="nav-user-actions">
            {onOpenLanding && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onOpenLanding}
                title="Explorar el sitio web comercial de Élan Watches"
                style={{
                  padding: '0.45rem 0.85rem',
                  borderColor: 'rgba(197, 160, 89, 0.4)',
                  color: 'var(--gold-light)',
                  background: 'rgba(197, 160, 89, 0.08)'
                }}
              >
                <span>Ver Tienda</span>
              </button>
            )}

            <div className="user-badge" title={user.email}>
              <UserIcon size={14} color="#c5a059" />
              <span className="user-badge-name">{user.full_name}</span>
              <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                {user.role}
              </span>
            </div>

            <button
              className="btn btn-secondary"
              onClick={logout}
              title="Cerrar sesión segura"
              style={{ padding: '0.45rem 0.85rem' }}
            >
              <LogOutIcon size={15} />
              <span>Salir</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
