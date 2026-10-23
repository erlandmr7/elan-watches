import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import {
  UsersIcon,
  PlusIcon,
  SearchIcon,
  EditIcon,
  EyeIcon,
  TrashIcon,
  ShieldIcon,
  AlertTriangleIcon
} from '../components/Icons';
import { UserFormModal } from '../components/UserFormModal';
import { UserDetailModal } from '../components/UserDetailModal';
import { DeactivateConfirmModal } from '../components/DeactivateConfirmModal';
import { ToastContainer } from '../components/Toast';

export function AdminView() {
  const { user: currentLoggedUser, refreshUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('TODOS');
  const [filterStatus, setFilterStatus] = useState('TODOS');

  // Modales
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState(null);

  // Notificaciones Toast
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cargar lista de usuarios
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get('/api/users');
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message || 'Error al obtener la lista de usuarios.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Manejador Guardar Usuario (Crear / Editar)
  const handleSaveUser = async (formData, userId) => {
    if (userId) {
      // Actualización (PUT)
      const res = await api.put(`/api/users/${userId}`, formData);
      addToast(`Usuario '${res.user.full_name}' actualizado exitosamente.`);
      if (userId === currentLoggedUser?.id) {
        await refreshUser();
      }
    } else {
      // Creación (POST)
      const res = await api.post('/api/users', formData);
      addToast(`Usuario '${res.user.full_name}' registrado exitosamente.`);
    }
    await loadUsers();
  };

  // Manejador Desactivación Lógica (DELETE / PUT Status)
  const handleToggleStatus = async (userId) => {
    const target = users.find(u => u.id === userId);
    if (!target) return;

    if (target.status === 'ACTIVO') {
      // Desactivación lógica mediante endpoint DELETE
      const res = await api.delete(`/api/users/${userId}`);
      addToast(res.message || `Usuario '${target.full_name}' desactivado.`, 'success');
    } else {
      // Reactivación mediante endpoint PUT
      const res = await api.put(`/api/users/${userId}`, {
        full_name: target.full_name,
        email: target.email,
        role: target.role,
        status: 'ACTIVO'
      });
      addToast(`Usuario '${target.full_name}' reactivado exitosamente.`, 'success');
    }
    await loadUsers();
  };

  // Métricas calculadas
  const metrics = useMemo(() => {
    const total = users.length;
    const active = users.filter(u => u.status === 'ACTIVO').length;
    const inactive = users.filter(u => u.status === 'INACTIVO').length;
    const admins = users.filter(u => u.role === 'ADMINISTRADOR').length;
    return { total, active, inactive, admins };
  }, [users]);

  // Lista de usuarios filtrada
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch =
        u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(u.id).includes(searchTerm);

      const matchesRole = filterRole === 'TODOS' || u.role === filterRole;
      const matchesStatus = filterStatus === 'TODOS' || u.status === filterStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, filterRole, filterStatus]);

  return (
    <div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Cabecera del Panel */}
      <div className="page-header">
        <div className="page-titles">
          <span className="page-category">Panel de Administración</span>
          <h2 className="page-title">Gestión de Seguridad & Usuarios</h2>
          <p className="page-subtitle">
            Administración centralizada de cuentas, control de accesos por roles y políticas de seguridad para Élan Watches.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingUser(null);
            setIsFormOpen(true);
          }}
        >
          <PlusIcon size={16} />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* Grilla de Métricas de Seguridad */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Cuentas</span>
          <span className="stat-value">{metrics.total}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Cuentas Activas</span>
          <span className="stat-value green">{metrics.active}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Cuentas Inactivas</span>
          <span className="stat-value red">{metrics.inactive}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Administradores</span>
          <span className="stat-value gold">{metrics.admins}</span>
        </div>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div className="toolbar">
        <div className="search-input-wrapper">
          <SearchIcon size={16} />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre, correo o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters-group">
          {/* Filtro por Rol */}
          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.65rem 1rem' }}
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="TODOS">Todos los Roles</option>
            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
            <option value="ALMACEN">ALMACEN</option>
            <option value="CLIENTE">CLIENTE</option>
          </select>

          {/* Filtro por Estado */}
          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.65rem 1rem' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="TODOS">Todos los Estados</option>
            <option value="ACTIVO">ACTIVOS</option>
            <option value="INACTIVO">INACTIVOS</option>
          </select>
        </div>
      </div>

      {/* Mensaje de Error en Carga */}
      {error && (
        <div className="alert alert-danger">
          <AlertTriangleIcon size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Tabla Principal de Usuarios */}
      <div className="table-container">
        {loading ? (
          <div style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <span className="spinner" style={{ width: '28px', height: '28px', color: 'var(--gold-primary)', marginBottom: '0.85rem' }} />
            <div>Cargando registros de seguridad...</div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              No se encontraron usuarios coincidentes.
            </p>
            <span style={{ fontSize: '0.82rem' }}>
              {searchTerm || filterRole !== 'TODOS' || filterStatus !== 'TODOS'
                ? 'Pruebe ajustando o limpiando los criterios de búsqueda y filtros.'
                : 'Comience creando el primer usuario adicional del sistema.'}
            </span>
          </div>
        ) : (
          <table className="luxury-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>ID</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Fecha de Creación</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const isSelf = u.id === currentLoggedUser?.id;
                return (
                  <tr key={u.id}>
                    {/* ID */}
                    <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      #{u.id}
                    </td>

                    {/* Usuario (Nombre + Correo) */}
                    <td>
                      <div className="user-identity">
                        <span className="user-name">
                          {u.full_name} {isSelf && <small style={{ color: 'var(--gold-light)', fontWeight: 'normal' }}>(Tú)</small>}
                        </span>
                        <span className="user-email">{u.email}</span>
                      </div>
                    </td>

                    {/* Rol */}
                    <td>
                      <span className={`badge ${u.role === 'ADMINISTRADOR' ? 'badge-admin' : (u.role === 'ALMACEN' ? 'badge-almacen' : 'badge-cliente')}`}>
                        {u.role}
                      </span>
                    </td>

                    {/* Estado */}
                    <td>
                      <span className={`badge ${u.status === 'ACTIVO' ? 'badge-active' : 'badge-inactive'}`}>
                        <span className={`status-dot ${u.status === 'ACTIVO' ? 'active' : 'inactive'}`} />
                        {u.status}
                      </span>
                    </td>

                    {/* Fecha de Creación */}
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                      {u.created_at || '—'}
                    </td>

                    {/* Acciones */}
                    <td>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        {/* Ver Detalles */}
                        <button
                          className="btn-icon"
                          title="Consultar detalles completos"
                          onClick={() => {
                            setSelectedUser(u);
                            setIsDetailOpen(true);
                          }}
                        >
                          <EyeIcon size={16} />
                        </button>

                        {/* Editar */}
                        <button
                          className="btn-icon"
                          title="Editar información de usuario"
                          onClick={() => {
                            setEditingUser(u);
                            setIsFormOpen(true);
                          }}
                        >
                          <EditIcon size={16} />
                        </button>

                        {/* Desactivar / Reactivar */}
                        <button
                          className={`btn-icon ${u.status === 'ACTIVO' ? 'danger' : ''}`}
                          title={
                            isSelf
                              ? "No puedes desactivar tu propia cuenta activa de administrador"
                              : (u.status === 'ACTIVO' ? "Desactivar usuario lógicamente" : "Reactivar usuario")
                          }
                          disabled={isSelf && u.status === 'ACTIVO'}
                          onClick={() => {
                            setUserToDeactivate(u);
                            setIsDeactivateOpen(true);
                          }}
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modales */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
        initialData={editingUser}
      />

      <UserDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      <DeactivateConfirmModal
        isOpen={isDeactivateOpen}
        onClose={() => {
          setIsDeactivateOpen(false);
          setUserToDeactivate(null);
        }}
        user={userToDeactivate}
        onConfirm={handleToggleStatus}
      />
    </div>
  );
}
