<!-- views/Section3View.vue -->
<template>
  <main class="section-container">
    <h1>Flexbox e Grid</h1>
    
    <SectionAnswer>
      <template #question>
        Um contêiner usa grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem. A partir de qual largura do contêiner, em px, os cards deixam de ficar em 1 coluna e passam para 2? Considerem 1rem = 16px e mostrem a conta.
      </template>
      <template #answer>
        Para exibir 2 colunas, o contêiner precisa ter espaço para 2 cards de no mínimo 14rem e 1 espaço (gap) de 1rem entre eles.
        A conta em `rem` é: 14rem (coluna 1) + 1rem (gap) + 14rem (coluna 2) = 29rem.
        Convertendo para pixels (considerando 1rem = 16px): 29 * 16 = 464.
        Portanto, a partir de 464px, os cards passam para 2 colunas.
      </template>
    </SectionAnswer>
  </main>
</template>

<script setup>
import SectionAnswer from '@/components/shared/SectionAnswer.vue'
</script>