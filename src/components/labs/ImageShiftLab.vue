<script setup>
// Laboratório da Seção 4: imagem que demora a carregar.
// À esquerda sem width/height; à direita com width/height no HTML.
import { ref, onBeforeUnmount, useTemplateRef } from 'vue'
import photo from '@/assets/lab-photo.svg'

const loaded = ref(false)
const loading = ref(false)
const shiftWithout = ref(null)
const shiftWith = ref(null)
const textWithout = useTemplateRef('textWithout')
const textWith = useTemplateRef('textWith')
let timer = null

const DELAY_MS = 2000

const startLoad = () => {
  loaded.value = false
  loading.value = true
  shiftWithout.value = null
  shiftWith.value = null

  // Posição do texto ANTES de a imagem chegar
  const beforeWithout = textWithout.value.offsetTop
  const beforeWith = textWith.value.offsetTop

  clearTimeout(timer)
  timer = setTimeout(() => {
    loaded.value = true // a imagem "termina de baixar"
    loading.value = false
    requestAnimationFrame(() => {
      shiftWithout.value = Math.round(textWithout.value.offsetTop - beforeWithout)
      shiftWith.value = Math.round(textWith.value.offsetTop - beforeWith)
    })
  }, DELAY_MS)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="lab-container">
    <h3>Laboratório: imagem com atraso e deslocamento de layout</h3>
    <p class="lab-hint">
      Clique no botão: a imagem demora {{ DELAY_MS / 1000 }} segundos para chegar. Veja o que
      acontece com o texto abaixo dela.
    </p>

    <div class="lab-controls">
      <button type="button" class="btn" :disabled="loading" @click="startLoad">
        {{ loading ? 'Carregando...' : 'Carregar imagem' }}
      </button>
    </div>

    <div class="panels">
      <div class="panel panel-bad">
        <h4>Sem width e height</h4>
        <p>Texto antes da imagem.</p>
        <img :src="loaded ? photo : undefined" :alt="loaded ? 'Paisagem de teste' : ''" />
        <p ref="textWithout" class="after">Texto depois da imagem.</p>
        <p v-if="shiftWithout !== null" class="shift shift-bad">
          O texto foi empurrado {{ shiftWithout }} px.
        </p>
      </div>

      <div class="panel panel-good">
        <h4>Com width="600" height="400"</h4>
        <p>Texto antes da imagem.</p>
        <img
          :src="loaded ? photo : undefined"
          :alt="loaded ? 'Paisagem de teste' : ''"
          width="600"
          height="400"
        />
        <p ref="textWith" class="after">Texto depois da imagem.</p>
        <p v-if="shiftWith !== null" class="shift shift-good">
          O texto foi empurrado {{ shiftWith }} px.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panels {
  display: grid;
  gap: var(--space-md);
}

.panel {
  padding: var(--space-md);
  background: var(--color-bg);
  border-radius: var(--radius);
  min-width: 0;
}

.panel-bad {
  border-top: 0.25rem solid var(--color-accent);
}

.panel-good {
  border-top: 0.25rem solid var(--color-success);
}

h4 {
  margin-bottom: var(--space-sm);
  font-size: var(--text-base);
}

img {
  /* As duas imagens têm o mesmo CSS; a única diferença é o HTML */
  max-width: 100%;
  height: auto;
  margin-block: var(--space-sm);
}

.after {
  font-weight: 600;
}

.shift {
  margin-top: var(--space-sm);
  padding: var(--space-sm);
  border-radius: var(--radius);
  font-size: var(--text-sm);
  font-weight: 600;
}

.shift-bad {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.shift-good {
  background: var(--color-success-soft);
  color: var(--color-success);
}

@media (min-width: 48rem) {
  .panels {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
