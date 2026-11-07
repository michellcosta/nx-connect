# Saimo TV — portes do Site para o app webOS local

Decisão: seguir com o **app local leve** (`com.saimo.tv`) e portar só o que vale do Site (versão 2.6.7). Nenhum arquivo foi alterado ainda. Os arquivos do Site estão em TypeScript, então a lógica vira ES5 no build do webOS.

## Passo 0: guardar o fonte

Criar `src/` com o código legível e fazer o build para `build/`. Hoje o `tools/build.js` transpila em cima dos próprios arquivos, e foi assim que nasceu o laço do On Demand. Sem isso, cada porte vira edição em código transpilado.

## Prioridade 1 (o que foi pedido)

1. **Gêneros no On Demand.**
   - Origem: `generos()`, `temGenero()` e as listas `GENEROS_ON_DEMAND` e `ORDEM_GENEROS` (`vodService.ts` e `VodCatalog.tsx`).
   - No webOS: um módulo novo que monta as fileiras a partir do `fichas.txt` (que já tem os gêneros), em tempo ocioso, com no máximo \~60 títulos por gênero, ordenados por ano, 4 capas por fileira.
   - Custo: médio. Peso: baixo se for sob demanda.
2. **Fonte preferida na série.**
   - Origem: `fontePreferida.ts`, `sourceOrder.ts` e `resolveVodSources.ts`.
   - No webOS: mesmo servidor, depois a mesma posição na versão (dublado ou legendado), depois a primeira.
   - Custo: pequeno, é lógica pura.
3. **Esconder o servidor nas listas de fontes:** mostrar só "Fonte N", o nome e a qualidade. Custo: pequeno.

## Prioridade 2

4. **Fontes desativadas** (`fontesDesativadas.ts`, `/v1/fontes` com cache de 1 hora), somadas aos hosts mortos locais.
5. **Arquivo local primeiro** nas leituras do VOD, que é a correção de velocidade já combinada.
6. **Vigia do ao vivo** (`vigiaAoVivo.ts`, 183 linhas): detecta travamento e recupera. Custo: médio, e precisa de teste na TV.
7. **Eventos** (`eventos.ts`, `/v1/eventos`), atualizando a cada 3 minutos só com a tela aberta.

## Prioridade 3

8. **Leitor de M3U compartilhado** (`leitorM3u.ts`), usando o gabarito `tests/minhasListas.test.mjs` para garantir que o resultado é igual ao dos outros apps. Aproveitar para trocar o limite de 2.000 itens do `localStorage` por IndexedDB.
9. **Paridade de `pulos.ts` (TheIntroDB) e `continuar.ts`**, comparando com o que o webOS já faz.
10. **Polyfills de TV**, comparando com o `polyfills.js` atual.

## Não portar

- **Segmento direto:** o app instalado na TV não sofre CORS, então não ajuda.
- **Chromecast, PWA, layout de celular e o bloqueio de extensões:** são só do navegador.
- **Chuva de apoiadores:** animação pesada para TV.
- **Zero Delay e Áudio Inteligente:** só depois de medir o custo em uma TV real.

## O que continua só nosso

OK longo, controle com 6 teclas, 4 capas por card, hub que abre na hora e o player VOD com barra de tempo.
