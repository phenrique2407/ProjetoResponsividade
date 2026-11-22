<script setup>
import { ref } from 'vue'

// Props tipadas: o Vue avisa no console se o tipo estiver errado
const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, default: 'css' },
  caption: { type: String, default: '' },
})

// Evento declarado: o componente pai pode ouvir @copy
const emit = defineEmits(['copy'])

const copied = ref(false)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    emit('copy', props.code)
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // Em páginas sem HTTPS a área de transferência pode estar bloqueada
    copied.value = false
  }
}
</script>

<template>
  <figure class="code-snippet">
    <figcaption class="code-head">
      <span>{{ caption || language }}</span>
      <button type="button" class="copy-btn" @click="copyCode">
        {{ copied ? 'Copiado' : 'Copiar' }}
      </button>
    </figcaption>
    <pre tabindex="0"><code>{{ code }}</code></pre>
  </figure>
</template>

<style scoped>
.code-snippet {
  background: var(--color-code-bg);
  border-radius: var(--radius);
  overflow: hidden;
  min-width: 0;
}

.code-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-xs) var(--space-md);
  background: var(--color-primary-dark);
  color: var(--color-code-text);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.copy-btn {
  min-height: 2rem;
  padding: 0 var(--space-sm);
  background: transparent;
  color: var(--color-code-text);
  border: 0.0625rem solid var(--color-code-text);
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
}

pre {
  padding: var(--space-md);
  white-space: pre-wrap; /* respeita as quebras e quebra linhas longas */
  overflow-wrap: anywhere;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.55;
  tab-size: 2;
  min-width: 0;
}

code {
  background: none;
  color: var(--color-code-text);
  padding: 0;
  font-size: inherit;
  white-space: inherit;
  overflow-wrap: inherit;
}
</style>
