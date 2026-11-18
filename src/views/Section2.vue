<!-- views/Section2View.vue -->
<template>
  <main class="section-container">
    <h1>Unidades CSS</h1>
    
    <SectionAnswer>
      <template #question>
        Uma pessoa com baixa visão aumenta o tamanho da fonte nas configurações do navegador. O texto definido em px continua do mesmo tamanho, e o definido em rem aumenta. Por que essa diferença acontece?
      </template>
      <template #answer>
        O `px` é uma unidade absoluta de tela; ele possui um tamanho fixo e ignora totalmente as preferências de acessibilidade definidas pelo usuário no navegador. 
        O `rem`, por outro lado, é uma unidade relativa atrelada ao tamanho da fonte raiz (`root`) do navegador. Se o usuário alterar a configuração padrão de 16px para 24px, todos os elementos dimensionados em `rem` crescerão proporcionalmente, garantindo a acessibilidade.
      </template>
    </SectionAnswer>
  </main>
</template>

<script setup>
import SectionAnswer from '@/components/shared/SectionAnswer.vue'
</script>