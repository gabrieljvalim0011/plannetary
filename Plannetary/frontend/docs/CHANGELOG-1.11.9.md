# Plannetary 1.11.9 — Seletor planetário estável

- Refeito o seletor desktop com uma classe isolada para eliminar conflitos de CSS acumulados.
- Os 8 planetas agora permanecem alinhados em uma única coluna vertical.
- Navegação por roda do mouse e teclado é circular: Netuno → Mercúrio e Mercúrio → Netuno.
- O posicionamento dos planetas não usa mais arco, offset lateral ou lista com scroll nativo.
- Saturno não recebe mais tratamento especial de posicionamento no seletor, evitando o movimento infinito lateral.
- Nomes ficam em coluna fixa, sem corte horizontal.
- Mantido cursor nativo do sistema.
