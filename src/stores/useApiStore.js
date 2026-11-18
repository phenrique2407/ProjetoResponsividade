import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApiStore = defineStore('api', () => {
  // Estado
  const animals = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Ações
  const fetchAnimals = async () => {
    // Evita chamadas desnecessárias se já tivermos os dados
    if (animals.value.length > 0) return 

    isLoading.value = true
    error.value = null

    try {
      // Consumo de API pública (exemplo usando a Dog API para ir buscar raças)
      const response = await fetch('https://dog.ceo/api/breeds/list/all')
      
      if (!response.ok) {
        throw new Error('Erro ao carregar os dados da API.')
      }

      const data = await response.json()
      
      // Transforma o objeto de raças num array de objetos com ID único para usar no v-for
      animals.value = Object.keys(data.message)
        .slice(0, 10) // Limita a 10 resultados para o exemplo
        .map((breed, index) => ({
          id: crypto.randomUUID(), // Boa prática: gerar ID único
          name: breed.charAt(0).toUpperCase() + breed.slice(1),
          userInput: '' // Campo extra para testar o problema do v-for sem :key
        }))

    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    animals,
    isLoading,
    error,
    fetchAnimals
  }
})