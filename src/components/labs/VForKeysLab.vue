<script setup>
// Laboratório da Seção 5: o que muda quando o v-for tem :key estável.
// Os animais vêm da API (Pinia), então o laboratório também revisa o consumo de API.
import { ref, watch, onMounted } from 'vue'
import { useApiStore } from '@/stores/useApiStore'

const apiStore = useApiStore()
const items = ref([])

const resetList = () => {
  items.value = apiStore.animals.slice(0, 4).map((a) => ({ ...a }))
}

const removeFirstItem = () => {
  items.value.shift()
}

onMounted(async () => {
  await apiStore.fetchAnimals()
  resetList()
})

watch(() => apiStore.animals, resetList)
</script>

<template>
  <div class="lab-container">
    <h3>Laboratório: :key no v-for</h3>

    <ol class="steps">
      <li>Digite um texto no campo do <strong>segundo</strong> animal, nas duas listas.</li>
      <li>Clique em "Remover primeiro animal".</li>
      <li>Compare para qual animal o texto foi.</li>
    </ol>

    <p v-if="apiStore.isLoading" class="lab-hint">Carregando animais da API...</p>
    <p v-if="apiStore.error" class="lab-hint">{{ apiStore.error }}</p>

    <div class="lab-controls">
      <div class="btn-row">
        <button type="button" class="btn" :disabled="items.length === 0" @click="removeFirstItem">
          Remover primeiro animal
        </button>
        <button type="button" class="btn btn-outline" @click="resetList">Reiniciar</button>
      </div>
    </div>

    <div class="lists">
      <div class="list-box list-bad">
        <h4>Má prática: :key="index"</h4>
        <ul>
          <li v-for="(item, index) in items" :key="index">
            <span class="name">{{ item.name }}</span>
            <input type="text" :aria-label="`Anotação para ${item.name} (sem key estável)`" placeholder="Digite aqui" />
          </li>
        </ul>
      </div>

      <div class="list-box list-good">
        <h4>Boa prática: :key="item.id"</h4>
        <ul>
          <li v-for="item in items" :key="item.id">
            <span class="name">{{ item.name }}</span>
            <input type="text" :aria-label="`Anotação para ${item.name} (com key estável)`" placeholder="Digite aqui" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.steps {
  padding-left: 1.25rem;
  margin-bottom: var(--space-md);
  font-size: var(--text-sm);
}

.lists {
  display: grid;
  gap: var(--space-md);
}

.list-box {
  padding: var(--space-md);
  background: var(--color-bg);
  border-radius: var(--radius);
  min-width: 0;
}

.list-bad {
  border-top: 0.25rem solid var(--color-accent);
}

.list-good {
  border-top: 0.25rem solid var(--color-success);
}

h4 {
  margin-bottom: var(--space-sm);
  font-size: var(--text-base);
}

ul {
  list-style: none;
}

li {
  display: grid;
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
  padding: var(--space-sm);
  background: var(--color-surface);
  border: var(--border);
  border-radius: var(--radius);
}

.name {
  font-weight: 600;
}

@media (min-width: 48rem) {
  .lists {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
