<script setup>
// Laboratório da Seção 3: Flexbox contra Grid, com largura do contêiner em px.
// O grid usa repeat(auto-fit, minmax(14rem, 1fr)) e gap de 1rem, como na pergunta-guia.
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, useTemplateRef } from 'vue'

const layoutMode = ref('grid')
const areaWidth = ref(320) // largura do contêiner em px
const columns = ref(1)
const areaEl = useTemplateRef('area')
const stageEl = useTemplateRef('stage')

// Se o contêiner simulado for maior que o espaço da tela, ele é reduzido
// visualmente (zoom) para caber, sem criar rolagem horizontal. O layout interno
// continua sendo calculado na largura escolhida (ex.: 464px).
const available = ref(320)
const fit = computed(() => Math.min(1, available.value / areaWidth.value))
let observer = null

// Conta quantas colunas existem de verdade na primeira linha
const measureColumns = () => {
  const el = areaEl.value
  if (!el) return
  const tops = [...el.children].map((c) => c.offsetTop)
  columns.value = tops.filter((t) => t === tops[0]).length
}

watch([areaWidth, layoutMode], () => nextTick(measureColumns), { flush: 'post' })
onMounted(() => {
  const update = () => {
    // 2 * 8px de padding + 2px de borda do palco
    available.value = Math.max(100, stageEl.value.clientWidth - 18)
    measureColumns()
  }
  update()
  observer = new ResizeObserver(update)
  observer.observe(stageEl.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="lab-container">
    <h3>Laboratório: Flexbox e Grid</h3>
    <p class="lab-hint">
      Mude a largura do contêiner e observe quando o número de colunas muda. Os dois modos usam
      14rem (224px) como largura mínima e 1rem (16px) de gap.
    </p>

    <div class="lab-controls">
      <div class="btn-row">
        <button
          type="button"
          class="btn btn-outline"
          :class="{ 'is-active': layoutMode === 'grid' }"
          @click="layoutMode = 'grid'"
        >
          Modo Grid
        </button>
        <button
          type="button"
          class="btn btn-outline"
          :class="{ 'is-active': layoutMode === 'flex' }"
          @click="layoutMode = 'flex'"
        >
          Modo Flexbox
        </button>
      </div>

      <label>
        Largura do contêiner: {{ areaWidth }} px
        <input v-model.number="areaWidth" type="range" min="224" max="720" step="1" />
      </label>

      <div class="btn-row">
        <button type="button" class="btn btn-outline" @click="areaWidth = 463">463 px</button>
        <button type="button" class="btn btn-outline" @click="areaWidth = 464">464 px</button>
      </div>
    </div>

    <p class="lab-result">
      Colunas na primeira linha: <strong>{{ columns }}</strong>
      <br />
      Observe a última linha: no Flexbox os itens que sobram crescem para preencher o espaço; no
      Grid eles mantêm o alinhamento das colunas.
    </p>

    <div ref="stage" class="stage">
      <p v-if="fit < 1" class="lab-hint">
        Tela estreita: o contêiner está reduzido a {{ Math.round(fit * 100) }}% para caber. A
        largura e a contagem de colunas continuam reais.
      </p>
      <div
        ref="area"
        class="layout-area"
        :class="layoutMode"
        :style="{ width: areaWidth + 'px', zoom: fit }"
      >
        <div v-for="n in 5" :key="n" class="card">Card {{ n }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  margin-top: var(--space-md);
  padding: var(--space-sm);
  background: var(--color-bg);
  border: 0.0625rem dashed var(--color-primary);
  border-radius: var(--radius);
}

.layout-area {
  flex: none;
  gap: 1rem;
}

.card {
  padding: var(--space-lg) var(--space-md);
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: var(--radius);
  text-align: center;
  font-weight: 600;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

.flex .card {
  flex: 1 1 14rem; /* cresce, encolhe e parte de 14rem */
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}
</style>
