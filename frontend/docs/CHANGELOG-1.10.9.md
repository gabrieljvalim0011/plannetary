# Plannetary 1.10.9 — Performance & Motion Polish

## Objetivo
Reduzir trabalho por frame, acelerar a carga inicial e deixar as transições mais previsíveis sem transformar as animações em simplesmente mais lentas.

## Principais alterações
- MissionPanel e MoonPanel passaram a carregar sob demanda com `React.lazy`, reduzindo o peso inicial do bundle.
- Componentes visuais estáveis foram memoizados e os callbacks principais ficaram estáveis com `useCallback`.
- AstronomicalOverlay interrompe o relógio de atualização quando a experiência da Lua/Missões está aberta e pausa corretamente quando a aba fica oculta.
- Cache de sessão e throttling para a consulta da fase lunar, evitando chamadas repetidas ao retornar para a aba.
- Starfield reduzido para 80 estrelas, com apenas 28 partículas em twinkle contínuo; demais estrelas permanecem estáticas.
- Remoção do `backdrop-filter` e de grandes blurs em superfícies recorrentes, substituindo-os por composição estática equivalente.
- Halo planetário e fundos decorativos passaram a usar gradientes leves em vez de filtros de blur em grandes áreas.
- Backdrop das imagens de missão foi trocado por camada estática com gradiente.
- `will-change` permanente removido de elementos que não estão sempre em animação.
- Preconnect adicionado para os hosts externos de imagens/dados.
- Imagens do trilho planetário passam a usar `lazy` + `async decoding`.
- Fallback visual mínimo adicionado durante o carregamento dos painéis sob demanda.
- Mantida compatibilidade com `prefers-reduced-motion`.

## Revisão
A alteração foi feita sobre a 1.10.8-flicker-fix, preservando a correção do hover da fase lunar e as funcionalidades da 1.10.7/1.10.8.


### Image loading refinement
- Moon mission media now uses native `<img>` loading with async decode and high/low fetch priorities instead of CSS background images.
- Mission panels no longer decode the selected image a second time for a blurred/background image.
- Added connection hints for image origins used by NASA, CNSA and Wikimedia.
- Fixed Chandrayaan-3 (C3) media to a stable Wikimedia Commons thumbnail sourced from ISRO imagery.
