/**
 * Dados científicos: NASA Planetary Fact Sheet + páginas oficiais de cada planeta.
 * Imagens grandes: ativos publicados pela NASA Science.
 * Imagens pequenas do seletor: recortes transparentes de fontes públicas para
 * evitar fundos pretos e reduzir o peso visual do navegador. Cada planeta mantém
 * uma fonte e crédito próprios nos campos selectorImageSourcePage/selectorImageCredit.
 * Uso pretendido do projeto: educacional/informativo, respeitando as diretrizes
 * de mídia das fontes e mantendo crédito e link para a fonte.
 */

const NASA_PLANETS = 'https://science.nasa.gov/solar-system/planets/';

export const planets = [
  {
    id: 'mercurio', name: 'Mercúrio', englishName: 'Mercury', type: 'Terrestre', positionFromSun: 1,
    subtitle: 'O pequeno planeta mais próximo do Sol',
    summary: 'Pequeno, rochoso e extremamente próximo do Sol, Mercúrio combina uma superfície marcada por crateras com temperaturas que variam drasticamente.',
    description: 'Mercúrio é o menor planeta do Sistema Solar e o mais próximo do Sol. Sua superfície registra uma história geológica marcada por crateras e grandes bacias de impacto.',
    temperature: { meanC: 167, display: '167 °C' }, distanceFromSun: { km: 58000000, au: 0.39, display: '58 milhões de km' },
    gravity: { value: 3.70, unit: 'm/s²' }, diameterKm: 4879, massKg: 0.330103e24, rotationPeriodHours: 58.6462 * 24, solarDayHours: 4222.6, orbitalPeriodEarthDays: 0.2408467 * 365.25,
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2024/03/pia15162-mercury-basins-messenger-16x9-1.jpg',
    selectorImageUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia15/pia15163/PIA15163.jpg?crop=faces%2Cfocalpoint&fit=clip&h=600&w=600',
    selectorImageSourcePage: 'https://science.nasa.gov/photojournal/mercury-globe-0n-270e/',
    selectorImageCredit: 'NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington',
    imageSourcePage: 'https://science.nasa.gov/solar-system/mercury/', imageCredit: 'NASA/MESSENGER', factSource: 'https://science.nasa.gov/mercury/facts/', advanced: { axialTiltDeg: 2, density: 5.43, escapeVelocityKms: 4.25, atmosphere: 'Exosfera extremamente tênue, dominada por oxigênio, sódio, hidrogênio, hélio e potássio.', composition: 'Núcleo metálico muito grande, cercado por manto e crosta rochosos.', magnetism: 'Possui um campo magnético global fraco, associado ao seu núcleo parcialmente líquido.', moons: 'Nenhuma', rings: 'Nenhum' },
    accent: '#b9b4ad', glow: 'rgba(190,190,185,.33)'
  },
  {
    id: 'venus', name: 'Vênus', englishName: 'Venus', type: 'Terrestre', positionFromSun: 2,
    subtitle: 'O planeta de calor extremo e nuvens densas',
    summary: 'Uma atmosfera espessa transforma Vênus em um laboratório natural para estudar efeito estufa, clima planetário e evolução geológica.',
    description: 'Vênus possui uma atmosfera dominada por dióxido de carbono e temperaturas superficiais capazes de derreter chumbo. Sua história ajuda a estudar como planetas rochosos podem seguir caminhos climáticos muito diferentes.',
    temperature: { meanC: 464, display: '464 °C' }, distanceFromSun: { km: 108000000, au: 0.72, display: '108 milhões de km' },
    gravity: { value: 8.87, unit: 'm/s²' }, diameterKm: 12104, massKg: 4.86731e24, rotationPeriodHours: -243.018 * 24, solarDayHours: 2802.0, orbitalPeriodEarthDays: 0.61519726 * 365.25,
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2024/03/venus-mariner-10-pia23791-fig2-16x9-1.jpg',
    selectorImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/3D_Venus.png/250px-3D_Venus.png',
    selectorImageSourcePage: 'https://commons.wikimedia.org/wiki/File:3D_Venus.png',
    selectorImageCredit: 'NASA/JPL — Voyager 2 (domínio público)',
    imageSourcePage: 'https://science.nasa.gov/solar-system/venus/', imageCredit: 'NASA/Mariner 10', factSource: 'https://science.nasa.gov/venus/venus-facts/', advanced: { axialTiltDeg: 3, density: 5.24, escapeVelocityKms: 10.36, atmosphere: 'Atmosfera espessa de dióxido de carbono e nitrogênio, com nuvens de ácido sulfúrico.', composition: 'Planeta rochoso com núcleo metálico, manto e crosta; estrutura interna semelhante à da Terra.', magnetism: 'Não possui campo magnético interno global; apresenta uma magnetosfera induzida pela interação com o vento solar.', moons: 'Nenhuma', rings: 'Nenhum' },
    accent: '#e5cfb1', glow: 'rgba(235,195,138,.28)'
  },
  {
    id: 'terra', name: 'Terra', englishName: 'Earth', type: 'Terrestre', positionFromSun: 3,
    subtitle: 'O nosso planeta, um planeta de água e vida',
    summary: 'A Terra combina água líquida, atmosfera dinâmica e uma biosfera conhecida — o único planeta em que sabemos que a vida existe.',
    description: 'A Terra é o terceiro planeta a partir do Sol e o único planeta conhecido com vida. Oceanos, atmosfera e uma geologia ativa moldam continuamente sua superfície.',
    temperature: { meanC: 15, display: '15 °C' }, distanceFromSun: { km: 150000000, au: 1, display: '150 milhões de km' },
    gravity: { value: 9.80, unit: 'm/s²' }, diameterKm: 12756, massKg: 5.97217e24, rotationPeriodHours: 0.99726968 * 24, solarDayHours: 24.0, orbitalPeriodEarthDays: 365.25,
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2024/03/blue-marble-apollo-17-16x9-1.jpg',
    selectorImageUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Blue_Marble_transparent.png/250px-Blue_Marble_transparent.png',
    selectorImageSourcePage: 'https://commons.wikimedia.org/wiki/File:Blue_Marble_transparent.png',
    selectorImageCredit: 'NASA / Wikimedia Commons (domínio público)',
    imageSourcePage: 'https://science.nasa.gov/earth/', imageCredit: 'NASA/Apollo 17', factSource: 'https://science.nasa.gov/earth/facts/', advanced: { axialTiltDeg: 23.4, density: 5.51, escapeVelocityKms: 11.19, atmosphere: 'Atmosfera composta principalmente por nitrogênio e oxigênio, com vapor d’água e outros gases em menores quantidades.', composition: 'Núcleo rico em ferro, manto de silicatos e crosta sólida, com grandes volumes de água líquida na superfície.', magnetism: 'Campo magnético global gerado no interior do planeta, formando uma magnetosfera que ajuda a proteger a atmosfera do vento solar.', moons: 'Lua', rings: 'Nenhum' },
    accent: '#71a8ff', glow: 'rgba(84,155,255,.32)'
  },
  {
    id: 'marte', name: 'Marte', englishName: 'Mars', type: 'Terrestre', positionFromSun: 4,
    subtitle: 'O planeta vermelho',
    summary: 'Um planeta frio e seco, marcado por vulcões gigantes, cânions profundos e uma longa história de exploração robótica.',
    description: 'Marte é o quarto planeta do Sistema Solar. Evidências geológicas mostram que sua superfície antiga foi moldada por água, enquanto as missões modernas investigam seu clima, geologia e potencial para ter sustentado ambientes habitáveis no passado.',
    temperature: { meanC: -65, display: '-65 °C' }, distanceFromSun: { km: 228000000, au: 1.52, display: '228 milhões de km' },
    gravity: { value: 3.71, unit: 'm/s²' }, diameterKm: 6792, massKg: 0.641691e24, rotationPeriodHours: 1.02595676 * 24, solarDayHours: 24.7, orbitalPeriodEarthDays: 1.8808476 * 365.25,
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2024/03/mars-full-globe-16x9-1.jpg',
    selectorImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Transparent_Mars.png/250px-Transparent_Mars.png',
    selectorImageSourcePage: 'https://commons.wikimedia.org/wiki/File:Transparent_Mars.png',
    selectorImageCredit: 'NASA-derived public-domain asset',
    imageSourcePage: 'https://science.nasa.gov/solar-system/mars/', imageCredit: 'NASA', factSource: 'https://science.nasa.gov/mars/facts/', advanced: { axialTiltDeg: 25.2, density: 3.93, escapeVelocityKms: 5.03, atmosphere: 'Atmosfera fina, composta principalmente por dióxido de carbono, com nitrogênio e argônio.', composition: 'Interior rochoso com núcleo metálico, manto e crosta basáltica; antigas evidências apontam para atividade de água superficial.', magnetism: 'Não possui um campo magnético global atual, mas sua crosta preserva fortes regiões magnetizadas do passado.', moons: 'Fobos e Deimos', rings: 'Nenhum' },
    accent: '#ff8b5c', glow: 'rgba(255,120,65,.34)'
  },
  {
    id: 'jupiter', name: 'Júpiter', englishName: 'Jupiter', type: 'Gigante gasoso', positionFromSun: 5,
    subtitle: 'O maior planeta do Sistema Solar',
    summary: 'Um gigante de hidrogênio e hélio com uma atmosfera turbulenta, dezenas de luas conhecidas e a famosa Grande Mancha Vermelha.',
    description: 'Júpiter é o maior planeta do Sistema Solar e funciona como um importante laboratório natural de dinâmica atmosférica. Seu campo gravitacional também influencia profundamente o ambiente de pequenos corpos do sistema.',
    temperature: { meanC: -110, display: '-110 °C' }, distanceFromSun: { km: 778000000, au: 5.2, display: '778 milhões de km' },
    gravity: { value: 24.79, unit: 'm/s²' }, diameterKm: 142984, massKg: 1898.125e24, rotationPeriodHours: 0.41354 * 24, solarDayHours: 9.9, orbitalPeriodEarthDays: 11.862615 * 365.25,
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2024/03/jupiter-marble-pia22946-16x9-1.jpg',
    selectorImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jupiter_%28transparent%29.png/250px-Jupiter_%28transparent%29.png',
    selectorImageSourcePage: 'https://commons.wikimedia.org/wiki/File:Jupiter_(transparent).png',
    selectorImageCredit: 'NASA/ESA Hubble-based transparent asset',
    imageSourcePage: 'https://science.nasa.gov/solar-system/jupiter/', imageCredit: 'NASA/Juno', factSource: 'https://science.nasa.gov/jupiter/jupiter-facts/', advanced: { axialTiltDeg: 3.1, density: 1.33, escapeVelocityKms: 59.5, atmosphere: 'Atmosfera dominada por hidrogênio e hélio, com traços de metano, amônia e vapor d’água.', composition: 'Gigante gasoso sem superfície sólida definida; hidrogênio se torna progressivamente mais denso em profundidade.', magnetism: 'Campo magnético extremamente intenso, alimentado por movimentos de hidrogênio metálico no interior.', moons: 'Io, Europa, Ganimedes e Calisto', rings: 'Sistema tênue de anéis' },
    accent: '#d89b64', glow: 'rgba(216,151,93,.3)'
  },
  {
    id: 'saturno', name: 'Saturno', englishName: 'Saturn', type: 'Gigante gasoso', positionFromSun: 6,
    subtitle: 'O gigante conhecido por seus anéis',
    summary: 'Um gigante gasoso cercado por um complexo sistema de anéis e luas que virou um dos alvos mais estudados pela missão Cassini-Huygens.',
    description: 'Saturno é o segundo maior planeta do Sistema Solar. Seus anéis são formados principalmente por partículas de gelo e rocha, e seu sistema de luas oferece ambientes muito diferentes para investigação científica.',
    temperature: { meanC: -140, display: '-140 °C' }, distanceFromSun: { km: 1400000000, au: 9.5, display: '1,4 bilhão de km' },
    gravity: { value: 10.44, unit: 'm/s²' }, diameterKm: 120536, massKg: 568.317e24, rotationPeriodHours: 0.44401 * 24, solarDayHours: 10.7, orbitalPeriodEarthDays: 29.447498 * 365.25,
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2023/05/pia05380-saturn-with-rings-16x9-1.jpg',
    selectorImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/3D_Saturn.png/330px-3D_Saturn.png',
    selectorImageSourcePage: 'https://commons.wikimedia.org/wiki/File:3D_Saturn.png',
    selectorImageCredit: 'Jcpag2012 / Wikimedia Commons (CC BY-SA 4.0)',
    imageSourcePage: 'https://science.nasa.gov/image-detail/pia05380-saturn-with-rings-16x9/', imageCredit: 'NASA/JPL/Space Science Institute', factSource: 'https://science.nasa.gov/saturn/facts/', advanced: { axialTiltDeg: 26.73, density: 0.69, escapeVelocityKms: 35.5, atmosphere: 'Atmosfera composta principalmente por hidrogênio e hélio, com traços de outros compostos.', composition: 'Gigante gasoso com camadas profundas de hidrogênio, incluindo uma região de hidrogênio metálico.', magnetism: 'Campo magnético forte e extenso, associado às camadas internas condutoras do planeta.', moons: 'Titã, Encélado, Reia e Jápeto', rings: 'Sistema de anéis amplo e brilhante, rico em partículas de gelo e rocha' },
    accent: '#d5bb8d', glow: 'rgba(211,184,133,.28)'
  },
  {
    id: 'urano', name: 'Urano', englishName: 'Uranus', type: 'Gigante de gelo', positionFromSun: 7,
    subtitle: 'O planeta que gira quase de lado',
    summary: 'Um gigante de gelo azul-esverdeado com uma inclinação extrema e uma atmosfera muito fria e dinâmica.',
    description: 'Urano é um gigante de gelo e possui uma inclinação axial tão extrema que produz estações muito diferentes ao longo de sua longa órbita. Foi visitado de perto pela Voyager 2 em 1986.',
    temperature: { meanC: -195, display: '-195 °C' }, distanceFromSun: { km: 2900000000, au: 19.2, display: '2,9 bilhões de km' },
    gravity: { value: 8.87, unit: 'm/s²' }, diameterKm: 51118, massKg: 86.8099e24, rotationPeriodHours: -0.71833 * 24, solarDayHours: 17.2, orbitalPeriodEarthDays: 84.016846 * 365.25,
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2024/03/uranus-pia18182-16x9-1.jpg',
    selectorImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Uranus2-transparent.png/250px-Uranus2-transparent.png',
    selectorImageSourcePage: 'https://commons.wikimedia.org/wiki/File:Uranus2-transparent.png',
    selectorImageCredit: 'NASA/JPL-Caltech',
    imageSourcePage: 'https://science.nasa.gov/solar-system/uranus/', imageCredit: 'NASA/Voyager 2', factSource: 'https://science.nasa.gov/uranus/facts/', advanced: { axialTiltDeg: 97.77, density: 1.27, escapeVelocityKms: 21.3, atmosphere: 'Atmosfera de hidrogênio e hélio com metano, que contribui para a aparência azul-esverdeada.', composition: 'Gigante de gelo com um interior rico em materiais voláteis sobre um núcleo rochoso.', magnetism: 'Possui um campo magnético inclinado e deslocado em relação ao centro do planeta.', moons: 'Miranda, Ariel, Umbriel, Titânia e Oberon', rings: '13 anéis conhecidos, em geral estreitos e escuros' },
    accent: '#8fd6e7', glow: 'rgba(119,216,233,.3)'
  },
  {
    id: 'netuno', name: 'Netuno', englishName: 'Neptune', type: 'Gigante de gelo', positionFromSun: 8,
    subtitle: 'O planeta mais distante do Sol',
    summary: 'Um planeta azul, frio e extremamente ventoso, tão distante que uma órbita completa ao redor do Sol leva cerca de 165 anos terrestres.',
    description: 'Netuno é o oitavo e mais distante planeta do Sol. Sua atmosfera apresenta ventos intensos e tempestades, enquanto seu interior é dominado por materiais ricos em água, amônia e metano sob alta pressão.',
    temperature: { meanC: -200, display: '-200 °C' }, distanceFromSun: { km: 4500000000, au: 30, display: '4,5 bilhões de km' },
    gravity: { value: 11.15, unit: 'm/s²' }, diameterKm: 49528, massKg: 102.4092e24, rotationPeriodHours: 0.67125 * 24, solarDayHours: 16.1, orbitalPeriodEarthDays: 164.79132 * 365.25,
    imageUrl: 'https://science.nasa.gov/wp-content/uploads/2024/03/pia01492-neptune-full-disk-16x9-1.jpg',
    selectorImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Neptune_Full_%28original%29.jpg/500px-Neptune_Full_%28original%29.jpg',
    selectorImageSourcePage: 'https://commons.wikimedia.org/wiki/File:Neptune_Full_(original).jpg',
    selectorImageCredit: 'Jcpag2012 / Wikimedia Commons (CC BY-SA 4.0)',
    imageSourcePage: 'https://science.nasa.gov/solar-system/neptune/', imageCredit: 'NASA/Voyager 2', factSource: 'https://science.nasa.gov/neptune/neptune-facts/', advanced: { axialTiltDeg: 28.3, density: 1.64, escapeVelocityKms: 23.5, atmosphere: 'Atmosfera de hidrogênio e hélio com metano; ventos e tempestades podem atingir velocidades extremas.', composition: 'Gigante de gelo com materiais ricos em água, amônia e metano acima de um núcleo rochoso.', magnetism: 'Possui um campo magnético forte, inclinado e deslocado em relação ao centro do planeta.', moons: 'Tritão é a maior e mais conhecida lua; o sistema também inclui luas menores.', rings: 'Anéis tênues e escuros' },
    accent: '#6e9dff', glow: 'rgba(64,112,255,.34)'
  },
];

export const getPlanetById = (id) => planets.find((planet) => planet.id === id) || planets[3];
export const solarSystemSource = NASA_PLANETS;
