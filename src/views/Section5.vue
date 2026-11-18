<!-- views/Section5View.vue -->
<template>
  <main class="section-container">
    <h1>Boas práticas em projetos Vue</h1>
    
    <SectionAnswer>
      <template #question>
        Uma lista de animais é exibida com v-for, sem :key, e cada item tem um campo de texto. A pessoa digita algo no campo do segundo animal, e em seguida o primeiro animal é removido da lista. O que pode acontecer com o texto digitado, e por quê?
      </template>
      <template #answer>
        O texto digitado no segundo animal acabará sendo exibido no novo primeiro animal da lista. 
        Isso acontece porque, sem a `:key` exclusiva, o Vue utiliza um algoritmo de atualização (patch in-place) baseado apenas no índice do array. Ao invés de destruir e recriar os elementos DOM na ordem correta, ele apenas atualiza os dados visuais. Como o estado interno do DOM (o valor digitado no `<input>`) não está amarrado ao dado real, ele permanece na mesma posição física (índice 0), dessincronizando a interface do estado da aplicação[cite: 2].
      </template>
    </SectionAnswer>
  </main>
</template>

<script setup>
import SectionAnswer from '@/components/shared/SectionAnswer.vue'
</script>