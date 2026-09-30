# Plannetary 2.0.0 — Sistema Solar 3D

## Objetivo
Primeira evolução 3D do Plannetary, adicionando modelos 3D interativos aos planetas e à Lua sem abandonar a arquitetura visual existente.

## 3D planetário
- Modelos 3D esféricos com materiais, textura procedural, iluminação e profundidade real.
- Saturno possui anéis 3D próprios.
- Terra recebe uma camada adicional de nuvens.
- Urano mantém sua inclinação axial visual.
- Arraste com o mouse para girar e use a roda para aproximar/afastar.
- Rotação automática lenta e independente da interface.
- Fallback para a imagem anterior quando WebGL não estiver disponível.
- Renderização lazy: o pacote Three.js é carregado em chunk separado.

## Lua 3D
- Modelo 3D real em Three.js.
- Iluminação muda de acordo com a fase selecionada.
- Fases continuam selecionáveis pelo calendário existente.
- Superlua, microlua, eclipse lunar, eclipse solar e Lua azul continuam ligados à visualização.
- Navegação por mouse e toque preservada.

## Performance
- Pixel ratio limitado para evitar renderizações excessivamente grandes.
- Renderização pausada quando a cena fica fora da viewport ou a aba está oculta.
- Sem pós-processamento pesado.
- Geometrias de resolução moderada e texturas geradas sob demanda.
- Three.js permanece separado do carregamento inicial por lazy import.

## Dados e aparência
- Navegação, seletor, calculadoras, dados astronômicos, fenômenos, missões e identidade visual existentes foram preservados.
- O crédito de imagem do herói foi substituído por crédito do modelo 3D e dos dados científicos, evitando atribuir o modelo procedural a uma fotografia externa.
