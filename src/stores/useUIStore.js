import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Os breakpoints usam rem, igual às media queries do CSS. Assim o indicador
// sempre concorda com o que o CSS está realmente aplicando.
const BREAKPOINTS = [
  { key: 'lg', query: '(min-width: 64rem)', label: 'lg (a partir de 64rem = 1024px)' },
  { key: 'md', query: '(min-width: 48rem)', label: 'md (a partir de 48rem = 768px)' },
  { key: 'sm', query: '(min-width: 40rem)', label: 'sm (a partir de 40rem = 640px)' },
]

export const useUiStore = defineStore('ui', () => {
  // Estado
  const isMenuOpen = ref(false)
  const windowWidth = ref(window.innerWidth)
  const windowHeight = ref(window.innerHeight)
  const activeBreakpoint = ref({ key: 'base', label: 'base (celular, abaixo de 40rem)' })

  // Ações
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const updateWindow = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
    const match = BREAKPOINTS.find((bp) => window.matchMedia(bp.query).matches)
    activeBreakpoint.value = match ?? { key: 'base', label: 'base (celular, abaixo de 40rem)' }
  }

  // Getters
  const breakpointKey = computed(() => activeBreakpoint.value.key)
  const breakpointLabel = computed(() => activeBreakpoint.value.label)

  return {
    isMenuOpen,
    windowWidth,
    windowHeight,
    breakpointKey,
    breakpointLabel,
    toggleMenu,
    closeMenu,
    updateWindow,
  }
})
