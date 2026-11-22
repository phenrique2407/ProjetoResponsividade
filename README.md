# Guia de Responsividade

Guia interativo em Vue 3 que ensina a criar páginas que funcionam em qualquer tela.
Cada seção tem explicação curta, código comentado, laboratório interativo, resposta da
pergunta-guia e fontes consultadas. Termina com a página Desafio.

- Site publicado: https://phenrique2407.github.io/ProjetoResponsividade/
- Dupla: Pedro Henrique Dias Brito e Vinicius Rodrigues Vilaça

## Tecnologias

Vue 3, Vite, Vue Router (rotas carregadas sob demanda) e Pinia (estado de UI e consumo da Dog API).

## Seções e rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Início |
| `/secao-1` | Por que responsividade importa (meta viewport) |
| `/secao-2` | Unidades CSS |
| `/secao-3` | Flexbox e Grid |
| `/secao-4` | Imagens responsivas |
| `/secao-5` | Boas práticas em projetos Vue |
| `/desafio` | Desafio final |

## Laboratórios

1. Simulador de viewport (Seção 1)
2. Conversor de unidades e simulação de fonte do navegador (Seção 2)
3. Flexbox contra Grid com largura do contêiner em px (Seção 3)
4. Imagem com atraso, com e sem `width` e `height` (Seção 4)
5. `object-fit` e `aspect-ratio` (Seção 4)
6. `:key` no `v-for` (Seção 5)
7. Indicador fixo de largura e breakpoint (todas as telas)

## Estrutura

```
src/
  assets/       base.css (reset) e main.css (design tokens em :root)
  components/   layout/, shared/, labs/
  data/         sections.js e snippets.js
  router/       rotas com lazy loading
  stores/       useUIStore.js e useApiStore.js
  views/        uma tela por rota
```

## Como rodar

```sh
npm install
npm run dev
npm run build
```

## Regras técnicas atendidas

CSS mobile-first com `min-width`, fontes e espaçamentos em rem, cores e espaços como variáveis
CSS em `:root`, sem rolagem horizontal na página, menu em botão no celular.
