<template>
  <div class="lab-container">
    <h3>Laboratório: O Caos da :key</h3>
    <p>Escreva algo nos campos de texto abaixo e clique em "Remover Primeiro Item" para ver a diferença de comportamento.</p>
    
    <button class="action-btn" @click="removeFirstItem" :disabled="items.length === 0">
      Remover Primeiro Item
    </button>
    <button class="action-btn secondary" @click="resetList">Reiniciar</button>

    <div class="lists-wrapper">
      <div class="list-section">
        <h4> Má Prática (:key="index")</h4>
        <ul>
          <li v-for="(item, index) in items" :key="index">
            <span>{{ item.name }}</span>
            <input type="text" placeholder="Digite algo aqui..." />
          </li>
        </ul>
      </div>

      <div class="list-section">
        <h4> Boa Prática (:key="item.id")</h4>
        <ul>
          <li v-for="item in items" :key="item.id">
            <span>{{ item.name }}</span>
            <input type="text" placeholder="Digite algo aqui..." />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const initialItems = [
  { id: 1, name: 'Tarefa A' },
  { id: 2, name: 'Tarefa B' },
  { id: 3, name: 'Tarefa C' }
]

const items = ref([...initialItems])

const removeFirstItem = () => {
  items.value.shift()
}

const resetList = () => {
  items.value = [...initialItems]
}
</script>

<style scoped>
.lists-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1.5rem;
}
.list-section {
  background-color: var(--bg-secondary, #f4f4f5);
  padding: 1rem;
  border-radius: 0.5rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.action-btn {
  background-color: var(--primary-color, #42b883);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
.action-btn.secondary {
  background-color: #666;
}
/* Mobile-first: lado a lado em telas maiores */
@media (min-width: 768px) {
  .lists-wrapper {
    flex-direction: row;
  }
  .list-section {
    flex: 1;
  }
}
</style>