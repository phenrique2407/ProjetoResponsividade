<script setup>
import GuideSection from '@/components/shared/GuideSection.vue'
import CodeSnippet from '@/components/shared/CodeSnippet.vue'
import UnitConverterLab from '@/components/labs/UnitConverterLab.vue'
import { unitsSnippet } from '@/data/snippets'

const sources = [
  {
    label: 'MDN - CSS values and units',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units',
  },
  {
    label: 'MDN - length (unidades de comprimento)',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/length',
  },
  {
    label: 'MDN - Grid layout: flexible sizes with the fr unit',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex_value',
  },
  {
    label: 'W3C WAI - Understanding SC 1.4.4: Resize Text',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html',
  },
]

const units = [
  { name: 'px', type: 'Absoluta', use: 'Bordas finas, sombras e detalhes que não devem mudar.' },
  { name: 'rem', type: 'Relativa à fonte do html', use: 'Fontes, espaçamentos e tamanhos em geral.' },
  { name: 'em', type: 'Relativa à fonte do elemento', use: 'Componentes que escalam junto com o próprio texto (botões, ícones).' },
  { name: '%', type: 'Relativa ao pai', use: 'Larguras que acompanham o contêiner.' },
  { name: 'fr', type: 'Fração do espaço livre (Grid)', use: 'Repartir colunas e linhas do grid.' },
  { name: 'vw', type: '1% da largura da janela', use: 'Tipografia fluida e espaçamentos laterais.' },
  { name: 'vh', type: '1% da altura da janela', use: 'Seções de altura de tela; no celular pode cortar conteúdo.' },
  { name: 'dvh', type: '1% da altura dinâmica da janela', use: 'Altura de tela no celular, acompanhando a barra de endereço.' },
  { name: 'ch', type: 'Largura do caractere "0"', use: 'Limitar o comprimento de linhas de texto (ex.: 65ch).' },
]
</script>

<template>
  <GuideSection
    :number="2"
    title="Unidades CSS"
    lead="A unidade escolhida decide se o layout respeita ou ignora a tela e as preferências da pessoa."
    :sources="sources"
  >
    <template #explanation>
      <p>
        Unidades <strong>absolutas</strong>, como <code>px</code>, têm tamanho fixo. Unidades
        <strong>relativas</strong> dependem de outra medida: a fonte, o elemento pai, a janela ou o
        espaço livre do grid. Em layouts responsivos, as relativas se adaptam sozinhas.
      </p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Unidade</th>
              <th scope="col">Tipo</th>
              <th scope="col">Quando usar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in units" :key="u.name">
              <th scope="row">{{ u.name }}</th>
              <td>{{ u.type }}</td>
              <td>{{ u.use }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Regra prática: use <code>rem</code> para fontes e espaçamentos, <code>%</code>,
        <code>fr</code> e <code>ch</code> para larguras, <code>dvh</code> para alturas de tela no
        celular e <code>px</code> só para detalhes finos.
      </p>
    </template>

    <template #code>
      <CodeSnippet :code="unitsSnippet" language="css" caption="CSS - unidades em uso" />
    </template>

    <template #labs>
      <UnitConverterLab />
    </template>

    <template #question>
      <p>
        Uma pessoa com baixa visão aumenta o tamanho da fonte nas configurações do navegador. O
        texto definido em px continua do mesmo tamanho, e o definido em rem aumenta. Por que essa
        diferença acontece?
      </p>
    </template>

    <template #answer>
      <p>
        A configuração de tamanho de fonte do navegador muda o tamanho de fonte padrão do elemento
        raiz (<code>html</code>), que normalmente é 16px. Se a pessoa escolhe uma fonte maior, esse
        valor passa a ser, por exemplo, 24px.
      </p>
      <p>
        O <code>rem</code> é calculado como múltiplo desse tamanho raiz. Então
        <code>1rem</code> passa de 16px para 24px, e tudo que foi escrito em rem cresce junto.
      </p>
      <p>
        O <code>px</code> é uma unidade absoluta: o valor escrito pelo desenvolvedor é o valor
        final e não consulta o tamanho raiz. Por isso o texto em px ignora a preferência da pessoa,
        o que prejudica a acessibilidade. Ressalva: o zoom da página (Ctrl e +) aumenta tudo,
        inclusive px; a diferença aparece na configuração de tamanho de fonte.
      </p>
    </template>
  </GuideSection>
</template>
