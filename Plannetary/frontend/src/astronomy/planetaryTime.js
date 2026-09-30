const DAY_MS = 86400000;
const TT_MINUS_UTC_SECONDS = 69.184; // current TT-UTC after 2017-01-01
const J2000_JD_TT = 2451545.0;
const EARTH_GRAVITY = 9.80;

function normalizeHours(hours) {
  return ((hours % 24) + 24) % 24;
}

function julianDateUtc(date) {
  return 2440587.5 + date.getTime() / DAY_MS;
}

export function deltaJ2000Days(date) {
  // Convert UTC to a current TT estimate before measuring from J2000.0.
  const jdTt = julianDateUtc(date) + TT_MINUS_UTC_SECONDS / 86400;
  return jdTt - J2000_JD_TT;
}

export function formatClock(hours) {
  const totalSeconds = Math.round(normalizeHours(hours) * 3600) % 86400;
  const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

function formatPlanetDay(dayIndex) {
  return Math.max(1, Math.floor(dayIndex) + 1).toLocaleString('pt-BR');
}

function solarDayFraction(deltaDays, solarDayHours) {
  const solarDayDays = solarDayHours / 24;
  const absolutePlanetDays = deltaDays / solarDayDays;
  const wholeDays = Math.floor(absolutePlanetDays);
  const fraction = absolutePlanetDays - wholeDays;
  // Convention: J2000.0 is anchored at 12:00 on the reference meridian.
  const localHours = normalizeHours(12 + fraction * 24);
  return { absolutePlanetDays, wholeDays, localHours };
}

export function calculatePlanetaryTime(planet, date = new Date()) {
  const deltaDays = deltaJ2000Days(date);
  const { absolutePlanetDays, wholeDays, localHours } = solarDayFraction(deltaDays, planet.solarDayHours);
  const orbitalYears = deltaDays / planet.orbitalPeriodEarthDays;
  const yearNumber = Math.max(1, Math.floor(orbitalYears) + 1);
  const yearFraction = ((orbitalYears % 1) + 1) % 1;
  const yearDayCount = Math.max(1, Math.round(planet.orbitalPeriodEarthDays / (planet.solarDayHours / 24)));
  const yearDay = Math.min(yearDayCount, Math.floor(yearFraction * yearDayCount) + 1);
  const gravityPercent = (planet.gravity.value / EARTH_GRAVITY) * 100;
  const gravityDifferencePercent = gravityPercent - 100;

  const isEarth = planet.id === 'terra';
  const referenceDate = date.toISOString().slice(0, 10);

  return {
    utcDate: date,
    utcDateLabel: date.toLocaleDateString('pt-BR'),
    utcTimeLabel: date.toLocaleTimeString('pt-BR', { hour12: false }),
    referenceDate,
    localSolarTime: formatClock(isEarth ? date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600 : localHours),
    planetaryDay: wholeDays,
    planetaryDayLabel: formatPlanetDay(wholeDays),
    planetaryYear: yearNumber,
    planetaryYearDay: yearDay,
    yearDayCount,
    deltaJ2000Days: deltaDays,
    gravityPercent,
    gravityDifferencePercent,
    gravityDifferenceLabel: `${gravityDifferencePercent >= 0 ? '+' : ''}${gravityDifferencePercent.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`,
    weightMultiplier: planet.gravity.value / EARTH_GRAVITY,
    calendarNote: isEarth
      ? 'Na Terra, usamos a data civil e a hora UTC como referência de comparação.'
      : 'Fora da Terra não existe um calendário civil planetário universal. O Plannetary usa uma contagem de dia/ano desde J2000.0 e um relógio solar de referência para comparação.',
  };
}

export const astronomicalConstants = {
  earthGravity: EARTH_GRAVITY,
  ttMinusUtcSeconds: TT_MINUS_UTC_SECONDS,
};
