import React, { useId } from 'react';

const phaseLabels = {
  'phase-new': 'Lua nova',
  'phase-crescent': 'Lua crescente',
  'phase-quarter': 'Quarto crescente',
  'phase-gibbous': 'Gibosa crescente',
  'phase-full': 'Lua cheia',
  'phase-waning-gibbous': 'Gibosa minguante',
  'phase-waning-quarter': 'Quarto minguante',
  'phase-waning-crescent': 'Lua minguante',
};


function DynamicMoon({ phase, illumination, clipId }) {
  const f = Math.min(1, Math.max(0, illumination / 100));
  const rx = Math.max(0.15, 14 * Math.abs(2 * f - 1));
  const waxing = phase === 'phase-crescent' || phase === 'phase-quarter' || phase === 'phase-gibbous';
  const waning = phase === 'phase-waning-crescent' || phase === 'phase-waning-quarter' || phase === 'phase-waning-gibbous';

  if (f <= 0.01 || phase === 'phase-new') {
    return <circle className="moon-shadow" cx="20" cy="20" r="14" clipPath={`url(#${clipId})`} />;
  }
  if (f >= 0.99 || phase === 'phase-full') {
    return <circle className="moon-light" cx="20" cy="20" r="14" />;
  }

  if (waxing && f < 0.5) {
    return (
      <path
        className="moon-light"
        d={`M20 6 A14 14 0 0 1 20 34 A${rx} 14 0 0 0 20 6 Z`}
        clipPath={`url(#${clipId})`}
      />
    );
  }
  if (waning && f < 0.5) {
    return (
      <path
        className="moon-light"
        d={`M20 6 A14 14 0 0 0 20 34 A${rx} 14 0 0 1 20 6 Z`}
        clipPath={`url(#${clipId})`}
      />
    );
  }
  if (waxing && f >= 0.5) {
    return (
      <>
        <circle className="moon-light" cx="20" cy="20" r="14" />
        <path
          className="moon-shadow"
          d={`M20 6 A14 14 0 0 0 20 34 A${rx} 14 0 0 1 20 6 Z`}
          clipPath={`url(#${clipId})`}
        />
      </>
    );
  }
  if (waning && f >= 0.5) {
    return (
      <>
        <circle className="moon-light" cx="20" cy="20" r="14" />
        <path
          className="moon-shadow"
          d={`M20 6 A14 14 0 0 1 20 34 A${rx} 14 0 0 0 20 6 Z`}
          clipPath={`url(#${clipId})`}
        />
      </>
    );
  }

  return <circle className="moon-light" cx="20" cy="20" r="14" />;
}

export default function MoonIcon({ phase = 'phase-full', size = 30, illumination = null }) {
  const clipId = `moon-disc-clip-${useId().replace(/:/g, '')}`;
  const label = phaseLabels[phase] || phaseLabels['phase-full'];

  return (
    <svg
      className="moon-icon"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label={label}
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="20" cy="20" r="14" />
        </clipPath>
      </defs>

      <circle className="moon-base" cx="20" cy="20" r="14" />

      {Number.isFinite(illumination) ? (
        <DynamicMoon phase={phase} illumination={illumination} clipId={clipId} />
      ) : (
        <>
          {phase === 'phase-new' && <circle className="moon-shadow" cx="20" cy="20" r="14" clipPath={`url(#${clipId})`} />}

          {phase === 'phase-crescent' && (
            <>
              <circle className="moon-light" cx="20" cy="20" r="14" />
              <circle className="moon-shadow" cx="15" cy="20" r="14" clipPath={`url(#${clipId})`} />
            </>
          )}

          {phase === 'phase-quarter' && (
            <path
              className="moon-light"
              d="M20 6 A14 14 0 0 1 20 34 L20 6 Z"
              clipPath={`url(#${clipId})`}
            />
          )}

          {phase === 'phase-gibbous' && (
            <>
              <circle className="moon-light" cx="20" cy="20" r="14" />
              <ellipse className="moon-shadow" cx="14" cy="20" rx="11" ry="14" clipPath={`url(#${clipId})`} />
            </>
          )}

          {phase === 'phase-full' && <circle className="moon-light" cx="20" cy="20" r="14" />}

          {phase === 'phase-waning-gibbous' && (
            <>
              <circle className="moon-light" cx="20" cy="20" r="14" />
              <ellipse className="moon-shadow" cx="26" cy="20" rx="11" ry="14" clipPath={`url(#${clipId})`} />
            </>
          )}

          {phase === 'phase-waning-quarter' && (
            <path
              className="moon-light"
              d="M20 6 A14 14 0 0 0 20 34 L20 6 Z"
              clipPath={`url(#${clipId})`}
            />
          )}

          {phase === 'phase-waning-crescent' && (
            <>
              <circle className="moon-light" cx="20" cy="20" r="14" />
              <circle className="moon-shadow" cx="25" cy="20" r="14" clipPath={`url(#${clipId})`} />
            </>
          )}
        </>
      )}
    </svg>
  );
}
