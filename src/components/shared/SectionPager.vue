<script setup>
import { computed } from 'vue'
import { sections, challengePage } from '@/data/sections'

const props = defineProps({
  number: { type: Number, required: true },
})

// Seção anterior (ou Início) e próxima (ou Desafio)
const prev = computed(() =>
  props.number === 1
    ? { path: '/', title: 'Início' }
    : sections.find((s) => s.number === props.number - 1),
)
const next = computed(() =>
  props.number === sections.length
    ? { path: challengePage.path, title: challengePage.title }
    : sections.find((s) => s.number === props.number + 1),
)
</script>

<template>
  <nav class="pager" aria-label="Navegação entre seções">
    <router-link :to="prev.path" class="pager-link">
      <span class="pager-dir">Anterior</span>
      {{ prev.title }}
    </router-link>
    <router-link :to="next.path" class="pager-link pager-next">
      <span class="pager-dir">Próxima</span>
      {{ next.title }}
    </router-link>
  </nav>
</template>

<style scoped>
.pager {
  display: grid;
  gap: var(--space-md);
  margin-top: var(--space-2xl);
}

.pager-link {
  display: block;
  padding: var(--space-md);
  background: var(--color-surface);
  border: var(--border);
  border-radius: var(--radius);
  color: var(--color-primary-dark);
  font-weight: 600;
  text-decoration: none;
}

.pager-link:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
}

.pager-dir {
  display: block;
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--color-text-muted);
}

@media (min-width: 40rem) {
  .pager {
    grid-template-columns: 1fr 1fr;
  }

  .pager-next {
    text-align: right;
  }
}
</style>
