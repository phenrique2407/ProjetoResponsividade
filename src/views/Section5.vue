<script setup>
import GuideSection from '@/components/shared/GuideSection.vue'
import CodeSnippet from '@/components/shared/CodeSnippet.vue'
import VForKeysLab from '@/components/labs/VForKeysLab.vue'
import {
  folderSnippet,
  propsSnippet,
  keySnippet,
  tokensSnippet,
  lazyRouteSnippet,
} from '@/data/snippets'

const sources = [
  {
    label: 'Vue.js - Lists: maintaining state with key',
    url: 'https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key',
  },
  { label: 'Vue.js - Props', url: 'https://vuejs.org/guide/components/props.html' },
  { label: 'Vue.js - Component events', url: 'https://vuejs.org/guide/components/events.html' },
  { label: 'Vue.js - Style Guide', url: 'https://vuejs.org/style-guide/' },
  {
    label: 'Vue Router - Lazy loading routes',
    url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html',
  },
  { label: 'web.dev - Web Vitals', url: 'https://web.dev/articles/vitals' },
  {
    label: 'MDN - Using CSS custom properties (variables)',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties',
  },
]

const vitals = [
  { sigla: 'LCP', nome: 'Largest Contentful Paint', mede: 'Tempo até o maior elemento visível aparecer.', meta: 'até 2,5 s' },
  { sigla: 'INP', nome: 'Interaction to Next Paint', mede: 'Rapidez com que a página responde a cliques e toques.', meta: 'até 200 ms' },
  { sigla: 'CLS', nome: 'Cumulative Layout Shift', mede: 'Quanto o conteúdo se desloca sem aviso.', meta: 'até 0,1' },
]
</script>

<template>
  <GuideSection
    :number="5"
    title="Boas práticas em projetos Vue"
    lead="Organização, componentes previsíveis e desempenho medido."
    :sources="sources"
  >
    <template #explanation>
      <ul>
        <li>
          <strong>Estrutura de pastas:</strong> separe layout, componentes compartilhados,
          laboratórios, stores, rotas e views.
        </li>
        <li>
          <strong>Nomes de componentes:</strong> PascalCase e com mais de uma palavra
          (<code>CodeSnippet</code>), para não conflitar com tags HTML. Componentes únicos por tela
          levam o prefixo <code>The</code> (<code>TheNavbar</code>).
        </li>
        <li>
          <strong>Props tipadas e eventos:</strong> dados descem do pai por props com tipo; avisos
          sobem para o pai por eventos declarados em <code>defineEmits</code>.
        </li>
        <li>
          <strong><code>:key</code> no <code>v-for</code>:</strong> um identificador único e estável
          por item, para o Vue saber qual elemento do DOM pertence a qual dado.
        </li>
        <li>
          <strong>Variáveis CSS como design tokens:</strong> cores, espaços e fontes definidos uma
          vez no <code>:root</code> e reutilizados em todo o projeto.
        </li>
        <li>
          <strong>Rotas sob demanda:</strong> <code>() =&gt; import(...)</code> faz cada tela virar
          um arquivo separado, baixado só quando necessário.
        </li>
      </ul>

      <h3>Core Web Vitals</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Sigla</th>
              <th scope="col">Mede</th>
              <th scope="col">Bom</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="v in vitals" :key="v.sigla">
              <th scope="row">{{ v.sigla }}</th>
              <td>{{ v.nome }}: {{ v.mede }}</td>
              <td>{{ v.meta }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template #code>
      <CodeSnippet :code="folderSnippet" language="text" caption="Estrutura de pastas" />
      <CodeSnippet :code="propsSnippet" language="vue" caption="Vue - props tipadas e eventos" />
      <CodeSnippet :code="keySnippet" language="vue" caption="Vue - :key no v-for" />
      <CodeSnippet :code="tokensSnippet" language="css" caption="CSS - design tokens" />
      <CodeSnippet :code="lazyRouteSnippet" language="javascript" caption="Vue Router - rota sob demanda" />
    </template>

    <template #labs>
      <VForKeysLab />
    </template>

    <template #question>
      <p>
        Uma lista de animais é exibida com v-for, sem :key, e cada item tem um campo de texto. A
        pessoa digita algo no campo do segundo animal, e em seguida o primeiro animal é removido da
        lista. O que pode acontecer com o texto digitado, e por quê?
      </p>
    </template>

    <template #answer>
      <p>
        O texto digitado pode ficar no lugar errado. Suponha os animais A, B e C, com o texto escrito
        no campo de B. Ao remover A, o texto <strong>não acompanha o B</strong>: ele permanece no
        segundo campo da tela, que agora pertence ao C. O B passa a aparecer com o campo vazio.
      </p>
      <p>
        Sem <code>:key</code> (ou com o índice como key), o Vue usa a estratégia de atualização no
        mesmo lugar (<em>in-place patch</em>): ele compara as listas por posição e reaproveita os
        elementos do DOM. Ao remover o primeiro item, o primeiro elemento passa a mostrar o nome do
        B, o segundo passa a mostrar o nome do C, e o último elemento é descartado. Só o nome é
        atualizado. O que foi digitado no <code>&lt;input&gt;</code> é estado do próprio elemento do
        DOM, não do dado, então fica onde estava.
      </p>
      <p>
        Com <code>:key="animal.id"</code>, cada elemento fica ligado ao seu animal; o Vue remove
        exatamente o elemento do A e o texto do B continua com o B.
      </p>
    </template>
  </GuideSection>
</template>
