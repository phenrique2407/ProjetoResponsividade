<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useUiStore } from '@/stores/useUIStore'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import WindowTracker from '@/components/labs/WindowTracker.vue'

const uiStore = useUiStore()

// Mantém a store sincronizada com o tamanho da janela
onMounted(() => {
  uiStore.updateWindow()
  window.addEventListener('resize', uiStore.updateWindow)
})

// Remove o listener para evitar vazamento de memória
onUnmounted(() => {
  window.removeEventListener('resize', uiStore.updateWindow)
})
</script>

<template>
  <div class="app-wrapper">
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

    <TheNavbar />

    <main id="conteudo" class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <TheFooter />

    <!-- Laboratório: indicador fixo de largura e breakpoint -->
    <WindowTracker />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

.main-content {
  flex: 1;
  width: 100%;
  padding: var(--space-lg) var(--space-md) var(--space-2xl);
}

.skip-link {
  position: absolute;
  left: var(--space-md);
  top: -4rem;
  z-index: 100;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-accent);
  color: var(--color-on-primary);
  border-radius: var(--radius);
}

.skip-link:focus {
  top: var(--space-sm);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 48rem) {
  .main-content {
    padding: var(--space-2xl) var(--space-xl) 4rem;
  }
}
</style>
