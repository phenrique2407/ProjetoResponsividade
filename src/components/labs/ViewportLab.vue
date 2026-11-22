<script setup>
// Laboratório da Seção 1: o mesmo site, com e sem a meta viewport.
// Sem a meta, o celular monta a página em ~980px e reduz tudo para caber.
import { ref, computed, onMounted, onBeforeUnmount, useTemplateRef } from 'vue'

const VIRTUAL_WIDTH = 980
const deviceWidth = ref(360)

// Fator de redução aplicado pelo navegador quando NÃO há meta viewport
const scale = computed(() => deviceWidth.value / VIRTUAL_WIDTH)
const frameHeight = 15 // rem

// Reduz os dois aparelhos simulados para caberem na largura disponível
const host = useTemplateRef('host')
const available = ref(300)
const fit = computed(() => Math.min(1, available.value / (deviceWidth.value + 8)))
let observer = null
onMounted(() => {
  const update = () => (available.value = host.value.clientWidth)
  update()
  observer = new ResizeObserver(update)
  observer.observe(host.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="lab-container">
    <h3>Laboratório: com e sem a meta viewport</h3>
    <p class="lab-hint">
      Arraste para escolher a largura do aparelho. O mini-site usa uma regra de layout que muda
      em 37,5rem (600px) de largura: abaixo disso mostra o botão de menu e uma coluna; acima, os
      links e três colunas.
    </p>

    <div class="lab-controls">
      <label>
        Largura do aparelho: {{ deviceWidth }} px
        <input v-model.number="deviceWidth" type="range" min="280" max="480" step="1" />
      </label>
    </div>

    <div ref="host" class="host">
      <div class="frames">
        <div class="frame-col" :style="{ zoom: fit }">
          <p class="frame-title frame-bad">Sem meta viewport</p>
          <div
            class="frame"
            :style="{ width: deviceWidth + 'px', height: frameHeight + 'rem' }"
          >
            <!-- Página montada em 980px e depois reduzida -->
            <div class="mock-host" :style="{ width: VIRTUAL_WIDTH + 'px', transform: `scale(${scale})` }">
              <div class="mock">
                <div class="mock-bar">
                  <strong>Meu Site</strong>
                  <span class="mock-links">Início  Produtos  Contato</span>
                  <span class="mock-burger">Menu</span>
                </div>
                <p class="mock-text">Texto de exemplo da página.</p>
                <div class="mock-cards"><span>A</span><span>B</span><span>C</span></div>
              </div>
            </div>
          </div>
          <p class="lab-hint">Layout de {{ VIRTUAL_WIDTH }}px, reduzido a {{ Math.round(scale * 100) }}%.</p>
        </div>

        <div class="frame-col" :style="{ zoom: fit }">
          <p class="frame-title frame-good">Com meta viewport</p>
          <div
            class="frame"
            :style="{ width: deviceWidth + 'px', height: frameHeight + 'rem' }"
          >
            <div class="mock-host" :style="{ width: deviceWidth + 'px' }">
              <div class="mock">
                <div class="mock-bar">
                  <strong>Meu Site</strong>
                  <span class="mock-links">Início  Produtos  Contato</span>
                  <span class="mock-burger">Menu</span>
                </div>
                <p class="mock-text">Texto de exemplo da página.</p>
                <div class="mock-cards"><span>A</span><span>B</span><span>C</span></div>
              </div>
            </div>
          </div>
          <p class="lab-hint">Layout de {{ deviceWidth }}px, sem redução (100%).</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frames {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
}

.host {
  width: 100%;
}

.frame-title {
  margin-bottom: var(--space-xs);
  font-weight: 700;
  font-size: var(--text-sm);
}

.frame-bad {
  color: var(--color-accent);
}

.frame-good {
  color: var(--color-success);
}

.frame {
  position: relative;
  overflow: hidden;
  background: var(--color-surface);
  border: 0.1875rem solid var(--color-primary-dark);
  border-radius: 0.75rem;
}

.mock-host {
  transform-origin: top left;
}

/* Container query imita a media query do mini-site, avaliada na largura do mock-host */
.mock-host {
  container-type: inline-size;
}

.mock-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: var(--text-base);
}

.mock-links {
  display: none;
  white-space: pre;
}

.mock-burger {
  padding: 0.125rem 0.5rem;
  border: 0.0625rem solid var(--color-on-primary);
  border-radius: 0.25rem;
  font-size: var(--text-sm);
}

.mock-text {
  padding: var(--space-md);
}

.mock-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
  padding: 0 var(--space-md) var(--space-md);
}

.mock-cards span {
  padding: var(--space-md);
  background: var(--color-primary-soft);
  border-radius: 0.25rem;
  text-align: center;
  font-weight: 700;
}

@container (min-width: 37.5rem) {
  .mock-links {
    display: inline;
  }

  .mock-burger {
    display: none;
  }

  .mock-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
