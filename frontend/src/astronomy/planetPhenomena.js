/**
 * Fenômenos planetários educacionais.
 * As definições seguem a terminologia da NASA para conjunção, oposição e
 * trânsitos, além de conceitos orbitais de periélio e afélio.
 */

const NASA_SOLAR_SYSTEM = 'https://science.nasa.gov/learn/basics-of-space-flight/chapter1-2/';
const NASA_ALIGNMENTS = 'https://science.nasa.gov/solar-system/skywatching/planetary-alignments-and-planet-parades/';

const ORBITAL = {
  perihelion: {
    type: 'Órbita',
    title: 'Periélio',
    symbol: '↘',
    cycle: 'Ponto de maior proximidade ao Sol na órbita',
    description: 'O planeta atinge sua menor distância heliocêntrica durante sua órbita. A distância exata varia de acordo com a excentricidade orbital.',
    source: NASA_SOLAR_SYSTEM,
  },
  aphelion: {
    type: 'Órbita',
    title: 'Afélio',
    symbol: '↗',
    cycle: 'Ponto de maior distância do Sol na órbita',
    description: 'O planeta chega ao ponto mais distante do Sol em sua órbita. Periélio e afélio formam os extremos da distância orbital.',
    source: NASA_SOLAR_SYSTEM,
  },
};

const CONJUNCTION = {
  type: 'Alinhamento aparente',
  title: 'Conjunção',
  symbol: '✦',
  cycle: 'Recorrente, conforme as posições orbitais',
  description: 'Do ponto de vista da Terra, o planeta parece passar próximo de outro corpo no céu. A proximidade é angular e não significa que os corpos estejam fisicamente próximos.',
  source: NASA_ALIGNMENTS,
};

const OPPOSITION = {
  type: 'Alinhamento',
  title: 'Oposição',
  symbol: '◉',
  cycle: 'Recorrente para planetas exteriores',
  description: 'Para planetas exteriores, ocorre quando Sol, Terra e planeta ficam aproximadamente alinhados, com a Terra entre o Sol e o planeta. É uma configuração particularmente favorável para observação.',
  source: NASA_SOLAR_SYSTEM,
};

const TRANSIT = {
  type: 'Trânsito',
  title: 'Trânsito solar',
  symbol: '◌',
  cycle: 'Raro e depende do alinhamento com a Terra e do plano orbital',
  description: 'Mercúrio e Vênus podem passar diante do disco solar vistos da Terra. Um trânsito exige um alinhamento muito preciso; conjunções inferiores comuns não produzem um trânsito.',
  source: NASA_SOLAR_SYSTEM,
};

const EARTH_SEASONAL = {
  type: 'Ciclo sazonal',
  title: 'Equinócios e solstícios',
  symbol: '☼',
  cycle: 'Ocorrem aproximadamente quatro vezes por ano',
  description: 'Mudanças sazonais ligadas à inclinação do eixo terrestre e à posição da Terra em sua órbita. Os equinócios marcam períodos em que dia e noite têm duração aproximadamente semelhante.',
  source: NASA_SOLAR_SYSTEM,
};

const SATURN_RING_EQUINOX = {
  type: 'Sistema de anéis',
  title: 'Equinócio dos anéis',
  symbol: '◎',
  cycle: 'Acompanha a longa órbita de Saturno',
  description: 'Perto do equinócio planetário, os anéis de Saturno ficam quase de perfil para o Sol e podem parecer extremamente finos quando vistos da Terra.',
  source: 'https://science.nasa.gov/saturn/saturns-rings/',
};

const JUPITER_SATURN = {
  type: 'Grande conjunção',
  title: 'Conjunção Júpiter–Saturno',
  symbol: '✧',
  cycle: 'Em média, cerca de 20 anos',
  description: 'Júpiter e Saturno podem parecer muito próximos no céu quando suas posições aparentes se encontram. A configuração é uma conjunção observada da Terra.',
  source: NASA_ALIGNMENTS,
};

export const planetPhenomena = {
  mercurio: [ORBITAL.perihelion, ORBITAL.aphelion, { ...CONJUNCTION, title: 'Conjunções com o Sol' }, TRANSIT],
  venus: [ORBITAL.perihelion, ORBITAL.aphelion, { ...CONJUNCTION, title: 'Conjunções inferior e superior' }, TRANSIT],
  terra: [ORBITAL.perihelion, ORBITAL.aphelion, EARTH_SEASONAL, { ...CONJUNCTION, title: 'Conjunções com outros planetas' }],
  marte: [ORBITAL.perihelion, ORBITAL.aphelion, OPPOSITION, CONJUNCTION],
  jupiter: [ORBITAL.perihelion, ORBITAL.aphelion, OPPOSITION, JUPITER_SATURN, CONJUNCTION],
  saturno: [ORBITAL.perihelion, ORBITAL.aphelion, OPPOSITION, JUPITER_SATURN, SATURN_RING_EQUINOX],
  urano: [ORBITAL.perihelion, ORBITAL.aphelion, OPPOSITION, CONJUNCTION],
  netuno: [ORBITAL.perihelion, ORBITAL.aphelion, OPPOSITION, CONJUNCTION],
};

export const planetPhenomenaSource = NASA_ALIGNMENTS;
