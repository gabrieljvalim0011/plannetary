# Plannetary 🌌

Plannetary é uma experiência web interativa para explorar o Sistema Solar, com foco em astronomia, visualização 3D e exploração educativa.

## ✨ Destaques

- Experiência 3D interativa de planetas e Lua com Three.js
- Rotação e zoom com mouse e toque
- Fases e fenômenos lunares
- Sistema de satélites naturais
- Missões espaciais relacionadas à Lua e aos planetas
- Dados astronômicos e fenômenos planetários
- Navegação circular entre os planetas
- Interface espacial responsiva e otimizada para performance

## 🛠️ Stack

- React
- Vite
- Three.js
- JavaScript (ES modules)
- CSS

## 📁 Estrutura

```text
.
├── frontend/          # Aplicação web
│   ├── public/         # Assets públicos e texturas
│   ├── src/            # Componentes, dados, hooks e cenas 3D
│   ├── docs/           # Changelogs das versões
│   ├── package.json
│   └── vite.config.js
├── .env.example        # Variáveis opcionais, sem segredos
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Executando localmente

Requisitos: Node.js 20+ e npm.

```bash
cd frontend
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## 🔐 Variáveis de ambiente

O projeto **não versiona `.env`**. Nunca coloque chaves, tokens, senhas ou credenciais reais no repositório.

Existe um `.env.example` apenas para documentar variáveis opcionais.

## 🌙 Fase lunar

A aplicação possui cálculo local da fase lunar por padrão. Um endpoint externo pode ser configurado opcionalmente por `VITE_MOON_PHASE_ENDPOINT`.

## 📚 Fontes e créditos

Os dados e referências astronômicas do projeto utilizam fontes públicas e materiais de referência, incluindo NASA/JPL, NASA Earth Observatory, ESA/Hubble e outras instituições científicas citadas no código e nos changelogs.

Consulte `frontend/docs/` para o histórico de evolução do projeto.

## 🧭 Roadmap

A evolução do Plannetary segue as grandes etapas:

1. Experiência 2D e exploração do Sistema Solar
2. Experiência lunar e missões
3. Sistema Solar aprofundado
4. Plannetary 2.0 — experiência 3D
5. Adaptação e otimização para dispositivos móveis
6. Evoluções futuras de exploração, comparação e visualização temporal

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja `LICENSE`.

## 👨‍💻 Projeto

Plannetary é um projeto pessoal de portfólio focado em desenvolvimento web, interfaces interativas, visualização 3D e apresentação de dados científicos.
