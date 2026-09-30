import React, { lazy, memo, Suspense } from 'react';

const Moon3DCanvas = lazy(() => import('./Moon3DCanvas.jsx'));

const PHASE_NAMES = {
  'phase-new': 'Lua nova',
  'phase-crescent': 'Lua crescente',
  'phase-quarter': 'Quarto crescente',
  'phase-gibbous': 'Gibosa crescente',
  'phase-full': 'Lua cheia',
  'phase-waning-gibbous': 'Gibosa minguante',
  'phase-waning-quarter': 'Quarto minguante',
  'phase-waning-crescent': 'Lua minguante',
};

function Moon3D({ phase = 'phase-full', phenomenon = null, size = 'clamp(190px, 23vw, 330px)' }) {
  const phaseName = PHASE_NAMES[phase] || PHASE_NAMES['phase-full'];
  const label = phenomenon ? `${phenomenon}: ${phaseName}` : phaseName;
  return (
    <div className="moon-3d" style={{ '--moon-size': size }} role="img" aria-label={label}>
      <Suspense fallback={<div className={`moon-3d-fallback-sphere ${phase}`} aria-hidden="true" />}>
        <Moon3DCanvas phase={phase} phenomenon={phenomenon} size={size} />
      </Suspense>
    </div>
  );
}

export default memo(Moon3D);
