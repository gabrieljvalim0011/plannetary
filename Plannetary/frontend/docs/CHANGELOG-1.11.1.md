# Plannetary 1.11.1 — Reestruturação dos planetas

## O que mudou
- Cada planeta ganhou uma experiência dedicada, seguindo o conceito estrutural criado para a Lua.
- O botão “Explorar detalhes” agora abre uma experiência imersiva própria do planeta selecionado.
- Navegação direta entre os oito planetas dentro da experiência, sem precisar fechar a tela.
- Navegação por teclado com `←` e `→` e fechamento com `Esc`.
- Estrutura separada em visão geral, perfil e movimento, usando dados já existentes do catálogo.
- A experiência usa o mesmo sistema visual do planeta selecionado, preservando identidade por planeta.
- Imagens reutilizam os mesmos ativos já carregados pela interface principal, evitando um novo catálogo de imagens.
- A nova experiência é carregada sob demanda via `React.lazy`, mantendo o carregamento inicial enxuto.

## Revisão de coerência
- Não foram adicionados dados de missões, fenômenos ou comparações nesta versão para não antecipar etapas posteriores do roadmap (1.11.3–1.11.5).
- Não foram criados novos blocos de informação que dupliquem o calendário lunar ou os fenômenos lunares.
- A experiência fecha o scroll da página enquanto está aberta e restaura o comportamento anterior ao sair.

## Refinamentos desta entrega
- O seletor lateral de planetas ganhou rolagem suave, snap discreto e centralização automática do planeta selecionado.
- Saturno deixou de usar a esfera desenhada em CSS e passou a exibir o ativo fotográfico real já presente no catálogo da NASA.
- A experiência lunar recebeu um modelo visual 3D leve em CSS, sem adicionar biblioteca WebGL.
- As oito fases agora são clicáveis e atualizam a visualização lunar para mostrar a iluminação correspondente.
- Os fenômenos lunares também são selecionáveis, com representações visuais para Superlua, Microlua, eclipse lunar, eclipse solar e Lua azul.
- O cursor global foi substituído por um cursor estelar com hot-spot preservando a ponta característica do ponteiro.
- O favicon passou a usar a estrela do wordmark do Plannetary.
- As novas interações continuam priorizando `transform`, `opacity` e gradientes, evitando uma camada pesada de renderização para a experiência lunar.
