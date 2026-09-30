# Plannetary 2.0.7 — Performance

## Foco
Revisão de desempenho da camada 3D antes da etapa de adaptação mobile.

## Alterações
- Renderização 3D interrompida quando a cena sai da viewport ou a aba fica oculta.
- Pixel ratio máximo reduzido para diminuir custo de GPU mantendo qualidade visual.
- Geometrias 3D do planeta, Lua, satélites e anéis reduzidas onde a diferença visual é imperceptível em tela.
- Fallbacks procedurais de textura reutilizam canvases já gerados.
- Cache do carregamento de imagens do Three.js ativado.
- Terra usa uma textura Blue Marble local de 2048×1024 em WebP para evitar download remoto de uma imagem muito maior.
- Anisotropia reduzida para níveis adequados ao tamanho real de exibição.
- Render loops agora iniciam/paralisam de forma determinística em vez de manter requestAnimationFrame ativo fora da viewport.
- Pequena redução de operações por frame no sistema de satélites.

## Preservado
Navegação, zoom, rotação, aparência, dinâmica de seleção e estrutura visual permanecem inalterados.
