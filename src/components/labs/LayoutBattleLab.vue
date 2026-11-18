<template>
  <div class="lab-container">
    <h3>Laboratório: Flexbox vs. CSS Grid</h3>
    
    <div class="controls">
      <div class="button-group">
        <button 
          :class="['mode-btn', { active: layoutMode === 'flex' }]" 
          @click="layoutMode = 'flex'"
        >
          Modo Flexbox
        </button>
        <button 
          :class="['mode-btn', { active: layoutMode === 'grid' }]" 
          @click="layoutMode = 'grid'"
        >
          Modo Grid
        </button>
      </div>
      
      <label class="slider-label">
        Largura da Área: {{ areaWidth }}%
        <input type="range" v-model="areaWidth" min="30" max="100" />
      </label>
    </div>

    <p class="hint">
      <strong>Observe a última linha:</strong> No Flexbox, os itens "órfãos" crescem para preencher o espaço. No Grid, eles mantêm o alinhamento estrito das colunas.
    </p>

    <div 
      class="layout-area" 
      :class="layoutMode" 
      :style="{ width: areaWidth + '%' }"
    >
      <div class="card" v-for="n in 5" :key="n">
        Card {{ n }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const layoutMode = ref('flex')
const areaWidth = ref(100)
</script>

<style scoped>
.controls {
  margin-bottom: 1rem;
}
.button-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.mode-btn {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 0.25rem;
}
.mode-btn.active {
  background-color: var(--primary-color, #42b883);
  color: white;
  border-color: var(--primary-color, #42b883);
}
.hint {
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  color: var(--text-secondary, #666);
}
.layout-area {
  background-color: var(--bg-secondary, #f4f4f5);
  padding: 1rem;
  border: 2px solid #ccc;
  transition: width 0.3s ease;
  margin: 0 auto;
}
.card {
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem;
  text-align: center;
  border-radius: 0.25rem;
}

/* O Segredo do Laboratório */
.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.flex .card {
  flex: 1 1 150px; /* Cresce e encolhe, com base de 150px */
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}
/* No grid, não precisamos de flex no filho */
</style>