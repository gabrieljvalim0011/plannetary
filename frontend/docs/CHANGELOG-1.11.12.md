# Plannetary 1.11.12

## Correções do carregamento visual
- A abertura cósmica (Big Bang) passou a ficar sempre acima do conteúdo interativo durante toda a intro, evitando que o seletor de planetas apareça por cima da animação inicial.
- O seletor mantém z-index suficiente para ficar sobre a cena depois da intro, mas permanece abaixo da abertura.

## Imagens do seletor
- As imagens dos planetas do seletor passam a usar composição `screen`, removendo visualmente os fundos pretos das fotografias e preservando o corpo do planeta sobre o campo estelar.
- Saturno mantém o tratamento específico de imagem sem fundo opaco.
