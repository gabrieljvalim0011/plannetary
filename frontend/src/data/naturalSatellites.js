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
      { id: 'lua', name: 'Lua', color: '#b7b9bd', radius: 0.19, orbit: 1.9, speed: 0.42, roughness: 0.94, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/moon/preview.webp?w=512'  type: 'A Lua é o único satélite natural da Terra e apresenta crateras, mares basálticos e regiões de alta altitude.', diameterKm: 27.32, orbitalPeriodDays: Rochosa, detail: 'Superfície fortemente marcada por crateras de impacto.', highlight: 'undefined'},
    ],
  },
  marte: {
    count: 2,
    countLabel: '2 satélites naturais',
    source: 'https://science.nasa.gov/mars/moons/',
    sourceLabel: 'NASA — Luas de Marte',
    satellites: [
      { id: 'phobos', name: 'Fobos', color: '#8f8375', radius: 0.105, orbit: 1.62, speed: 1.18, roughness: 0.98, irregular: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/mars-phobos/preview.webp?w=512'  type: 'Fobos é a maior das duas luas de Marte e tem uma aparência alongada, com uma grande cratera de impacto chamada Stickney.', diameterKm: 0.32, orbitalPeriodDays: Irregular rochoso, detail: 'Está em uma órbita muito próxima da superfície marciana.', highlight: 'undefined'},
      { id: 'deimos', name: 'Deimos', color: '#a59a8e', radius: 0.075, orbit: 2.15, speed: 0.68, roughness: 0.98, irregular: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/mars-deimos/preview.webp?w=512'  type: 'Deimos é menor e mais distante de Marte do que Fobos, com uma superfície escura e fortemente craterada.', diameterKm: 1.26, orbitalPeriodDays: Irregular rochoso, detail: 'Sua superfície é dominada por material escuro e regolito.', highlight: 'undefined'},
    ],
  },
  jupiter: {
    count: 115,
    countLabel: '115 reconhecidas pela IAU',
    source: 'https://science.nasa.gov/jupiter/jupiter-moons/',
    sourceLabel: 'NASA — Luas de Júpiter',
    satellites: [
      { id: 'io', name: 'Io', color: '#d5ad62', radius: 0.125, orbit: 1.78, speed: 1.12, roughness: 0.84, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/jupiter-io-a/preview.webp?w=512'  type: 'Io é o corpo do Sistema Solar com a atividade vulcânica mais intensa conhecida, impulsionada pelas forças de maré de Júpiter.', diameterKm: 1.77, orbitalPeriodDays: Rochosa vulcânica, detail: 'Centenas de vulcões e enormes depósitos de enxofre.', highlight: 'undefined'},
      { id: 'europa', name: 'Europa', color: '#bfb19b', radius: 0.118, orbit: 2.2, speed: 0.88, roughness: 0.88, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/jupiter-europa/preview.webp?w=512'  type: 'Europa possui uma crosta de gelo e evidências de um oceano de água líquida sob a superfície, tornando-a um alvo importante para a ciência planetária.', diameterKm: 3.55, orbitalPeriodDays: Gelada, detail: 'A superfície apresenta linhas e fraturas associadas à dinâmica do gelo.', highlight: 'undefined'},
      { id: 'ganymede', name: 'Ganimedes', color: '#8f8a83', radius: 0.17, orbit: 2.72, speed: 0.62, roughness: 0.9, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/jupiter-ganymede/preview.webp?w=512'  type: 'Ganimedes é a maior lua do Sistema Solar e a única lua conhecida a possuir um campo magnético próprio.', diameterKm: 7.15, orbitalPeriodDays: Gelada e rochosa, detail: 'Seu interior combina gelo, rocha e um núcleo metálico.', highlight: 'undefined'},
      { id: 'callisto', name: 'Calisto', color: '#5c5750', radius: 0.15, orbit: 3.32, speed: 0.43, roughness: 0.97, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/jupiter-callisto/preview.webp?w=512'  type: 'Calisto é uma lua antiga e densamente craterada, com uma das superfícies mais preservadas do Sistema Solar.', diameterKm: 16.69, orbitalPeriodDays: Gelada e rochosa, detail: 'A bacia de impacto Valhalla é uma de suas estruturas mais marcantes.', highlight: 'undefined'},
    ],
  },
  saturno: {
    count: 293,
    countLabel: '293 confirmadas em agosto de 2026',
    source: 'https://science.nasa.gov/saturn/moons/',
    sourceLabel: 'NASA — Luas de Saturno',
    satellites: [
      { id: 'titan', name: 'Titã', color: '#c59a59', radius: 0.165, orbit: 2.08, speed: 0.76, roughness: 0.86, atmosphere: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn-titan/preview.webp?w=512'  type: 'Titã é a maior lua de Saturno e possui uma atmosfera espessa rica em nitrogênio, além de lagos e mares de hidrocarbonetos na superfície.', diameterKm: 15.95, orbitalPeriodDays: Gelada com atmosfera, detail: 'É a única lua conhecida com uma atmosfera densa e complexa.', highlight: 'undefined'},
      { id: 'encelado', name: 'Encélado', color: '#d7d9d8', radius: 0.095, orbit: 2.62, speed: 0.6, roughness: 0.8, icy: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn-enceladus/preview.webp?w=512'  type: 'Encélado possui uma superfície muito brilhante e jatos de material que escapam por fraturas próximas ao polo sul.', diameterKm: 1.37, orbitalPeriodDays: Lua gelada, detail: 'Os jatos revelam material relacionado ao oceano subterrâneo.', highlight: 'undefined'},
      { id: 'reia', name: 'Reia', color: '#b8b5ac', radius: 0.12, orbit: 3.05, speed: 0.48, roughness: 0.92, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn-rhea/preview.webp?w=512'  type: 'Reia é uma lua grande e fortemente craterada de Saturno, composta principalmente de gelo de água e material rochoso.', diameterKm: 4.52, orbitalPeriodDays: Gelada e rochosa, detail: 'Sua superfície apresenta regiões claras e crateras extensas.', highlight: 'undefined'},
      { id: 'dione', name: 'Dione', color: '#bcb9b0', radius: 0.102, orbit: 3.48, speed: 0.37, roughness: 0.94, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn-dione/preview.webp?w=512'  type: 'Dione possui uma superfície de gelo com crateras e longas falhas brilhantes chamadas de lineae.', diameterKm: 2.74, orbitalPeriodDays: Gelada e rochosa, detail: 'Uma face apresenta redes de fraturas claras e extensas.', highlight: 'undefined'},
      { id: 'iapeto', name: 'Jápeto', color: '#8b8277', radius: 0.112, orbit: 3.9, speed: 0.27, roughness: 0.98, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn-iapetus/preview.webp?w=512'  type: 'Jápeto é conhecido pelo forte contraste entre seu hemisfério escuro e seu hemisfério claro.', diameterKm: 79.32, orbitalPeriodDays: Gelada e rochosa, detail: 'Seu aspecto de dois tons é uma das características mais marcantes das luas de Saturno.', highlight: 'undefined'},
    ],
  },
  urano: {
    count: 29,
    countLabel: '29 conhecidas em agosto de 2026',
    source: 'https://science.nasa.gov/uranus/moons/',
    sourceLabel: 'NASA — Luas de Urano',
    satellites: [
      { id: 'miranda', name: 'Miranda', color: '#aaa59d', radius: 0.085, orbit: 1.72, speed: 1.08, roughness: 0.94, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus-miranda/preview.webp?w=512'  type: 'Miranda é pequena, mas possui uma das paisagens mais complexas do Sistema Solar, com cânions, falhas e terrenos jovens.', diameterKm: 1.41, orbitalPeriodDays: Gelada e irregular, detail: 'Grandes estruturas geológicas sugerem uma história interna muito ativa.', highlight: 'undefined'},
      { id: 'ariel', name: 'Ariel', color: '#9f9990', radius: 0.105, orbit: 2.22, speed: 0.75, roughness: 0.93, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus-ariel/preview.webp?w=512'  type: 'Ariel é uma das maiores luas de Urano e apresenta uma superfície relativamente clara e marcada por vales e falhas.', diameterKm: 2.52, orbitalPeriodDays: Gelada e rochosa, detail: 'Seu terreno combina crateras com estruturas tectônicas.', highlight: 'undefined'},
      { id: 'umbriel', name: 'Umbriel', color: '#77746e', radius: 0.108, orbit: 2.72, speed: 0.57, roughness: 0.98, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus-umbriel/preview.webp?w=512'  type: 'Umbriel é uma lua escura de Urano, com uma superfície antiga e densamente craterada.', diameterKm: 4.14, orbitalPeriodDays: Gelada e escura, detail: 'A cratera Wunda é uma das formações mais reconhecíveis de sua superfície.', highlight: 'undefined'},
      { id: 'titania', name: 'Titânia', color: '#ada8a0', radius: 0.13, orbit: 3.2, speed: 0.43, roughness: 0.93, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus-titania/preview.webp?w=512'  type: 'Titânia é a maior lua de Urano e mostra uma superfície de gelo marcada por grandes fraturas e cânions.', diameterKm: 8.71, orbitalPeriodDays: Gelada e rochosa, detail: 'A rede de falhas indica uma história geológica complexa.', highlight: 'undefined'},
      { id: 'oberon', name: 'Oberon', color: '#8b8883', radius: 0.125, orbit: 3.72, speed: 0.32, roughness: 0.96, icy: true, rocky: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus-oberon/preview.webp?w=512'  type: 'Oberon é uma grande lua de Urano, escura e intensamente craterada, com sinais de atividade tectônica antiga.', diameterKm: 13.46, orbitalPeriodDays: Gelada e rochosa, detail: 'É uma das superfícies mais antigas conhecidas entre as luas de Urano.', highlight: 'undefined'},
    ],
  },
  netuno: {
    count: 16,
    countLabel: '16 conhecidas',
    source: 'https://science.nasa.gov/neptune/moons/',
    sourceLabel: 'NASA — Luas de Netuno',
    satellites: [
      { id: 'triton', name: 'Tritão', color: '#a8aaa3', radius: 0.16, orbit: 2.28, speed: -0.52, roughness: 0.88, icy: true, rocky: true, retrograde: true, textureUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/neptune-triton/preview.webp?w=512'  type: 'Tritão é a maior lua de Netuno e orbita o planeta em sentido retrógrado, sugerindo uma origem distinta da maioria das grandes luas regulares.', diameterKm: 5.88, orbitalPeriodDays: Gelada, detail: 'Sua superfície gelada inclui depósitos de nitrogênio e evidências de atividade geológica.', highlight: 'undefined'},
      { id: 'nereida', name: 'Nereida', color: '#8e877d', radius: 0.075, orbit: 3.02, speed: 0.31, roughness: 0.98, irregular: true, rocky: true  type: 'Nereida possui uma órbita altamente excêntrica, muito mais alongada do que a das grandes luas regulares.', diameterKm: 360.13, orbitalPeriodDays: Irregular, detail: 'Sua órbita é uma das mais excêntricas entre as luas planetárias conhecidas.', highlight: 'undefined'},
      { id: 'proteus', name: 'Proteu', color: '#77736d', radius: 0.085, orbit: 2.7, speed: 0.7, roughness: 0.99, irregular: true, rocky: true  type: 'Proteu é uma lua escura e irregular de Netuno, fortemente craterada e relativamente grande entre as luas internas do planeta.', diameterKm: 1.12, orbitalPeriodDays: Irregular, detail: 'Sua forma irregular é próxima do equilíbrio gravitacional, mas ainda não perfeitamente esférica.', highlight: 'undefined'},
    ],
  },
};
