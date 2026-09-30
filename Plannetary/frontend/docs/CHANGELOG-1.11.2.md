# Plannetary 1.11.2 — correções de interação e composição

## Correções principais
- O seletor planetário deixou de depender de um scroll nativo visível. A roda do mouse agora avança ou retorna um planeta por vez.
- O planeta selecionado permanece em foco, com deslocamento lateral sutil, escala e identificação visual próprias.
- A seleção por teclado com ↑/↓ e PageUp/PageDown foi adicionada ao trilho planetário.
- O trilho recebeu zonas de desvanecimento e indicador discreto de rolagem, preservando a composição espacial.
- A miniatura de Saturno volta a usar exclusivamente a fotografia real do catálogo, sem globo desenhado em CSS.

## Experiência lunar
- O palco lunar foi recalibrado para manter o modelo centrado e limitar o diâmetro sem cortar a composição.
- As órbitas decorativas deixaram de ocupar uma área excessiva e passaram a acompanhar o tamanho do palco.
- A iluminação das fases ganhou sombra e terminador mais suaves.
- A experiência continua rolável quando o conteúdo abaixo do palco é maior que a viewport.

## Cursor
- O cursor foi reduzido e redesenhado como um ponteiro claro e fino, com uma pequena estrela junto à ponta em vez de um símbolo grande que dominava a tela.

## Revisão
- Mantidas as funcionalidades da 1.11.1 e as otimizações anteriores.
- Não foram adicionados novos módulos de dados ou bibliotecas 3D.
