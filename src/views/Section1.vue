<script setup>
import GuideSection from '@/components/shared/GuideSection.vue'
import CodeSnippet from '@/components/shared/CodeSnippet.vue'
import ViewportLab from '@/components/labs/ViewportLab.vue'
import { viewportSnippet, mobileFirstSnippet } from '@/data/snippets'

const sources = [
  {
    label: 'MDN - Using the viewport meta tag',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag',
  },
  {
    label: 'MDN - Responsive design (Aprenda desenvolvimento web)',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design',
  },
  {
    label: 'MDN - Using media queries',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries',
  },
  {
    label: 'web.dev - Responsive web design basics',
    url: 'https://web.dev/articles/responsive-web-design-basics',
  },
]
</script>

<template>
  <GuideSection
    :number="1"
    title="Por que responsividade importa"
    lead="Uma página responsiva se adapta ao tamanho de qualquer tela, do celular pequeno ao monitor grande."
    :sources="sources"
  >
    <template #explanation>
      <p>
        As pessoas acessam sites por celulares, tablets, notebooks e TVs. Cada aparelho tem uma
        largura diferente, de cerca de 320px até mais de 2000px. Se a página só funciona em uma
        delas, quem usa as outras precisa dar zoom, rolar para os lados ou desiste de ler.
      </p>
      <p>Para uma página funcionar em qualquer tela, três ideias trabalham juntas:</p>
      <ul>
        <li>
          <strong>Meta viewport:</strong> uma linha no HTML que diz ao celular para usar a largura
          real da tela.
        </li>
        <li>
          <strong>Media queries:</strong> regras de CSS que só valem a partir de certa largura.
        </li>
        <li>
          <strong>Mobile-first:</strong> escrever primeiro o CSS do celular e usar
          <code>min-width</code> para acrescentar regras nas telas maiores.
        </li>
      </ul>
      <p>
        O navegador do celular trabalha com dois tamanhos: o da tela física e o do
        <em>viewport de layout</em>, a largura usada para montar a página. Sem a meta viewport, o
        celular assume que o site é antigo e usa um viewport de layout de aproximadamente 980px.
      </p>
    </template>

    <template #code>
      <CodeSnippet :code="viewportSnippet" language="html" caption="HTML - meta viewport" />
      <CodeSnippet :code="mobileFirstSnippet" language="css" caption="CSS - mobile-first" />
    </template>

    <template #labs>
      <ViewportLab />
      <p class="lab-hint">
        Outro laboratório está sempre visível: o indicador no canto inferior direito mostra a
        largura da janela e o breakpoint ativo. Redimensione a janela do navegador para vê-lo mudar.
      </p>
    </template>

    <template #question>
      <p>
        Um site tem media queries bem escritas, mas não tem a meta tag viewport. No celular, ele
        aparece como a versão de computador, só que minúscula. Por que isso acontece, e o que a meta
        viewport muda?
      </p>
    </template>

    <template #answer>
      <p>
        Sem a meta viewport, o navegador do celular não sabe que a página foi pensada para telas
        pequenas. Por segurança, ele monta a página em um viewport de layout virtual de cerca de
        980px, como se fosse um computador, e depois reduz tudo (zoom out) para caber na largura
        física do aparelho. Por isso a página aparece como a versão de desktop, só que minúscula.
      </p>
      <p>
        As media queries são avaliadas em cima dessa largura virtual de 980px, e não da largura
        real da tela. Uma regra como <code>@media (max-width: 600px)</code> nunca dispara, mesmo
        que o código esteja correto.
      </p>
      <p>
        Com <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>,
        a largura do viewport de layout passa a ser a largura do aparelho em pixels CSS (por
        exemplo, 390px) e o zoom inicial fica em 100%. Assim o layout é montado no tamanho real, as
        media queries passam a valer e o texto fica legível sem zoom.
      </p>
    </template>
  </GuideSection>
</template>
