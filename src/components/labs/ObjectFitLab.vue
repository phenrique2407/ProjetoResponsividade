<template>
  <div class="lab-container">
    <h3>Laboratório: Imagens e object-fit</h3>
    
    <div class="controls">
      <label>
        Largura do Contêiner: {{ boxWidth }}%
        <input type="range" v-model="boxWidth" min="20" max="100" />
      </label>
      <label>
        Altura do Contêiner: {{ boxHeight }}px
        <input type="range" v-model="boxHeight" min="100" max="400" />
      </label>
      <label>
        Propriedade object-fit:
        <select v-model="objectFitValue">
          <option value="cover">cover (corta o excesso)</option>
          <option value="contain">contain (mostra tudo, deixa barras)</option>
          <option value="fill">fill (estica e distorce)</option>
          <option value="scale-down">scale-down</option>
          <option value="none">none</option>
        </select>
      </label>
    </div>

    <div 
      class="image-container" 
      :style="{ width: boxWidth + '%', height: boxHeight + 'px' }"
    >
      <img 
        src="https://picsum.photos/600/400" 
        alt="Imagem de teste" 
        :style="{ objectFit: objectFitValue }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const boxWidth = ref(100)
const boxHeight = ref(250)
const objectFitValue = ref('cover')
</script>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: var(--bg-secondary, #f4f4f5);
  padding: 1rem;
  border-radius: 0.5rem;
}
.image-container {
  border: 4px dashed red;
  transition: all 0.3s ease;
  margin: 0 auto;
  overflow: hidden; /* Para garantir que object-fit: none não vaze do contêiner vermelho */
}
img {
  width: 100%;
  height: 100%;
  transition: object-fit 0.3s ease;
}
</style>