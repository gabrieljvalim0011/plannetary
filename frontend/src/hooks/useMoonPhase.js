import { useEffect, useRef, useState } from 'react';

const phaseClasses = [
  'phase-new',
  'phase-crescent',
  'phase-quarter',
  'phase-gibbous',
  'phase-full',
  'phase-waning-gibbous',
  'phase-waning-quarter',
  'phase-waning-crescent',
];

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

const API_PHASES = [
  [['new moon', 'new'], 'phase-new'],
  [['waxing crescent', 'waxing cresent'], 'phase-crescent'],
  [['first quarter'], 'phase-quarter'],
  [['waxing gibbous'], 'phase-gibbous'],
  [['full moon', 'full'], 'phase-full'],
  [['waning gibbous'], 'phase-waning-gibbous'],
  [['last quarter', 'third quarter'], 'phase-waning-quarter'],
  [['waning crescent', 'waning cresent'], 'phase-waning-crescent'],
];

function calculateLocalAge() {
  const cycle = 29.530588853;
  const reference = Date.UTC(2000, 0, 6, 18, 14, 0);
  const days = (Date.now() - reference) / 86400000;
  return ((days % cycle) + cycle) % cycle;
}

function phaseFromAge(age) {
  const index = Math.floor((age / 29.530588853) * 8 + 0.5) % 8;
  return phaseClasses[index];
}

function phaseDetailsFromAge(age) {
  const cycle = 29.530588853;
  const phaseLength = cycle / 8;
  const normalized = ((age % cycle) + cycle) % cycle;
  const index = Math.floor(normalized / phaseLength) % 8;
  const nextIndex = (index + 1) % 8;
  const previousIndex = (index + 7) % 8;
  let nextBoundary = (index + 1) * phaseLength;
  if (nextBoundary <= normalized) nextBoundary += cycle;
  let previousBoundary = index * phaseLength;
  if (previousBoundary > normalized) previousBoundary -= cycle;

  return {
    nextPhase: phaseClasses[nextIndex],
    previousPhase: phaseClasses[previousIndex],
    daysToNextPhase: Math.max(0, nextBoundary - normalized),
    daysSincePreviousPhase: Math.max(0, normalized - previousBoundary),
  };
}

function fallbackDetails() {
  const age = calculateLocalAge();
  const cycle = 29.530588853;
  const illumination = (1 - Math.cos((2 * Math.PI * age) / cycle)) / 2 * 100;
  const phase = phaseFromAge(age);
  return {
    phase,
    label: phaseLabels[phase],
    age,
    illumination,
    nextPhase: phaseDetailsFromAge(age).nextPhase,
    previousPhase: phaseDetailsFromAge(age).previousPhase,
    daysToNextPhase: phaseDetailsFromAge(age).daysToNextPhase,
    daysSincePreviousPhase: phaseDetailsFromAge(age).daysSincePreviousPhase,
    source: 'fallback',
    sourceStatus: 'fallback',
  };
}

const MOON_CACHE_KEY = 'plannetary-moon-phase-v1';
const MOON_CACHE_TTL = 4 * 60 * 1000;

function readCachedMoon() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(MOON_CACHE_KEY) || 'null');
    if (!cached?.value || Date.now() - cached.savedAt > MOON_CACHE_TTL) return null;
    return cached.value;
  } catch {
    return null;
  }
}

function writeCachedMoon(value) {
  try {
    sessionStorage.setItem(MOON_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), value }));
  } catch {
    // Storage can be unavailable in private browsing or restrictive environments.
  }
}

export function useMoonPhase() {
  const [moon, setMoon] = useState(() => readCachedMoon() || { ...fallbackDetails(), sourceStatus: 'local' });

  useEffect(() => {
    let active = true;
    const liveEndpoint = String(import.meta.env.VITE_MOON_PHASE_ENDPOINT || '').trim();

    const refreshLocal = () => {
      if (!active) return;
      const next = { ...fallbackDetails(), sourceStatus: 'local', fetchedAt: Date.now() };
      setMoon(next);
      writeCachedMoon(next);
    };

    // The local astronomical calculation is the default so development does not depend on
    // an external proxy/DNS service. A live endpoint can still be enabled explicitly.
    async function refresh() {
      if (!liveEndpoint) {
        refreshLocal();
        return;
      }

      try {
        const url = new URL(liveEndpoint, window.location.origin);
        url.searchParams.set('d', String(Math.floor(Date.now() / 1000)));
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error('Falha na API lunar');
        const data = await response.json();
        const item = Array.isArray(data) ? data[0] : (data?.data?.[0] || data);
        if (!item || Number(item?.Error) > 0) throw new Error(item?.ErrorMsg || 'Resposta lunar inválida');
        const value = String(item?.Phase || '').toLowerCase();
        const phase = API_PHASES.find(([names]) => names.some((name) => value.includes(name)))?.[1];
        if (!phase) throw new Error('Fase lunar não reconhecida');

        const age = Number(item?.Age);
        const illumination = Number(item?.Illumination);
        const safeAge = Number.isFinite(age) ? age : calculateLocalAge();
        const localCycle = phaseDetailsFromAge(safeAge);
        const nextMoon = {
          phase,
          label: phaseLabels[phase],
          age: safeAge,
          illumination: Number.isFinite(illumination) ? illumination * 100 : fallbackDetails().illumination,
          nextPhase: localCycle.nextPhase,
          previousPhase: localCycle.previousPhase,
          daysToNextPhase: localCycle.daysToNextPhase,
          daysSincePreviousPhase: localCycle.daysSincePreviousPhase,
          source: 'configured-live-endpoint',
          sourceStatus: 'live',
          fetchedAt: Date.now(),
        };
        writeCachedMoon(nextMoon);
        if (active) setMoon(nextMoon);
      } catch {
        refreshLocal();
      }
    }

    refresh();
    const interval = window.setInterval(refresh, 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return moon;
}

export { phaseLabels };
