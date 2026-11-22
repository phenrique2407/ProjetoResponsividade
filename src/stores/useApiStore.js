import { defineStore } from 'pinia'
import { ref } from 'vue'

// Lista usada caso a API esteja fora do ar (o laboratório continua funcionando)
const FALLBACK_BREEDS = ['Beagle', 'Boxer', 'Husky', 'Poodle', 'Corgi']

export const useApiStore = defineStore('api', () => {
  // Estado
  const animals = ref([])
  const isLoading = ref(false)
  const error = ref('')

  // Ações
  const fetchAnimals = async () => {
    // Evita chamadas repetidas se os dados já foram carregados
    if (animals.value.length > 0 || isLoading.value) return

    isLoading.value = true
    error.value = ''

    try {
      // Consumo de API pública: lista de raças de cachorro (Dog API)
      const response = await fetch('https://dog.ceo/api/breeds/list/all')
      if (!response.ok) throw new Error(`Resposta inesperada (${response.status})`)

      const data = await response.json()

      // O nome da raça é único, então serve como id estável para o :key
      animals.value = Object.keys(data.message)
        .slice(0, 5)
        .map((breed) => ({
          id: breed,
          name: breed.charAt(0).toUpperCase() + breed.slice(1),
        }))
    } catch (err) {
      error.value = `Não foi possível carregar a API (${err.message}). Usando lista local.`
      animals.value = FALLBACK_BREEDS.map((name) => ({ id: name.toLowerCase(), name }))
    } finally {
      isLoading.value = false
    }
  }

  return { animals, isLoading, error, fetchAnimals }
})
