<script setup>
// Laboratório da Seção 4: object-fit e aspect-ratio em uma caixa redimensionável.
import { ref } from 'vue'
import photo from '@/assets/lab-photo.svg'

const boxWidth = ref(100)
const boxHeight = ref(220)
const objectFitValue = ref('cover')
const useRatio = ref(false)
</script>

<template>
  <div class="lab-container">
    <h3>Laboratório: object-fit e aspect-ratio</h3>
    <p class="lab-hint">
      A imagem original tem proporção 3:2 e os cantos A, B, C e D. Mude a caixa (borda tracejada)
      e veja quais cantos são cortados em cada valor de object-fit.
    </p>

    <div class="lab-controls">
      <label>
        Largura da caixa: {{ boxWidth }}%
        <input v-model.number="boxWidth" type="range" min="20" max="100" />
      </label>
      <label>
        Altura da caixa: {{ boxHeight }}px
        <input v-model.number="boxHeight" type="range" min="80" max="360" :disabled="useRatio" />
      </label>
      <label class="check">
        <input v-model="useRatio" type="checkbox" />
        Usar aspect-ratio: 16 / 9 no lugar da altura
      </label>
      <label>
        object-fit
        <select v-model="objectFitValue">
          <option value="cover">cover (preenche e corta o excesso)</option>
          <option value="contain">contain (mostra tudo e deixa bordas vazias)</option>
          <option value="fill">fill (estica e distorce)</option>
          <option value="scale-down">scale-down (o menor entre none e contain)</option>
          <option value="none">none (tamanho original, sem ajuste)</option>
        </select>
      </label>
    </div>

    <div class="stage">
      <div
        class="image-box"
        :style="{
          width: boxWidth + '%',
          height: useRatio ? 'auto' : boxHeight + 'px',
          aspectRatio: useRatio ? '16 / 9' : 'auto',
        }"
      >
        <img
          :src="photo"
          alt="Imagem de teste com os cantos A, B, C e D"
          width="600"
          height="400"
          :style="{ objectFit: objectFitValue }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  padding: var(--space-sm);
  background: var(--color-bg);
  border-radius: var(--radius);
}

.image-box {
  margin-inline: auto;
  overflow: hidden; /* object-fit: none não vaza para fora da caixa */
  background: var(--color-surface);
  border: 0.1875rem dashed var(--color-primary);
  transition:
    width 0.2s ease,
    height 0.2s ease;
}

img {
  width: 100%;
  height: 100%;
}

.check {
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
}

.check input {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: var(--color-primary);
}
</style>
