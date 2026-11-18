<template>
  <div class="app-wrapper">
    <!-- Cabeçalho de Navegação Global -->
    <TheNavbar />

    <!-- Conteúdo Principal das Rotas -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Indicador Global de Breakpoint (Laboratório 3) -->
    <WindowTracker />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useUiStore } from '@/stores/UseUIStore'
import TheNavbar from '@/components/layout/TheNavbar.vue'


const uiStore = useUiStore()

// Função para atualizar a store sempre que a janela for redimensionada
const handleResize = () => {
  uiStore.updateWindowWidth()
}

// Registar os event listeners quando a aplicação é montada
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// Limpar os event listeners para evitar fugas de memória (memory leaks)
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Estilos estruturais globais que afetam a raiz do layout */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-primary, #ffffff);
  color: var(--text-primary, #333333);
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Transição suave entre as secções do guia */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>