import { useState } from 'react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { WatchCollection } from '../components/landing/WatchCollection';
import { BrandStory } from '../components/landing/BrandStory';
import { PillarsSection } from '../components/landing/PillarsSection';
import { ContactSection } from '../components/landing/ContactSection';
import { LandingFooter } from '../components/landing/LandingFooter';
import './LandingView.css';

export function LandingView({ onNavigateToLogin, user, onReturnToDashboard }) {
  const [preselectedModel, setPreselectedModel] = useState('');

  const handleSelectWatchForContact = (watchName) => {
    setPreselectedModel(watchName);
  };

  return (
    <div className="landing-page-root">
      {/* Barra de Navegación de Alta Relojería */}
      <LandingNavbar 
        onNavigateToLogin={onNavigateToLogin}
        user={user}
        onReturnToDashboard={onReturnToDashboard}
      />

      <main>
        {/* 1. Portada Principal (Hero Section) */}
        <HeroSection />

        {/* 2. Colección de Relojes Destacados */}
        <WatchCollection 
          onSelectWatchForContact={handleSelectWatchForContact}
        />

        {/* 3. Filosofía, Historia y Valores de la Marca */}
        <BrandStory />

        {/* 4. Ventajas y Pilares de Excelencia */}
        <PillarsSection />

        {/* 5. Contacto Comercial y Concierge */}
        <ContactSection 
          preselectedModel={preselectedModel}
        />
      </main>

      {/* 6. Pie de Página Comercial */}
      <LandingFooter 
        onNavigateToLogin={onNavigateToLogin}
        user={user}
        onReturnToDashboard={onReturnToDashboard}
      />
    </div>
  );
}
