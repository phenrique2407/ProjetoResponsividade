<script setup>
// Laboratório: indicador fixo no canto da tela com a largura atual da janela
// e o breakpoint ativo. Redimensione a janela (ou gire o celular) e observe.
import { useUiStore } from '@/stores/useUIStore'

const uiStore = useUiStore()
</script>

<template>
  <aside class="tracker" aria-live="off" aria-label="Largura da janela e breakpoint ativo">
    <span class="tracker-width">{{ uiStore.windowWidth }} px</span>
    <span class="tracker-bp">{{ uiStore.breakpointLabel }}</span>
  </aside>
</template>

<style scoped>
.tracker {
  position: fixed;
  right: var(--space-sm);
  bottom: var(--space-sm);
  z-index: 60;
  display: flex;
  flex-direction: column;
  max-width: calc(100vw - 1rem);
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-code-bg);
  color: var(--color-code-text);
  border-left: 0.25rem solid var(--color-accent);
  border-radius: var(--radius);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.4;
  pointer-events: none;
}

.tracker-width {
  font-weight: 700;
  font-size: var(--text-sm);
}
</style>
