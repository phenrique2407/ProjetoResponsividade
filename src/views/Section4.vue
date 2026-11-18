<!-- views/Section4View.vue -->
<template>
  <main class="section-container">
    <h1>Imagens responsivas</h1>
    
    <SectionAnswer>
      <template #question>
        Ao abrir uma página, o texto aparece primeiro. Quando a imagem termina de carregar, ela empurra o texto para baixo. Por que isso acontece quando a imagem não tem width e height no HTML? Qual métrica do Google mede esse problema?
      </template>
      <template #answer>
        Isso ocorre porque, sem os atributos `width` e `height`, o navegador não sabe qual será a proporção da imagem e não reserva espaço na tela durante o carregamento. Quando a imagem finalmente baixa e suas dimensões são descobertas, o navegador precisa recalcular o layout e "empurrar" o conteúdo abaixo, causando um solavanco visual. 
        A métrica do Google (Core Web Vitals) que mede essas mudanças inesperadas de layout é o CLS (Cumulative Layout Shift).
      </template>
    </SectionAnswer>
  </main>
</template>

<script setup>
import SectionAnswer from '@/components/shared/SectionAnswer.vue'
</script>