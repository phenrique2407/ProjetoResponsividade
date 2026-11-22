<script setup>
// Laboratório da Seção 2: conversor de unidades para px e simulação da
// configuração de fonte do navegador (px contra rem).
import { ref, computed } from 'vue'
import { useUiStore } from '@/stores/useUIStore'

const uiStore = useUiStore()

const value = ref(1.5)
const unit = ref('rem')
const rootFont = ref(16) // tamanho de fonte do <html> (configuração do navegador)
const parentFont = ref(16) // tamanho de fonte do elemento pai (para em)
const parentWidth = ref(400) // largura do pai em px (para %)

const units = ['px', 'rem', 'em', '%', 'vw', 'vh', 'dvh', 'ch']

// Cada unidade com a conta usada e o resultado em px
const result = computed(() => {
  const v = Number(value.value) || 0
  switch (unit.value) {
    case 'px':
      return { px: v, formula: `${v} x 1` }
    case 'rem':
      return { px: v * rootFont.value, formula: `${v} x ${rootFont.value}px (fonte do html)` }
    case 'em':
      return { px: v * parentFont.value, formula: `${v} x ${parentFont.value}px (fonte do pai)` }
    case '%':
      return { px: (v / 100) * parentWidth.value, formula: `${v}% de ${parentWidth.value}px (largura do pai)` }
    case 'vw':
      return { px: (v / 100) * uiStore.windowWidth, formula: `${v}% de ${uiStore.windowWidth}px (largura da janela)` }
    case 'vh':
    case 'dvh':
      return { px: (v / 100) * uiStore.windowHeight, formula: `${v}% de ${uiStore.windowHeight}px (altura da janela)` }
    case 'ch':
      // Aproximação: a largura do "0" costuma ficar perto de 0,5em
      return { px: v * 0.5 * parentFont.value, formula: `${v} x ~0,5 x ${parentFont.value}px (aprox.; depende da fonte)` }
    default:
      return { px: 0, formula: '' }
  }
})

const pxText = computed(() => Math.round(result.value.px * 100) / 100)
</script>

<template>
  <div class="lab-container">
    <h3>Laboratório: conversor de unidades</h3>
    <p class="lab-hint">
      Digite um valor, escolha a unidade e veja quantos pixels ele vira. O resultado depende do
      contexto (fonte do html, fonte do pai, largura do pai e tamanho da janela).
    </p>

    <div class="lab-controls">
      <div class="row">
        <label>
          Valor
          <input v-model.number="value" type="number" step="0.1" inputmode="decimal" />
        </label>
        <label>
          Unidade
          <select v-model="unit">
            <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
          </select>
        </label>
      </div>
      <div class="row">
        <label>
          Fonte do html (px)
          <input v-model.number="rootFont" type="number" min="8" max="48" />
        </label>
        <label>
          Fonte do pai (px)
          <input v-model.number="parentFont" type="number" min="8" max="48" />
        </label>
        <label>
          Largura do pai (px)
          <input v-model.number="parentWidth" type="number" min="1" max="3000" />
        </label>
      </div>
    </div>

    <p class="lab-result">
      <strong class="big">{{ value }}{{ unit }} = {{ pxText }} px</strong><br />
      Conta: {{ result.formula }}
      <template v-if="unit === 'dvh'">
        <br />No celular, dvh acompanha a barra de endereço que aparece e some; aqui ele vale o
        mesmo que vh.
      </template>
    </p>

    <h4 class="sub">Simulação: preferência de fonte do navegador</h4>
    <p class="lab-hint">
      Escolha o tamanho de fonte padrão que a pessoa configurou. O texto em px não muda; o texto
      em rem acompanha.
    </p>
    <div class="lab-controls">
      <label>
        Fonte padrão do navegador (px)
        <select v-model.number="rootFont">
          <option :value="16">16 (padrão)</option>
          <option :value="20">20</option>
          <option :value="24">24</option>
          <option :value="32">32</option>
        </select>
      </label>
    </div>
    <div class="samples">
      <p class="sample sample-px">font-size: 16px (continua 16px)</p>
      <p class="sample sample-rem" :style="{ fontSize: rootFont + 'px' }">
        font-size: 1rem (agora {{ rootFont }}px)
      </p>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: grid;
  gap: var(--space-md);
}

.big {
  font-size: var(--text-lg);
  overflow-wrap: anywhere;
}

.sub {
  margin-top: var(--space-lg);
  font-size: var(--text-base);
}

.samples {
  display: grid;
  gap: var(--space-sm);
}

.sample {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius);
  line-height: 1.3;
}

.sample-px {
  font-size: 16px;
  background: var(--color-accent-soft);
  border-left: 0.25rem solid var(--color-accent);
}

.sample-rem {
  background: var(--color-success-soft);
  border-left: 0.25rem solid var(--color-success);
}

@media (min-width: 40rem) {
  .row {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }
}
</style>
