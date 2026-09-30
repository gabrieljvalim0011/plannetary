const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

const normalizeDegrees = (value) => ((value % 360) + 360) % 360;
const normalizeHours = (value) => ((value % 24) + 24) % 24;

function jdFromDate(date) {
  return 2440587.5 + date.getTime() / 86400000;
}

function formatClock(hours) {
  const totalSeconds = Math.round(normalizeHours(hours) * 3600) % 86400;
  const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

function seasonFromLs(ls) {
  if (ls < 90) return { name: 'Primavera no hemisfério norte', short: 'Primavera', progress: ls / 90 };
  if (ls < 180) return { name: 'Verão no hemisfério norte', short: 'Verão', progress: (ls - 90) / 90 };
  if (ls < 270) return { name: 'Outono no hemisfério norte', short: 'Outono', progress: (ls - 180) / 90 };
  return { name: 'Inverno no hemisfério norte', short: 'Inverno', progress: (ls - 270) / 90 };
}

/**
 * Mars solar-time implementation following NASA GISS Mars24 technical notes.
 * Current dates use TT-UTC = 69.184 s, matching the post-2017 offset documented by NASA GISS.
 */
export function calculateMarsTime(date = new Date()) {
  const jdUt = jdFromDate(date);
  const ttMinusUtcSeconds = 69.184;
  const jdTt = jdUt + ttMinusUtcSeconds / 86400;
  const deltaT = jdTt - 2451545.0;

  const M = normalizeDegrees(19.3871 + 0.52402073 * deltaT);
  const alphaFms = normalizeDegrees(270.3871 + 0.524038496 * deltaT);

  const perturbers = [
    [0.0071, 2.2353, 49.409],
    [0.0057, 2.7543, 168.173],
    [0.0039, 1.1177, 191.837],
    [0.0037, 15.7866, 21.736],
    [0.0021, 2.1354, 15.704],
    [0.0020, 2.4694, 95.528],
    [0.0018, 32.8493, 49.095],
  ];

  const pbs = perturbers.reduce((sum, [a, tau, phi]) => (
    sum + a * Math.cos((0.985626 * deltaT / tau + phi) * DEG)
  ), 0);

  const equationOfCenter = (
    (10.691 + 3.0e-7 * deltaT) * Math.sin(M * DEG) +
    0.623 * Math.sin(2 * M * DEG) +
    0.050 * Math.sin(3 * M * DEG) +
    0.005 * Math.sin(4 * M * DEG) +
    0.0005 * Math.sin(5 * M * DEG) +
    pbs
  );

  const ls = normalizeDegrees(alphaFms + equationOfCenter);
  const eotDeg = (
    2.861 * Math.sin(2 * ls * DEG) -
    0.071 * Math.sin(4 * ls * DEG) +
    0.002 * Math.sin(6 * ls * DEG) -
    equationOfCenter
  );
  const mst = normalizeHours(24 * (((jdTt - 2451549.5) / 1.0274912517) + 44796.0 - 0.0009626));
  const ltst = normalizeHours(mst + eotDeg / 15);

  return {
    utc: date.toISOString(),
    jdUt,
    jdTt,
    deltaJ2000: deltaT,
    ls,
    lsLabel: `${ls.toFixed(1)}°`,
    season: seasonFromLs(ls),
    msd: 44796.0 + ((jdTt - 2451549.5) / 1.0274912517) - 0.0009626,
    mst,
    mstLabel: formatClock(mst),
    ltst,
    ltstLabel: formatClock(ltst),
    equationOfTimeMinutes: eotDeg * 4,
  };
}

export function formatJ2000Days(value) {
  return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatMsd(value) {
  return Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}
