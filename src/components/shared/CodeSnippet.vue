<template>
  <div class="code-snippet">
    <pre><code :class="language">{{ code }}</code></pre>
  </div>
</template>

<script setup>
defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'css'
  }
})
</script>

<style scoped>
.code-snippet {
  background-color: var(--code-bg);
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto; /* Evita quebra de layout */
}
</style>