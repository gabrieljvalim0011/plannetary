import React, { memo } from 'react';
import MoonIcon from './MoonIcon.jsx';
import { phaseLabels } from '../hooks/useMoonPhase.js';

function MoonStatus({ phase, onOpen }) {
  const label = phase?.label || phaseLabels[phase?.phase] || 'Fase lunar';

  return (
    <button
      type="button"
      className="moon-status-wrap moon-status-trigger"
      onClick={onOpen}
      aria-label={`Abrir exploração da Lua. Fase atual: ${label}`}
      title="Explorar Lua"
    >
      <span className="moon-status" aria-hidden="true">
        <MoonIcon phase={phase?.phase || phase} illumination={phase?.illumination} size={64} />
        <span className="moon-status-copy">
          <span>FASE DA LUA</span>
          <strong>{label}</strong>
        </span>
      </span>
    </button>
  );
}

export default memo(MoonStatus);
