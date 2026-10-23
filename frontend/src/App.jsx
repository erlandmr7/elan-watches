import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LoginView } from './views/LoginView';
import { AdminView } from './views/AdminView';
import { WarehouseView } from './views/WarehouseView';
import { ClientView } from './views/ClientView';
import { LandingView } from './views/LandingView';

export function AppContent() {
  const { user, loading, isAuthenticated, isAdmin, isAlmacen, isCliente } = useAuth();
  const [activeTab, setActiveTab] = useState('admin');
  
  // Vista para visitantes no autenticados: 'landing' (por defecto) o 'login'
  const [publicView, setPublicView] = useState('landing');

  // Modo de visualización para usuarios autenticados: 'system' (por defecto) o 'landing' (para explorar la tienda)
  const [authenticatedViewMode, setAuthenticatedViewMode] = useState('system');

  // Ajustar la vista por defecto según el rol del usuario autenticado
  useEffect(() => {
    if (user) {
      setAuthenticatedViewMode('system');
      if (isAdmin) {
        setActiveTab('admin');
      } else if (isAlmacen) {
        setActiveTab('almacen');
      } else {
        setActiveTab('cliente');
      }
    }
  }, [user, isAdmin, isAlmacen, isCliente]);

  // Pantalla de carga inicial mientras se verifica la sesión en el backend
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#08080a',
        gap: '1.25rem'
      }}>
        <div className="brand-emblem" style={{ width: '60px', height: '60px' }}>
          <span style={{ fontSize: '2rem' }}>É</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--gold-primary)', fontSize: '0.88rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <span className="spinner" style={{ width: '20px', height: '20px' }} />
          <span>Verificando Credenciales de Sesión...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, renderizar Landing Page comercial o Login según estado
  if (!isAuthenticated) {
    if (publicView === 'login') {
      return <LoginView onBackToLanding={() => setPublicView('landing')} />;
    }
    return (
      <LandingView 
        onNavigateToLogin={() => setPublicView('login')} 
        user={null}
      />
    );
  }

  // Si está autenticado pero desea explorar la landing page comercial
  if (authenticatedViewMode === 'landing') {
    return (
      <LandingView 
        user={user}
        onNavigateToLogin={() => setAuthenticatedViewMode('system')}
        onReturnToDashboard={() => setAuthenticatedViewMode('system')}
      />
    );
  }

  // Renderizar vistas protegidas según rol y navegación
  const renderView = () => {
    if (activeTab === 'admin') {
      return isAdmin ? <AdminView /> : <div className="alert alert-danger">Acceso no autorizado al panel administrativo.</div>;
    }
    if (activeTab === 'almacen') {
      return isAlmacen ? <WarehouseView /> : <WarehouseView />;
    }
    if (activeTab === 'cliente') {
      return <ClientView />;
    }
    return <AdminView />;
  };

  return (
    <div className="app-wrapper">
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        onOpenLanding={() => setAuthenticatedViewMode('landing')}
      />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
