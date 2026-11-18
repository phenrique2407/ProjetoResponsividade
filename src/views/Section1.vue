<!-- views/Section1View.vue -->
<template>
  <main class="section-container">
    <h1>Por que responsividade importa</h1>
    
    <!-- Explicação e Código iriam aqui -->

    <SectionAnswer>
      <template #question>
        Um site tem media queries bem escritas, mas não tem a meta tag viewport. No celular, ele aparece como a versão de computador, só que minúscula. Por que isso acontece, e o que a meta viewport muda?
      </template>
      <template #answer>
        Isso acontece porque, sem a tag viewport, os navegadores mobile assumem que a página não é otimizada para telas pequenas e a renderizam em uma largura virtual de desktop (geralmente 980px), aplicando um "zoom out" para caber na tela. 
        A `meta viewport` (`<meta name="viewport" content="width=device-width, initial-scale=1.0">`) instrui o navegador a igualar a largura da área de renderização à largura física do dispositivo, permitindo que as media queries funcionem corretamente.
      </template>
    </SectionAnswer>
  </main>
</template>

<script setup>
import SectionAnswer from '@/components/shared/SectionAnswer.vue'
</script>