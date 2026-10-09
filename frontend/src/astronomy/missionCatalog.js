import { missionHighlights } from './missionHighlights.js';

const extraMissions = {
  mercurio: [
    {
      id: 'messenger', name: 'MESSENGER', status: 'Histórica · 2004–2015', category: 'historical', type: 'Orbitador',
      target: 'Mercúrio', partners: 'NASA / APL', launch: '3 ago. 2004', milestone: 'Fim: 30 abr. 2015', location: 'Órbita de Mercúrio',
      objective: 'Mapear a superfície e investigar a composição, geologia, magnetosfera e depósitos polares de Mercúrio.',
      sourceUrl: 'https://science.nasa.gov/mission/messenger/', sourceLabel: 'NASA Science',
      spacecraft: 'MESSENGER', instruments: 'MDIS, GRS, NS, XRS, MAG, MLA, MASCS, EPPS, RS',
      overview: 'Foi a primeira espaçonave a orbitar Mercúrio e estudou o planeta por mais de quatro anos em órbita.',
      science: ['Composição da superfície', 'História geológica', 'Campo magnético interno', 'Depósitos polares de gelo'],
      highlights: ['Primeiro orbitador de Mercúrio', 'Quase 100 mil imagens no primeiro ano', 'Confirmou que depósitos polares são dominados por gelo de água'],
      timeline: ['2004 · lançamento', '2011 · entrada em órbita', '2012 · missão primária concluída', '2015 · impacto final'],
    },
    {
      id: 'mariner-10', name: 'Mariner 10', status: 'Histórica · 1973–1975', category: 'historical', type: 'Sobrevoo planetário',
      target: 'Mercúrio + Vênus', partners: 'NASA / JPL', launch: '3 nov. 1973', milestone: 'Último contato: 24 mar. 1975', location: 'Sobrevoos de Mercúrio',
      objective: 'Investigar Mercúrio e Vênus, incluindo superfície, atmosfera e ambiente espacial.',
      sourceUrl: 'https://science.nasa.gov/mission/mariner-10/', sourceLabel: 'NASA Science',
      spacecraft: 'Mariner 10', instruments: 'Câmeras, magnetômetro, espectrômetros, radiômetro e instrumentos de partículas',
      overview: 'Foi a primeira missão enviada a Mercúrio e a primeira a usar assistência gravitacional para mudar sua trajetória.',
      science: ['Superfície craterada de Mercúrio', 'Campo magnético', 'Temperatura e ambiente de Vênus', 'Uso pioneiro de assistência gravitacional'],
      highlights: ['Primeira espaçonave a visitar Mercúrio', 'Primeira missão a explorar dois planetas', '3 sobrevoos de Mercúrio'],
      timeline: ['1973 · lançamento', '1974 · primeiro encontro com Mercúrio', '1975 · terceiro sobrevoo', '1975 · fim do contato'],
    },
  ],
  venus: [
    {
      id: 'veritas', name: 'VERITAS', status: 'Futura', category: 'future', type: 'Orbitador',
      target: 'Vênus', partners: 'NASA / JPL', launch: 'Futura', milestone: 'Missão aprovada para desenvolvimento', location: 'Órbita de Vênus',
      objective: 'Mapear a superfície de Vênus em alta resolução e investigar sua geologia, história e atividade.',
      sourceUrl: 'https://science.nasa.gov/mission/veritas/overview/', sourceLabel: 'NASA Science',
      spacecraft: 'VERITAS', instruments: 'Radar e espectrômetro de emissão térmica',
      overview: 'VERITAS pretende construir mapas globais de alta resolução para entender como Vênus se tornou tão diferente da Terra.',
      science: ['Geologia global', 'Deformação tectônica', 'História vulcânica', 'Interior de Vênus'],
      highlights: ['Mapeamento global de alta resolução', 'Estudo da atividade geológica e vulcânica', 'Comparação entre Vênus e a Terra'],
      timeline: ['Futuro · desenvolvimento', 'Futuro · lançamento', 'Futuro · inserção orbital e mapeamento'],
    },
    {
      id: 'magellan', name: 'Magellan', status: 'Histórica · 1989–1994', category: 'historical', type: 'Orbitador',
      target: 'Vênus', partners: 'NASA / JPL', launch: '4 mai. 1989', milestone: 'Fim: 1994', location: 'Órbita de Vênus',
      objective: 'Mapear toda a superfície de Vênus por radar e estudar sua geologia.',
      sourceUrl: 'https://science.nasa.gov/mission/magellan/', sourceLabel: 'NASA Science',
      spacecraft: 'Magellan', instruments: 'Radar de abertura sintética',
      overview: 'Magellan foi a primeira missão a imagear toda a superfície de Vênus em detalhes, revelando vulcões, planícies e estruturas tectônicas.',
      science: ['Mapeamento de superfície', 'Vulcanismo', 'Tectônica', 'Topografia'],
      highlights: ['Primeiro mapeamento global detalhado de Vênus', 'Dados de radar atravessaram as nuvens', 'Redefiniu o entendimento da superfície venusiana'],
      timeline: ['1989 · lançamento', '1990 · chegada a Vênus', '1990–1992 · mapeamento principal', '1994 · fim da missão'],
    },
    {
      id: 'venus-express', name: 'Venus Express', status: 'Histórica · 2005–2014', category: 'historical', type: 'Orbitador',
      target: 'Vênus', partners: 'ESA', launch: '9 nov. 2005', milestone: 'Fim: 2014', location: 'Órbita de Vênus',
      objective: 'Estudar a atmosfera, o clima e o ambiente espacial de Vênus.',
      sourceUrl: 'https://www.esa.int/Science_Exploration/Space_Science/Venus_Express', sourceLabel: 'ESA',
      spacecraft: 'Venus Express', instruments: '7 instrumentos científicos',
      overview: 'A primeira missão europeia a orbitar Vênus investigou sua atmosfera e fenômenos climáticos por quase oito anos.',
      science: ['Atmosfera de Vênus', 'Clima e circulação', 'Perda atmosférica', 'Ambiente magnético'],
      highlights: ['Primeiro orbitador europeu de Vênus', 'Monitorou a atmosfera por anos', 'Contribuiu para estudos sobre perda de água'],
      timeline: ['2005 · lançamento', '2006 · entrada em órbita', '2006–2014 · operações', '2014 · fim'],
    },
  ],
  terra: [
    {
      id: 'dscovr', name: 'DSCOVR', status: 'Ativa', category: 'active', type: 'Observatório espacial',
      target: 'Terra + espaço interplanetário', partners: 'NASA + NOAA + U.S. Air Force', launch: '11 fev. 2015', milestone: 'Operação em L1', location: 'Ponto de Lagrange L1',
      objective: 'Monitorar o vento solar e fornecer observações contínuas da Terra iluminada pelo Sol.',
      sourceUrl: 'https://science.nasa.gov/mission/dscovr/', sourceLabel: 'NASA Science',
      spacecraft: 'DSCOVR', instruments: 'EPIC, NISTAR e instrumentos de monitoramento solar',
      overview: 'DSCOVR mantém observações do ambiente solar e da Terra a partir de uma posição privilegiada entre o Sol e o nosso planeta.',
      science: ['Vento solar', 'Clima espacial', 'Observação da Terra', 'Monitoramento de tempestades solares'],
      highlights: ['Dados quase em tempo real do vento solar', 'Imagens do disco terrestre inteiro', 'Suporte a previsões de clima espacial'],
      timeline: ['2015 · lançamento', '2015 · chegada a L1', '2015–presente · operação'],
    },
    {
      id: 'icesat-2', name: 'ICESat-2', status: 'Ativa', category: 'active', type: 'Satélite científico',
      target: 'Terra', partners: 'NASA', launch: '15 set. 2018', milestone: 'Operação científica', location: 'Órbita terrestre',
      objective: 'Medir com grande precisão mudanças na altura de gelo, vegetação, água e terreno.',
      sourceUrl: 'https://science.nasa.gov/mission/icesat-2/', sourceLabel: 'NASA Science',
      spacecraft: 'ICESat-2', instruments: 'ATLAS',
      overview: 'O laser altimétrico do ICESat-2 mede mudanças na superfície terrestre, especialmente em regiões polares.',
      science: ['Gelo marinho e glaciares', 'Florestas', 'Águas interiores', 'Topografia'],
      highlights: ['Medições precisas de elevação', 'Observação das regiões polares', 'Dados úteis para estudos climáticos'],
      timeline: ['2018 · lançamento', '2018–presente · ciência orbital'],
    },
  ],
  marte: [
    {
      id: 'curiosity', name: 'Curiosity', status: 'Ativa', category: 'active', type: 'Rover',
      target: 'Cratera Gale', partners: 'NASA', launch: '26 nov. 2011', milestone: 'Pouso: 6 ago. 2012', location: 'Marte · Cratera Gale',
      objective: 'Investigar se Marte já teve condições ambientais capazes de sustentar vida microbiana.',
      sourceUrl: 'https://science.nasa.gov/mission/msl-curiosity/', sourceLabel: 'NASA Science',
      spacecraft: 'Rover Curiosity', instruments: 'Câmeras, espectrômetros, SAM, CheMin, RAD e outros',
      overview: 'Curiosity percorre Gale, investigando rochas, sedimentos e a história ambiental de Marte.',
      science: ['Habitabilidade passada', 'Geologia de Gale', 'Química orgânica', 'Clima antigo'],
      highlights: ['Analisou antigos ambientes lacustres', 'Encontrou moléculas orgânicas', 'Subiu o Monte Sharp'],
      timeline: ['2011 · lançamento', '2012 · pouso', '2012–presente · exploração'],
    },
    {
      id: 'mro', name: 'Mars Reconnaissance Orbiter', status: 'Ativa', category: 'active', type: 'Orbitador',
      target: 'Marte', partners: 'NASA', launch: '12 ago. 2005', milestone: 'Chegada: 10 mar. 2006', location: 'Órbita de Marte',
      objective: 'Estudar a superfície e a atmosfera de Marte e apoiar outras missões com comunicações e imagens.',
      sourceUrl: 'https://science.nasa.gov/mission/mars-reconnaissance-orbiter/', sourceLabel: 'NASA Science',
      spacecraft: 'MRO', instruments: 'HiRISE, CTX, MARCI, CRISM e outros',
      overview: 'MRO produz algumas das imagens mais detalhadas já feitas da superfície marciana e também atua como relé de comunicações.',
      science: ['Água e gelo', 'Geologia de superfície', 'Atmosfera', 'Suporte a missões'],
      highlights: ['Imagens de alta resolução com HiRISE', 'Mapeamento mineralógico', 'Relé para rovers e landers'],
      timeline: ['2005 · lançamento', '2006 · chegada', '2006–presente · operações'],
    },
    {
      id: 'mars-odyssey', name: 'Mars Odyssey', status: 'Ativa', category: 'active', type: 'Orbitador',
      target: 'Marte', partners: 'NASA', launch: '7 abr. 2001', milestone: 'Chegada: 24 out. 2001', location: 'Órbita de Marte',
      objective: 'Mapear a composição superficial e estudar o ambiente marciano, além de apoiar comunicações.',
      sourceUrl: 'https://science.nasa.gov/mission/mars-odyssey/', sourceLabel: 'NASA Science',
      spacecraft: '2001 Mars Odyssey', instruments: 'THEMIS, GRS e MARIE',
      overview: 'Odyssey criou um dos primeiros mapas globais detalhados de elementos e minerais da superfície marciana.',
      science: ['Mineralogia', 'Distribuição de hidrogênio e água', 'Temperatura superficial', 'Clima'],
      highlights: ['Primeiro mapa global de composição química e mineral', 'Mapas térmicos com THEMIS', 'Longa contribuição para comunicações'],
      timeline: ['2001 · lançamento', '2001 · chegada', '2002–presente · operações'],
    },
    {
      id: 'maven', name: 'MAVEN', status: 'Ativa', category: 'active', type: 'Orbitador',
      target: 'Marte', partners: 'NASA', launch: '18 nov. 2013', milestone: 'Chegada: 21 set. 2014', location: 'Órbita superior de Marte',
      objective: 'Entender como Marte perdeu grande parte de sua atmosfera para o espaço.',
      sourceUrl: 'https://science.nasa.gov/mission/maven/', sourceLabel: 'NASA Science',
      spacecraft: 'MAVEN', instruments: 'Partículas, campos e espectrômetros atmosféricos',
      overview: 'MAVEN é dedicado ao estudo da atmosfera superior e da interação entre Marte e o vento solar.',
      science: ['Escape atmosférico', 'Vento solar', 'Ionosfera', 'Evolução climática'],
      highlights: ['Primeira missão focada na atmosfera superior de Marte', 'Relaciona clima antigo e perda atmosférica', 'Observa efeitos de tempestades solares'],
      timeline: ['2013 · lançamento', '2014 · chegada', '2014–presente · operações'],
    },
  ],
  jupiter: [
    {
      id: 'juno', name: 'Juno', status: 'Ativa', category: 'active', type: 'Orbitador',
      target: 'Júpiter', partners: 'NASA / JPL', launch: '5 ago. 2011', milestone: 'Chegada: 4 jul. 2016', location: 'Órbita de Júpiter',
      objective: 'Investigar a origem, estrutura, atmosfera e magnetosfera de Júpiter.',
      sourceUrl: 'https://science.nasa.gov/mission/juno/', sourceLabel: 'NASA Science',
      spacecraft: 'Juno', instruments: 'JIRAM, JunoCam, magnetômetros, radiômetros e outros',
      overview: 'Juno mergulha repetidamente sobre os polos de Júpiter para estudar o interior e o enorme campo magnético do planeta.',
      science: ['Estrutura interna', 'Campo magnético', 'Atmosfera profunda', 'Origem do sistema joviano'],
      highlights: ['Primeiro olhar próximo aos polos de Júpiter', 'Mapeou um campo magnético complexo', 'Estudou auroras e ciclones polares'],
      timeline: ['2011 · lançamento', '2016 · chegada', '2016–presente · operações'],
    },
    {
      id: 'galileo', name: 'Galileo', status: 'Histórica · 1989–2003', category: 'historical', type: 'Orbitador + sonda atmosférica',
      target: 'Júpiter', partners: 'NASA', launch: '18 out. 1989', milestone: 'Fim: 21 set. 2003', location: 'Sistema joviano',
      objective: 'Estudar Júpiter, suas luas e a atmosfera do planeta com um orbitador de longa duração.',
      sourceUrl: 'https://science.nasa.gov/mission/galileo/', sourceLabel: 'NASA Science',
      spacecraft: 'Galileo', instruments: '11 instrumentos científicos + sonda atmosférica',
      overview: 'Galileo foi a primeira missão a orbitar Júpiter e enviou uma sonda diretamente para a atmosfera do planeta.',
      science: ['Atmosfera de Júpiter', 'Luas Galileanas', 'Campo magnético', 'Ambiente de radiação'],
      highlights: ['Primeiro orbitador de Júpiter', 'Sonda entrou na atmosfera em 1995', 'Fortes evidências de oceanos em luas geladas'],
      timeline: ['1989 · lançamento', '1995 · chegada', '1995 · sonda atmosférica', '2003 · fim'],
    },
    {
      id: 'voyager-1', name: 'Voyager 1', status: 'Histórica · sobrevoo 1979', category: 'historical', type: 'Sobrevoo planetário',
      target: 'Júpiter', partners: 'NASA / JPL', launch: '5 set. 1977', milestone: 'Sobrevoo: 5 mar. 1979', location: 'Júpiter',
      objective: 'Realizar observações de alta resolução de Júpiter e seu sistema de luas.',
      sourceUrl: 'https://science.nasa.gov/mission/voyager/voyager-1/', sourceLabel: 'NASA Science',
      spacecraft: 'Voyager 1', instruments: 'Câmeras, espectrômetros, magnetômetros e outros',
      overview: 'O sobrevoo revelou detalhes inéditos da atmosfera de Júpiter e de suas luas, incluindo vulcanismo em Io.',
      science: ['Atmosfera', 'Vulcanismo de Io', 'Anéis de Júpiter', 'Magnetosfera'],
      highlights: ['Descobriu vulcões ativos em Io', 'Revelou um anel de Júpiter', 'Imagens detalhadas das luas'],
      timeline: ['1977 · lançamento', '1979 · encontro com Júpiter'],
    },
  ],
  saturno: [
    {
      id: 'voyager-1-saturn', name: 'Voyager 1', status: 'Histórica · sobrevoo 1980', category: 'historical', type: 'Sobrevoo planetário',
      target: 'Saturno', partners: 'NASA / JPL', launch: '5 set. 1977', milestone: 'Sobrevoo: 12 nov. 1980', location: 'Saturno e Titã',
      objective: 'Explorar Saturno, seus anéis e principalmente Titã durante um sobrevoo de alta velocidade.',
      sourceUrl: 'https://science.nasa.gov/mission/voyager/voyager-1/', sourceLabel: 'NASA Science',
      spacecraft: 'Voyager 1', instruments: 'Sistema de imagem e instrumentos de campos e partículas',
      overview: 'Voyager 1 realizou um encontro próximo com Saturno e um sobrevoo decisivo de Titã.',
      science: ['Estrutura dos anéis', 'Atmosfera de Titã', 'Magnetosfera', 'Luas do sistema'],
      highlights: ['Primeiro grande levantamento próximo de Titã', 'Detalhou anéis e atmosfera de Saturno'],
      timeline: ['1977 · lançamento', '1980 · encontro com Saturno'],
    },
    {
      id: 'voyager-2-saturn', name: 'Voyager 2', status: 'Histórica · sobrevoo 1981', category: 'historical', type: 'Sobrevoo planetário',
      target: 'Saturno', partners: 'NASA / JPL', launch: '20 ago. 1977', milestone: 'Sobrevoo: 25 ago. 1981', location: 'Saturno e seus anéis',
      objective: 'Complementar as observações de Saturno e preparar a trajetória para Urano.',
      sourceUrl: 'https://science.nasa.gov/mission/voyager/voyager-2/', sourceLabel: 'NASA Science',
      spacecraft: 'Voyager 2', instruments: 'Sistema de imagem e instrumentos de campos e partículas',
      overview: 'O encontro de Voyager 2 com Saturno ajudou a refinar o entendimento dos anéis e da atmosfera.',
      science: ['Anéis', 'Atmosfera', 'Magnetosfera', 'Luas'],
      highlights: ['Medições complementares às de Voyager 1', 'Trajetória planejada para Urano'],
      timeline: ['1977 · lançamento', '1981 · encontro com Saturno', '1986 · Urano'],
    },
    {
      id: 'pioneer-11', name: 'Pioneer 11', status: 'Histórica · sobrevoo 1979', category: 'historical', type: 'Sobrevoo planetário',
      target: 'Saturno', partners: 'NASA', launch: '6 abr. 1973', milestone: 'Sobrevoo: 1 set. 1979', location: 'Saturno',
      objective: 'Realizar o primeiro sobrevoo de Saturno e estudar seus anéis, atmosfera e ambiente de partículas.',
      sourceUrl: 'https://science.nasa.gov/mission/pioneer-11/', sourceLabel: 'NASA Science',
      spacecraft: 'Pioneer 11', instruments: 'Instrumentos de imagem e partículas/campos',
      overview: 'Pioneer 11 foi a primeira espaçonave a alcançar Saturno e abriu o caminho para os Voyagers.',
      science: ['Anéis', 'Atmosfera', 'Campo magnético', 'Ambiente de partículas'],
      highlights: ['Primeiro encontro próximo com Saturno', 'Demonstrou que a região dos anéis era atravessável'],
      timeline: ['1973 · lançamento', '1974 · Júpiter', '1979 · Saturno'],
    },
    {
      id: 'dragonfly', name: 'Dragonfly', status: 'Futura', category: 'future', type: 'Rotorcraft-lander',
      target: 'Titã · sistema de Saturno', partners: 'NASA / APL', launch: 'Futura', milestone: 'Missão futura', location: 'Titã',
      objective: 'Investigar a química pré-biótica e a habitabilidade de Titã em múltiplos locais.',
      sourceUrl: 'https://science.nasa.gov/mission/dragonfly/', sourceLabel: 'NASA Science',
      spacecraft: 'Dragonfly', instruments: 'Conjunto de instrumentos de química, geologia e meteorologia',
      overview: 'Dragonfly será um veículo móvel movido por rotores, explorando a superfície de Titã em vários locais.',
      science: ['Química orgânica', 'Habitabilidade', 'Geologia de Titã', 'Ciclo do metano'],
      highlights: ['Primeiro rotorcraft científico em outro mundo', 'Exploração de múltiplos locais em Titã'],
      timeline: ['Futuro · lançamento', 'Futuro · chegada a Titã', 'Futuro · campanha de exploração'],
    },
  ],
  urano: [],
  netuno: [],
};

export const missionCatalog = Object.fromEntries(
  Object.entries(missionHighlights).map(([planetId, featured]) => {
    const featuredMission = {
      id: 'featured',
      category: featured.status?.toLowerCase().includes('futura') ? 'future' : featured.status?.toLowerCase().includes('histórica') || featured.status?.toLowerCase().includes('concluída') ? 'historical' : 'active',
      ...featured,
    };

    // Older catalog entries have mission facts but no dedicated media. Keep the
    // panel visual instead of rendering an empty frame, and label this honestly
    // as reference imagery rather than implying it depicts the selected craft.
    const referenceGallery = (featured.gallery || []).map((image) => ({
      ...image,
      alt: `Imagem de referência do sistema de ${featured.target}; não representa necessariamente ${featured.name}.`,
      kind: 'reference',
    }));
    const missions = (extraMissions[planetId] || []).map((mission) => {
      if (mission.gallery?.length || mission.imageUrl) return mission;
      if (!referenceGallery.length) return mission;
      return {
        ...mission,
        gallery: referenceGallery,
        imageCredit: featured.imageCredit,
        imageReferenceOnly: true,
      };
    });

    return [planetId, [featuredMission, ...missions]];
  })
);
