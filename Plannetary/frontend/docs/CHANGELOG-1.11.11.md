# Plannetary 1.11.11

## Seletor de planetas reconstruído
- Substituído o seletor em arco anterior por uma implementação isolada, sem herdar as regras históricas do seletor antigo.
- Mantida a disposição vertical em formato de `(` com os oito planetas distribuídos pela mesma curva matemática da linha visual.
- Clique do mouse restaurado em toda a área real de cada planeta.
- Navegação pela roda e teclado mantida em loop contínuo.
- A animação agora desloca cada planeta por uma posição por passo e faz o item que cruza a borda reaparecer no lado oposto, evitando saltos longos no meio da coluna.
- Hover não altera escala ou posição, evitando tremores/flicker no cursor.
- Nomes permanecem dentro da área útil e só o planeta ativo exibe o nome.
- O seletor é ocultado quando Lua ou Missões estão abertas.

## Saturno
- Imagem grande restaurada para a fotografia Cassini PIA05380, usada anteriormente no projeto.
- Miniatura do seletor substituída pela fotografia colorida do Hubble/ESA (heic2312a), com fundo preto integrado por `mix-blend-mode: screen`.
- Removidas máscaras especiais antigas do seletor novo que podiam cortar ou deformar os anéis.
