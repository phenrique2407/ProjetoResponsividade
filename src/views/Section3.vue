<script setup>
import GuideSection from '@/components/shared/GuideSection.vue'
import CodeSnippet from '@/components/shared/CodeSnippet.vue'
import LayoutBattleLab from '@/components/labs/LayoutBattleLab.vue'
import { flexGridSnippet, gridMathSnippet } from '@/data/snippets'

const sources = [
  {
    label: 'MDN - Flexbox',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox',
  },
  {
    label: 'MDN - Grids',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids',
  },
  {
    label: 'MDN - repeat() (auto-fit e auto-fill)',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/repeat',
  },
  {
    label: 'MDN - minmax()',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/minmax',
  },
  {
    label: 'CSS-Tricks - Auto-Sizing Columns in CSS Grid: auto-fill vs auto-fit',
    url: 'https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/',
  },
]
</script>

<template>
  <GuideSection
    :number="3"
    title="Flexbox e Grid"
    lead="Flexbox organiza itens em uma dimensão; Grid organiza em duas."
    :sources="sources"
  >
    <template #explanation>
      <p>
        <strong>Flexbox</strong> alinha itens em uma linha <em>ou</em> em uma coluna. É ótimo para
        barras de menu, grupos de botões e para centralizar algo. <strong>Grid</strong> controla
        linhas <em>e</em> colunas ao mesmo tempo, ideal para a estrutura da página e para galerias
        de cards.
      </p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Propriedade</th>
              <th scope="col">O que faz</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">justify-content</th>
              <td>Distribui os itens no eixo principal (em uma linha flex, na horizontal).</td>
            </tr>
            <tr>
              <th scope="row">align-items</th>
              <td>Alinha os itens no eixo cruzado (em uma linha flex, na vertical).</td>
            </tr>
            <tr>
              <th scope="row">flex-wrap</th>
              <td>Deixa os itens quebrarem para a próxima linha em vez de espremer.</td>
            </tr>
            <tr>
              <th scope="row">gap</th>
              <td>Espaço entre os itens, sem precisar de margens.</td>
            </tr>
            <tr>
              <th scope="row">repeat(auto-fit, minmax(14rem, 1fr))</th>
              <td>
                Cria quantas colunas de pelo menos 14rem couberem e divide o espaço restante entre
                elas. O grid vira responsivo sem media query.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Quando usar: Flexbox para componentes pequenos e alinhamento; Grid para o layout da página
        e para coleções de cards.
      </p>
    </template>

    <template #code>
      <CodeSnippet :code="flexGridSnippet" language="css" caption="CSS - Flexbox e Grid" />
      <CodeSnippet :code="gridMathSnippet" language="javascript" caption="JavaScript - quantas colunas cabem" />
    </template>

    <template #labs>
      <LayoutBattleLab />
    </template>

    <template #question>
      <p>
        Um contêiner usa <code>grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))</code> e
        <code>gap: 1rem</code>. A partir de qual largura do contêiner, em px, os cards deixam de
        ficar em 1 coluna e passam para 2? Considerem 1rem = 16px e mostrem a conta.
      </p>
    </template>

    <template #answer>
      <p>
        Cada coluna precisa de no mínimo 14rem. Para caberem duas colunas, o contêiner precisa
        acomodar dois cards e o gap entre eles:
      </p>
      <p>
        14rem + 1rem + 14rem = <strong>29rem</strong>
      </p>
      <p>
        Em pixels: 14rem = 14 x 16 = 224px e 1rem = 16px, então 224 + 16 + 224 =
        <strong>464px</strong>. Com 463px só cabe uma coluna; a partir de <strong>464px</strong> os
        cards passam para 2 colunas. Dá para conferir no laboratório acima, nos botões de 463 e 464.
      </p>
      <p>
        Fórmula geral: colunas = piso de (largura + gap) / (mínimo + gap). Para 3 colunas:
        3 x 224 + 2 x 16 = 704px.
      </p>
    </template>
  </GuideSection>
</template>
