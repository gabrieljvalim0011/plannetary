const MOON_EVENTS_2026 = [
  { type: 'apogee', label: 'Apogeu', at: '2026-09-19T03:00:00Z', distanceKm: 404200 },
  { type: 'perigee', label: 'Perigeu', at: '2026-10-01T20:41:00Z', distanceKm: 369320 },
  { type: 'apogee', label: 'Apogeu', at: '2026-10-16T22:54:00Z', distanceKm: 404630 },
  { type: 'perigee', label: 'Perigeu', at: '2026-10-28T18:02:00Z', distanceKm: 364400 },
  { type: 'apogee', label: 'Apogeu', at: '2026-11-13T17:51:00Z', distanceKm: 405610 },
  { type: 'perigee', label: 'Perigeu', at: '2026-11-25T20:59:00Z', distanceKm: 359340 },
  { type: 'apogee', label: 'Apogeu', at: '2026-12-11T06:44:00Z', distanceKm: 406410 },
  { type: 'perigee', label: 'Perigeu', at: '2026-12-24T08:30:00Z', distanceKm: 356640 },
];

const EARTH_ORBIT_EVENTS = [
  { type: 'perihelion', label: 'Periélio', at: '2027-01-03T02:33:00Z' },
  { type: 'aphelion', label: 'Afélio', at: '2027-07-05T05:06:00Z' },
];

export const lunarEventSource = 'NASA GSFC SKYCAL 2026';
export const earthOrbitSource = 'U.S. Naval Observatory — Seasons 2027';

function nearestEvent(events, type, now = new Date()) {
  const current = now.getTime();
  const sameType = events.filter((event) => event.type === type);
  if (!sameType.length) return null;
  const upcoming = sameType.filter((event) => new Date(event.at).getTime() >= current);
  return upcoming[0] || null;
}

function formatCountdown(target, now = new Date()) {
  if (!target) return '—';
  const delta = new Date(target).getTime() - now.getTime();
  if (delta <= 0) return 'acontecendo agora';
  const totalMinutes = Math.floor(delta / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h ${totalMinutes % 60}min`;
}

export function getMoonOrbitalEvents(now = new Date()) {
  const perigee = nearestEvent(MOON_EVENTS_2026, 'perigee', now);
  const apogee = nearestEvent(MOON_EVENTS_2026, 'apogee', now);
  const lastPerigee = [...MOON_EVENTS_2026].reverse().find((event) => event.type === 'perigee' && new Date(event.at).getTime() < now.getTime()) || null;
  const lastApogee = [...MOON_EVENTS_2026].reverse().find((event) => event.type === 'apogee' && new Date(event.at).getTime() < now.getTime()) || null;
  return {
    perigee,
    apogee,
    lastPerigee,
    lastApogee,
    perigeeCountdown: formatCountdown(perigee?.at, now),
    apogeeCountdown: formatCountdown(apogee?.at, now),
    source: lunarEventSource,
  };
}

export function getEarthOrbitEvents(now = new Date()) {
  const perihelion = nearestEvent(EARTH_ORBIT_EVENTS, 'perihelion', now);
  const aphelion = nearestEvent(EARTH_ORBIT_EVENTS, 'aphelion', now);
  const next = [perihelion, aphelion]
    .filter(Boolean)
    .sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime())[0] || null;
  return {
    perihelion,
    aphelion,
    perihelionCountdown: formatCountdown(perihelion?.at, now),
    aphelionCountdown: formatCountdown(aphelion?.at, now),
    next,
    countdown: next ? formatCountdown(next.at, now) : '—',
    source: earthOrbitSource,
  };
}

export function formatEventDate(iso, locale = 'pt-BR') {
  return new Date(iso).toLocaleString(locale, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }).replace('.', '');
}
