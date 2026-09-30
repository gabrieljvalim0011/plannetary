# Plannetary 1.11.16

## Polimento do seletor de planetas
- Todos os oito planetas usam imagens transparentes dedicadas no seletor, evitando fundos pretos e reduzindo o peso das miniaturas.
- Saturno do seletor usa a imagem transparente do Hubble em tamanho reduzido e recebe uma inclinação sutil de -9deg.
- O Saturno grande permanece com a fotografia Cassini PIA05380.
- Camadas históricas do seletor (`planet-rail`, `planet-orb` e variantes) foram removidas do CSS porque não existem mais no markup atual.
- A camada ativa do seletor foi consolidada em um único bloco para evitar regras conflitantes entre versões.
- Removido o estado/flag legado de teleporte visual do seletor; o loop continua usando o mesmo cálculo e a mesma dinâmica atuais.
- Nenhuma mudança foi feita na lógica de navegação, abertura da Lua, Missões ou nos demais componentes.
