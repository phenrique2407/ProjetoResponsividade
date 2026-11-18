<template>
  <main class="home-container section-container">
    <div class="hero-section">
      <h1 class="main-title">Guia Interativo de Responsividade</h1>
      <p class="intro-text">
        Bem-vindo ao nosso guia prático construído em Vue! Explore as seções abaixo para entender como criar páginas adaptáveis, com explicações simples, código comentado e laboratórios interativos.
      </p>
    </div>

    <div class="sections-grid">
      <!-- Seção 1 -->
      <div class="section-card">
        <h2 class="section-title">1. Por que responsividade importa</h2>
        <p class="section-description">O papel da meta tag viewport nos dispositivos móveis.</p>
        <router-link to="/secao-1" class="section-link">
          Acessar Seção 1
        </router-link>
      </div>

      <!-- Seção 2 -->
      <div class="section-card">
        <h2 class="section-title">2. Unidades CSS</h2>
        <p class="section-description">Unidades absolutas vs. relativas e acessibilidade.</p>
        <router-link to="/secao-2" class="section-link">
          Acessar Seção 2
        </router-link>
      </div>

      <!-- Seção 3 -->
      <div class="section-card">
        <h2 class="section-title">3. Flexbox e Grid</h2>
        <p class="section-description">Layouts de uma ou duas dimensões e quebra de colunas.</p>
        <router-link to="/secao-3" class="section-link">
          Acessar Seção 3
        </router-link>
      </div>

      <!-- Seção 4 -->
      <div class="section-card">
        <h2 class="section-title">4. Imagens responsivas</h2>
        <p class="section-description">Evitando CLS e adaptando mídias corretamente.</p>
        <router-link to="/secao-4" class="section-link">
          Acessar Seção 4
        </router-link>
      </div>

      <!-- Seção 5 -->
      <div class="section-card">
        <h2 class="section-title">5. Boas práticas em Vue</h2>
        <p class="section-description">Estrutura, carregamento de rotas e a importância do :key.</p>
        <router-link to="/secao-5" class="section-link">
          Acessar Seção 5
        </router-link>
      </div>

      <!-- Desafio Final -->
      <div class="section-card challenge-card">
        <h2 class="section-title">Desafio Final</h2>
        <p class="section-description">Prove o que aprendeu utilizando os nossos laboratórios.</p>
        <router-link to="/desafio" class="section-link challenge-link">
          Acessar Desafio
        </router-link>
      </div>
    </div>
  </main>
</template>
