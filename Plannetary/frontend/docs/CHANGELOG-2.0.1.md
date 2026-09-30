# Plannetary 2.0.1

## Ajuste de enquadramento e zoom 3D

- Reduzido o tamanho inicial dos planetas ao trocar de seleção, evitando que o modelo cubra os dados superiores.
- Zoom máximo limitado de forma dinâmica pelo campo de visão e pelo tamanho do corpo renderizado.
- O enquadramento permanece completo no zoom máximo, sem cortar as bordas do planeta.
- Damping e velocidades do OrbitControls foram refinados para uma aproximação mais suave.
- O canvas 3D agora força fundo transparente para preservar a composição espacial.
- A rotação automática foi suavizada sem alterar a identidade visual da cena.
