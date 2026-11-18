import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // Estado
  const isMenuOpen = ref(false)
  const windowWidth = ref(window.innerWidth)

  // Ações
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth
  }

  // Getters (Computeds)
  const currentBreakpoint = computed(() => {
    if (windowWidth.value < 768) return 'Mobile'
    if (windowWidth.value < 1024) return 'Tablet'
    return 'Desktop'
  })

  return {
    isMenuOpen,
    windowWidth,
    toggleMenu,
    closeMenu,
    updateWindowWidth,
    currentBreakpoint
  }
})