<template>
  <header class="navbar">
    <div class="brand">Guia Responsivo</div>
    
    <button class="mobile-menu-btn" @click="toggleMenu">
      {{ isMenuOpen ? 'Fechar' : 'Menu' }}
    </button>

    <nav :class="{ 'is-open': isMenuOpen }">
      <router-link to="/" @click="closeMenu">Início</router-link>
      <router-link to="/secao-1" @click="closeMenu">Importância</router-link>
      <router-link to="/secao-2" @click="closeMenu">Unidades</router-link>
      <router-link to="/secao-3" @click="closeMenu">Flex/Grid</router-link>
      <router-link to="/secao-4" @click="closeMenu">Imagens</router-link>
      <router-link to="/secao-5" @click="closeMenu">Boas Práticas Vue</router-link>
      <router-link to="/desafio" class="challenge-link" @click="closeMenu">Desafio</router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--nav-bg);
}

.mobile-menu-btn {
  display: block;
}

nav {
  display: none;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--nav-bg);
}

nav.is-open {
  display: flex;
}

/* Mobile-first: Media query com min-width para telas maiores */
@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
  
  nav {
    display: flex;
    flex-direction: row;
    position: static;
    width: auto;
    gap: 1rem;
  }
}
</style>