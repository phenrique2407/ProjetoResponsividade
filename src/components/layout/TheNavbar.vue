<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/useUIStore'
import { sections, challengePage } from '@/data/sections'

const uiStore = useUiStore()
const route = useRoute()

// Fecha o menu sempre que a rota mudar
watch(
  () => route.path,
  () => uiStore.closeMenu(),
)
</script>

<template>
  <header class="navbar" @keydown.esc="uiStore.closeMenu()">
    <div class="navbar-inner">
      <router-link to="/" class="brand">
        <span class="brand-mark" aria-hidden="true"></span>
        Guia de Responsividade
      </router-link>

      <!-- No celular o menu vira um botão -->
      <button
        class="menu-btn"
        type="button"
        aria-controls="menu-principal"
        :aria-expanded="uiStore.isMenuOpen"
        @click="uiStore.toggleMenu()"
      >
        {{ uiStore.isMenuOpen ? 'Fechar' : 'Menu' }}
      </button>

      <nav
        id="menu-principal"
        class="nav"
        :class="{ 'is-open': uiStore.isMenuOpen }"
        aria-label="Seções do guia"
      >
        <router-link to="/" exact-active-class="is-current">Início</router-link>
        <router-link v-for="s in sections" :key="s.name" :to="s.path" active-class="is-current">
          {{ s.number }}. {{ s.short }}
        </router-link>
        <router-link :to="challengePage.path" active-class="is-current" class="nav-challenge">
          {{ challengePage.short }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-bottom: 0.25rem solid var(--color-primary-light);
}

.navbar-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  max-width: 80rem;
  margin-inline: auto;
  padding: var(--space-sm) var(--space-md);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-on-primary);
  font-weight: 700;
  font-size: var(--text-lg);
  text-decoration: none;
}

.brand-mark {
  flex: none;
  width: 0.75rem;
  height: 1.5rem;
  background: var(--color-on-primary);
  border-radius: 0.125rem;
}

.menu-btn {
  min-height: 2.75rem;
  padding: 0 var(--space-md);
  background: transparent;
  color: var(--color-on-primary);
  border: 0.0625rem solid var(--color-on-primary);
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
}

.nav {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  flex-direction: column;
  background: var(--color-primary-dark);
  border-top: 0.0625rem solid var(--color-primary);
}

.nav.is-open {
  display: flex;
}

.nav a {
  padding: var(--space-md);
  color: var(--color-on-primary);
  text-decoration: none;
  border-bottom: 0.0625rem solid var(--color-primary);
}

.nav a:hover {
  background: var(--color-primary);
}

.nav a.is-current {
  background: var(--color-surface);
  color: var(--color-primary-dark);
  font-weight: 700;
}

/* Mobile-first: só a partir de 64rem o menu aparece em linha */
@media (min-width: 64rem) {
  .menu-btn {
    display: none;
  }

  .nav {
    position: static;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-xs);
    background: transparent;
    border-top: 0;
  }

  .nav a {
    padding: var(--space-sm) 0.75rem;
    font-size: var(--text-sm);
    border-bottom: 0;
    border-radius: var(--radius);
  }
}
</style>
