// Trechos de código exibidos nas seções. Ficam em um arquivo .js (e não dentro
// dos .vue) para poder conter as tags de script e de template sem conflito.

export const viewportSnippet = `<!-- index.html -->
<head>
  <!-- width=device-width: a largura do layout passa a ser a largura real
       do aparelho (ex.: 390px) em vez de ~980px simulados.
       initial-scale=1: começa sem zoom (1 px CSS = 1 unidade da tela). -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>`

export const mobileFirstSnippet = `/* MOBILE-FIRST: o CSS fora de media query é o do celular */
.cards {
  display: grid;
  grid-template-columns: 1fr;   /* 1 coluna no celular */
  gap: 1rem;
}

/* Só ACRESCENTAMOS regras quando a tela cresce (min-width) */
@media (min-width: 48rem) {
  .cards {
    grid-template-columns: repeat(3, 1fr);  /* 3 colunas a partir de 768px */
  }
}`

export const unitsSnippet = `:root {
  /* rem = múltiplo do tamanho de fonte do <html> (padrão do navegador: 16px) */
  --text-base: 1rem;      /* 16px */
  --space-md: 1rem;
}

.card {
  /* em = múltiplo da fonte do PRÓPRIO elemento (ou do pai, em font-size) */
  padding: 1.5em;         /* se a fonte do card é 20px, o padding é 30px */

  /* % = fração do tamanho do elemento pai */
  width: 50%;

  /* ch = largura do caractere "0": ótimo para limitar linhas de texto */
  max-width: 65ch;
}

.layout {
  display: grid;
  /* fr = fração do espaço livre do grid */
  grid-template-columns: 1fr 2fr;
}

.hero {
  /* vw/vh = % da largura/altura da janela; dvh acompanha a barra do celular */
  min-height: 100vh;      /* alternativa antiga */
  min-height: 100dvh;     /* a versão moderna sobrescreve se for suportada */
  padding-inline: 5vw;
}`

export const flexGridSnippet = `/* FLEXBOX: uma dimensão (linha OU coluna) */
.toolbar {
  display: flex;
  flex-wrap: wrap;               /* permite quebrar para a linha de baixo */
  justify-content: space-between; /* alinha no eixo principal (horizontal) */
  align-items: center;           /* alinha no eixo cruzado (vertical) */
  gap: 1rem;                     /* espaço entre os itens */
}

/* GRID: duas dimensões (linhas E colunas ao mesmo tempo) */
.cards {
  display: grid;
  gap: 1rem;
  /* Cria quantas colunas de no mínimo 14rem (224px) couberem e
     reparte o espaço que sobrar entre elas (1fr). Sem media query! */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}`

export const gridMathSnippet = `// Quantas colunas cabem em um contêiner de largura W?
// n = floor( (W + gap) / (minimo + gap) )
const minimo = 14 * 16   // 14rem = 224px
const gap = 1 * 16       // 1rem = 16px

const colunas = (W) => Math.floor((W + gap) / (minimo + gap))

colunas(463) // 1
colunas(464) // 2  (224 + 16 + 224 = 464)
colunas(704) // 3  (224 + 16 + 224 + 16 + 224 = 704)`

export const imagesSnippet = `<!-- width e height: o navegador calcula a proporção (aspect-ratio)
     ANTES de baixar a imagem e já reserva o espaço. -->
<img
  src="paisagem-800.jpg"
  srcset="paisagem-400.jpg 400w, paisagem-800.jpg 800w, paisagem-1600.jpg 1600w"
  sizes="(min-width: 48rem) 50vw, 100vw"
  width="800" height="533"
  alt="Montanhas ao amanhecer"
  loading="lazy"
/>

<!-- Imagem principal da tela (LCP): NÃO use lazy; priorize o download -->
<img src="capa.jpg" width="1200" height="600" alt="Capa" fetchpriority="high" />

/* CSS */
img {
  max-width: 100%;  /* nunca passa da largura do pai */
  height: auto;     /* mantém a proporção; combina com width/height do HTML */
}

.thumb {
  aspect-ratio: 16 / 9;   /* caixa com proporção fixa */
  width: 100%;
  object-fit: cover;      /* preenche a caixa cortando o excesso */
}`

export const folderSnippet = `src/
  assets/        estilos globais (base.css, main.css) e imagens
  components/
    layout/      TheNavbar.vue, TheFooter.vue   (um por tela: prefixo "The")
    shared/      CodeSnippet.vue, SourceList.vue (reutilizados)
    labs/        componentes dos laboratórios
  data/          dados estáticos (sections.js)
  router/        index.js
  stores/        useUIStore.js, useApiStore.js  (Pinia)
  views/         uma tela por rota (Section1.vue, HomeView.vue)
  App.vue
  main.js`

export const propsSnippet = `<!-- CodeSnippet.vue: nome com mais de uma palavra (PascalCase) -->
<script setup>
// Props tipadas: tipo, obrigatoriedade e valor padrão
const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, default: 'css' },
})

// Eventos que o componente emite para o pai
const emit = defineEmits(['copy'])

const onClick = () => emit('copy', props.code)
</script>

<!-- No pai: dados descem por props, eventos sobem por @evento -->
<CodeSnippet :code="trecho" language="html" @copy="avisar" />`

export const keySnippet = `<!-- RUIM: sem :key (ou com o índice) o Vue reaproveita os elementos
     do DOM pela POSIÇÃO. O texto digitado fica "preso" à posição. -->
<li v-for="(animal, index) in animais" :key="index">
  {{ animal.nome }} <input type="text" />
</li>

<!-- BOM: :key único e estável identifica cada item. O Vue move/remove
     exatamente o elemento daquele item. -->
<li v-for="animal in animais" :key="animal.id">
  {{ animal.nome }} <input type="text" />
</li>`

export const tokensSnippet = `/* Design tokens: um único lugar para cores, espaços e fontes */
:root {
  --color-primary: #004a99;
  --color-surface: #ffffff;
  --space-md: 1rem;
  --text-lg: 1.125rem;
}

.card {
  /* Os componentes só consomem os tokens: mudar o tema = mudar o :root */
  background: var(--color-surface);
  padding: var(--space-md);
  border-left: 0.25rem solid var(--color-primary);
}`

export const lazyRouteSnippet = `// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/secao-1',
      // import() dinâmico: o arquivo da tela só é baixado ao visitar a rota,
      // o que reduz o JavaScript inicial e melhora o LCP.
      component: () => import('@/views/Section1.vue'),
    },
  ],
})`
