# Plannetary 1.11.5

## Correções e refinamentos

- Seletor de planetas reposicionado em arco vertical real em forma de `(`, com os planetas seguindo a mesma geometria do arco.
- Roda do mouse continua avançando um planeta por vez, sem scrollbar visual.
- Saturno voltou a usar somente a fotografia real, sem pseudo-elementos CSS e sem retângulo preto no thumbnail.
- Calculadoras de peso/idade reorganizadas em duas colunas simétricas e estáveis.
- Cursor personalizado removido; o navegador volta a usar o cursor nativo.
- O modo lunar deixou de depender do proxy Farmsense durante o desenvolvimento. A fase lunar usa cálculo local por padrão e aceita endpoint live via `VITE_MOON_PHASE_ENDPOINT`.
- Removido o proxy `/api/moonphases` do Vite para eliminar os erros `ENOTFOUND api.farmsense.net`.
