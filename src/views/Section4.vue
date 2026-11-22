<script setup>
import GuideSection from '@/components/shared/GuideSection.vue'
import CodeSnippet from '@/components/shared/CodeSnippet.vue'
import ImageShiftLab from '@/components/labs/ImageShiftLab.vue'
import ObjectFitLab from '@/components/labs/ObjectFitLab.vue'
import { imagesSnippet } from '@/data/snippets'

const sources = [
  {
    label: 'MDN - Responsive images',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images',
  },
  {
    label: 'MDN - Lazy loading',
    url: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading',
  },
  {
    label: 'MDN - aspect-ratio',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio',
  },
  {
    label: 'MDN - object-fit',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit',
  },
  {
    label: 'web.dev - Cumulative Layout Shift (CLS)',
    url: 'https://web.dev/articles/cls',
  },
  {
    label: 'web.dev - Optimize Cumulative Layout Shift',
    url: 'https://web.dev/articles/optimize-cls',
  },
]
</script>

<template>
  <GuideSection
    :number="4"
    title="Imagens responsivas"
    lead="Imagens que se ajustam à tela, não pulam o layout e carregam só o necessário."
    :sources="sources"
  >
    <template #explanation>
      <ul>
        <li>
          <strong><code>max-width: 100%</code> e <code>height: auto</code>:</strong> a imagem nunca
          passa da largura do pai e mantém a proporção.
        </li>
        <li>
          <strong><code>width</code> e <code>height</code> no HTML:</strong> informam a proporção
          antes do download, e o navegador reserva o espaço. Evita que o texto pule.
        </li>
        <li>
          <strong><code>loading="lazy"</code>:</strong> adia o download de imagens fora da tela. Não
          use na imagem principal da página (a que aparece de cara), porque atrasa o LCP.
        </li>
        <li>
          <strong><code>aspect-ratio</code>:</strong> define a proporção de uma caixa (ex.:
          16 / 9).
        </li>
        <li>
          <strong><code>object-fit</code>:</strong> diz como a imagem preenche a caixa:
          <code>cover</code> corta o excesso, <code>contain</code> mostra tudo e deixa bordas,
          <code>fill</code> estica.
        </li>
        <li>
          <strong><code>srcset</code> e <code>sizes</code>:</strong> oferecem várias versões da
          imagem para o navegador escolher a mais adequada à tela, economizando dados no celular.
        </li>
      </ul>
    </template>

    <template #code>
      <CodeSnippet :code="imagesSnippet" language="html" caption="HTML e CSS - imagens responsivas" />
    </template>

    <template #labs>
      <ImageShiftLab />
      <ObjectFitLab />
    </template>

    <template #question>
      <p>
        Ao abrir uma página, o texto aparece primeiro. Quando a imagem termina de carregar, ela
        empurra o texto para baixo. Por que isso acontece quando a imagem não tem width e height no
        HTML? Qual métrica do Google mede esse problema?
      </p>
    </template>

    <template #answer>
      <p>
        O navegador monta a página enquanto baixa os arquivos. Sem <code>width</code> e
        <code>height</code> no HTML, ele não sabe o tamanho nem a proporção da imagem até receber os
        primeiros bytes dela, então não reserva espaço: a caixa da imagem começa com altura zero e o
        texto é desenhado no topo.
      </p>
      <p>
        Quando a imagem chega, o navegador descobre as dimensões, recalcula o layout e empurra o
        texto para baixo. Esse salto inesperado é um <em>layout shift</em>. Com as dimensões no
        HTML, o navegador calcula a proporção antes do download, reserva o espaço e o texto não se
        move (confira no laboratório de imagem com atraso).
      </p>
      <p>
        A métrica do Google que mede isso é o <strong>CLS (Cumulative Layout Shift)</strong>, uma
        das Core Web Vitals. O valor considerado bom é de até 0,1.
      </p>
    </template>
  </GuideSection>
</template>
