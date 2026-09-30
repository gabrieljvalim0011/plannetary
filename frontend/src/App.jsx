import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import MoonStatus from './components/MoonStatus.jsx';
import PlanetSidebar, { PlanetRail } from './components/PlanetSidebar.jsx';
import PlanetHero from './components/PlanetHero.jsx';
import PlanetStats from './components/PlanetStats.jsx';
import AstronomicalOverlay from './components/AstronomicalOverlay.jsx';
import PlanetCalculator from './components/PlanetCalculator.jsx';
import Starfield from './components/Starfield.jsx';
import CosmicIntro from './components/CosmicIntro.jsx';
import { useMoonPhase } from './hooks/useMoonPhase.js';
import { getPlanetById, planets } from './data/planets.js';

const MissionPanel = lazy(() => import('./components/MissionPanel.jsx'));
const MoonPanel = lazy(() => import('./components/MoonPanel.jsx'));
const PlanetExperience = lazy(() => import('./components/PlanetExperience.jsx'));

const SELECTED_PLANET_KEY = 'plannetary-selected-planet';

export default function App() {
  const moonPhase = useMoonPhase();
  const [selectedPlanetId, setSelectedPlanetId] = useState(() => localStorage.getItem(SELECTED_PLANET_KEY) || 'marte');
  const [planetExperienceOpen, setPlanetExperienceOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('planets');
  const selectedPlanet = getPlanetById(selectedPlanetId);
  const sceneStyle = useMemo(() => ({
    '--planet-accent': selectedPlanet.accent,
    '--planet-glow': selectedPlanet.glow,
  }), [selectedPlanet.accent, selectedPlanet.glow]);

  useEffect(() => {
    localStorage.setItem(SELECTED_PLANET_KEY, selectedPlanet.id);
  }, [selectedPlanet.id]);

  const handleSelectPlanet = useCallback((id, keepExperienceOpen = false) => {
    setSelectedPlanetId((current) => (id !== current ? id : current));
    if (!keepExperienceOpen) setPlanetExperienceOpen(false);
  }, []);

  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
    if (section === 'missions' || section === 'moon') setPlanetExperienceOpen(false);
  }, []);

  const toggleDetails = useCallback(() => setPlanetExperienceOpen((open) => !open), []);
  const closeExperience = useCallback(() => setActiveSection('planets'), []);
  const openMoon = useCallback(() => handleSectionChange('moon'), [handleSectionChange]);

  return (
    <div className={`immersive-app ${activeSection === 'missions' ? 'is-mission-mode' : ''} ${activeSection === 'moon' ? 'is-moon-mode' : ''}`} style={sceneStyle}>
      <CosmicIntro />
      <Starfield />
      <PlanetSidebar activeSection={activeSection} onSectionChange={handleSectionChange} />

      <header className="immersive-header">
        <div className="header-brand">PLANNETARY <span>✦</span></div>
        <div className="header-status"><span className="live-dot" /> EXPLORAÇÃO DO SISTEMA SOLAR</div>
        <MoonStatus phase={moonPhase} onOpen={openMoon} />
      </header>

      <main className="immersive-main" data-section={activeSection}>
        <div key={`stats-${selectedPlanet.id}`} className="planet-transition planet-stats-transition"><PlanetStats planet={selectedPlanet} /></div>
        <AstronomicalOverlay planet={selectedPlanet} activeSection={activeSection} />
        <div key={`hero-${selectedPlanet.id}`} className="planet-transition planet-hero-transition"><PlanetHero planet={selectedPlanet} onDetails={toggleDetails} /></div>

        <div className="lower-strip">
          <PlanetCalculator planet={selectedPlanet} />
        </div>

        {planetExperienceOpen ? (
          <Suspense fallback={<div className="experience-loading" aria-live="polite">Preparando a experiência de {selectedPlanet.name}…</div>}>
            <PlanetExperience
              planet={selectedPlanet}
              planets={planets}
              onSelectPlanet={(id) => handleSelectPlanet(id, true)}
              onClose={() => setPlanetExperienceOpen(false)}
            />
          </Suspense>
        ) : null}
        {activeSection === 'missions' ? (
          <Suspense fallback={<div className="experience-loading" aria-live="polite">Carregando missões…</div>}>
            <MissionPanel
              planet={selectedPlanet}
              planets={planets}
              selectedPlanetId={selectedPlanet.id}
              onSelectPlanet={handleSelectPlanet}
              onClose={closeExperience}
            />
          </Suspense>
        ) : null}
        {activeSection === 'moon' ? (
          <Suspense fallback={<div className="experience-loading" aria-live="polite">Preparando a experiência lunar…</div>}>
            <MoonPanel phase={moonPhase} onClose={closeExperience} />
          </Suspense>
        ) : null}
      </main>

      <PlanetRail planets={planets} selectedPlanetId={selectedPlanet.id} onSelect={handleSelectPlanet} />
    </div>
  );
}
