/**
 * Satélites naturais em destaque.
 * Contagens recentes seguem as páginas oficiais da NASA e podem mudar quando
 * novas luas são confirmadas. A visualização 3D mostra apenas exemplos,
 * não todos os satélites conhecidos.
 */
export const naturalSatellitesByPlanet = {
  mercurio: {
    count: 0,
    countLabel: 'Nenhuma lua conhecida',
    source: 'https://science.nasa.gov/solar-system/solar-system-facts/',
    sourceLabel: 'NASA — fatos do Sistema Solar',
    satellites: [],
  },
  venus: {
    count: 0,
    countLabel: 'Nenhuma lua conhecida',
    source: 'https://science.nasa.gov/solar-system/solar-system-facts/',
    sourceLabel: 'NASA — fatos do Sistema Solar',
    satellites: [],
  },
  terra: {
    count: 1,
    countLabel: '1 satélite natural',
    source: 'https://science.nasa.gov/moon/',
    sourceLabel: 'NASA — Lua',
    satellites: [
      { id: 'lua', name: 'Lua', color: '#b7b9bd', radius: 0.19, orbit: 1.9, speed: 0.42, roughness: 0.94, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/moon/preview.webp?w=512' },
    ],
  },
  marte: {
    count: 2,
    countLabel: '2 satélites naturais',
    source: 'https://science.nasa.gov/mars/moons/',
    sourceLabel: 'NASA — Luas de Marte',
    satellites: [
      { id: 'phobos', name: 'Fobos', color: '#8f8375', radius: 0.105, orbit: 1.62, speed: 1.18, roughness: 0.98, irregular: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/mars-phobos/preview.webp?w=512' },
      { id: 'deimos', name: 'Deimos', color: '#a59a8e', radius: 0.075, orbit: 2.15, speed: 0.68, roughness: 0.98, irregular: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/mars-deimos/preview.webp?w=512' },
    ],
  },
  jupiter: {
    count: 115,
    countLabel: '115 reconhecidas pela IAU',
    source: 'https://science.nasa.gov/jupiter/jupiter-moons/',
    sourceLabel: 'NASA — Luas de Júpiter',
    satellites: [
      { id: 'io', name: 'Io', color: '#d5ad62', radius: 0.125, orbit: 1.78, speed: 1.12, roughness: 0.84, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/jupiter-io-a/preview.webp?w=512' },
      { id: 'europa', name: 'Europa', color: '#bfb19b', radius: 0.118, orbit: 2.2, speed: 0.88, roughness: 0.88, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/jupiter-europa/preview.webp?w=512' },
      { id: 'ganymede', name: 'Ganimedes', color: '#8f8a83', radius: 0.17, orbit: 2.72, speed: 0.62, roughness: 0.9, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/jupiter-ganymede/preview.webp?w=512' },
      { id: 'callisto', name: 'Calisto', color: '#5c5750', radius: 0.15, orbit: 3.32, speed: 0.43, roughness: 0.97, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/jupiter-callisto/preview.webp?w=512' },
    ],
  },
  saturno: {
    count: 293,
    countLabel: '293 confirmadas em agosto de 2026',
    source: 'https://science.nasa.gov/saturn/moons/',
    sourceLabel: 'NASA — Luas de Saturno',
    satellites: [
      { id: 'titan', name: 'Titã', color: '#c59a59', radius: 0.165, orbit: 2.08, speed: 0.76, roughness: 0.86, atmosphere: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn-titan/preview.webp?w=512' },
      { id: 'encelado', name: 'Encélado', color: '#d7d9d8', radius: 0.095, orbit: 2.62, speed: 0.6, roughness: 0.8, icy: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn-enceladus/preview.webp?w=512' },
      { id: 'reia', name: 'Reia', color: '#b8b5ac', radius: 0.12, orbit: 3.05, speed: 0.48, roughness: 0.92, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn-rhea/preview.webp?w=512' },
      { id: 'dione', name: 'Dione', color: '#bcb9b0', radius: 0.102, orbit: 3.48, speed: 0.37, roughness: 0.94, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn-dione/preview.webp?w=512' },
      { id: 'iapeto', name: 'Jápeto', color: '#8b8277', radius: 0.112, orbit: 3.9, speed: 0.27, roughness: 0.98, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn-iapetus/preview.webp?w=512' },
    ],
  },
  urano: {
    count: 29,
    countLabel: '29 conhecidas em agosto de 2026',
    source: 'https://science.nasa.gov/uranus/moons/',
    sourceLabel: 'NASA — Luas de Urano',
    satellites: [
      { id: 'miranda', name: 'Miranda', color: '#aaa59d', radius: 0.085, orbit: 1.72, speed: 1.08, roughness: 0.94, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus-miranda/preview.webp?w=512' },
      { id: 'ariel', name: 'Ariel', color: '#9f9990', radius: 0.105, orbit: 2.22, speed: 0.75, roughness: 0.93, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus-ariel/preview.webp?w=512' },
      { id: 'umbriel', name: 'Umbriel', color: '#77746e', radius: 0.108, orbit: 2.72, speed: 0.57, roughness: 0.98, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus-umbriel/preview.webp?w=512' },
      { id: 'titania', name: 'Titânia', color: '#ada8a0', radius: 0.13, orbit: 3.2, speed: 0.43, roughness: 0.93, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus-titania/preview.webp?w=512' },
      { id: 'oberon', name: 'Oberon', color: '#8b8883', radius: 0.125, orbit: 3.72, speed: 0.32, roughness: 0.96, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus-oberon/preview.webp?w=512' },
    ],
  },
  netuno: {
    count: 16,
    countLabel: '16 conhecidas',
    source: 'https://science.nasa.gov/neptune/moons/',
    sourceLabel: 'NASA — Luas de Netuno',
    satellites: [
      { id: 'triton', name: 'Tritão', color: '#a8aaa3', radius: 0.16, orbit: 2.28, speed: -0.52, roughness: 0.88, icy: true, rocky: true, retrograde: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/neptune-triton/preview.webp?w=512' },
      { id: 'nereida', name: 'Nereida', color: '#8e877d', radius: 0.075, orbit: 3.02, speed: 0.31, roughness: 0.98, irregular: true, rocky: true },
      { id: 'proteus', name: 'Proteu', color: '#77736d', radius: 0.085, orbit: 2.7, speed: 0.7, roughness: 0.99, irregular: true, rocky: true },
    ],
  },
};
