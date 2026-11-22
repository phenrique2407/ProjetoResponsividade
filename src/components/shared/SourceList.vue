<script setup>
defineProps({
  // Cada fonte: { label: 'Título', url: 'https://...' }
  sources: { type: Array, required: true },
})
</script>

<template>
  <ul class="source-list">
    <li v-for="source in sources" :key="source.url">
      <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }}</a>
    </li>
  </ul>
</template>

<style scoped>
.source-list {
  padding-left: 1.25rem;
  font-size: var(--text-sm);
}

.source-list li + li {
  margin-top: var(--space-xs);
}

a {
  overflow-wrap: anywhere;
}
</style>
