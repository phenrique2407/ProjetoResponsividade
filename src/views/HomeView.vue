<script setup>
import { sections, challengePage } from '@/data/sections'

const labs = [
  { name: 'Simulador de viewport', where: 'Seção 1' },
  { name: 'Conversor de unidades', where: 'Seção 2' },
  { name: 'Flexbox contra Grid com largura ajustável', where: 'Seção 3' },
  { name: 'Imagem com atraso: com e sem width e height', where: 'Seção 4' },
  { name: 'Laboratório de object-fit e aspect-ratio', where: 'Seção 4' },
  { name: 'O problema do :key no v-for', where: 'Seção 5' },
  { name: 'Indicador fixo de largura e breakpoint', where: 'Canto inferior direito, em todas as telas' },
]
</script>

<template>
  <div class="section-container">
    <section class="hero">
      <p class="eyebrow">Guia prático</p>
      <h1>Como criar páginas que funcionam em qualquer tela</h1>
      <p class="lead">
        Cinco seções com explicação curta, código comentado, laboratórios interativos, a resposta
        de uma pergunta-guia e as fontes consultadas. No final, um desafio que só se resolve usando
        este guia.
      </p>
      <div class="btn-row">
        <router-link to="/secao-1" class="btn">Começar pela Seção 1</router-link>
        <router-link :to="challengePage.path" class="btn btn-outline">Ir ao Desafio</router-link>
      </div>
    </section>

    <section class="block">
      <h2>Seções</h2>
      <ul class="cards">
        <li v-for="s in sections" :key="s.name">
          <router-link :to="s.path" class="card">
            <span class="card-number">{{ s.number }}</span>
            <span class="card-title">{{ s.title }}</span>
            <span class="card-text">{{ s.description }}</span>
          </router-link>
        </li>
        <li>
          <router-link :to="challengePage.path" class="card card-challenge">
            <span class="card-number">?</span>
            <span class="card-title">{{ challengePage.title }}</span>
            <span class="card-text">{{ challengePage.description }}</span>
          </router-link>
        </li>
      </ul>
    </section>

    <section class="block">
      <h2>Laboratórios do guia</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Laboratório</th>
              <th scope="col">Onde encontrar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lab in labs" :key="lab.name">
              <td>{{ lab.name }}</td>
              <td>{{ lab.where }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: var(--space-lg) var(--space-md);
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: var(--radius);
  border-bottom: 0.25rem solid var(--color-primary-light);
}

.hero h1,
.hero .eyebrow {
  color: var(--color-on-primary);
}

.eyebrow {
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

h1 {
  margin-top: var(--space-xs);
  font-size: var(--text-2xl);
}

.lead {
  margin-block: var(--space-md) var(--space-lg);
  font-size: var(--text-lg);
}

.hero .btn {
  background: var(--color-surface);
  color: var(--color-primary-dark);
  border-color: var(--color-surface);
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.hero .btn:hover {
  background: var(--color-primary-soft);
}

.hero .btn-outline {
  background: transparent;
  color: var(--color-on-primary);
  border-color: var(--color-on-primary);
}

.hero .btn-outline:hover {
  background: var(--color-primary-dark);
}

.block {
  margin-top: var(--space-2xl);
}

.block h2 {
  margin-bottom: var(--space-md);
  font-size: var(--text-xl);
}

/* Grid mobile-first: 1 coluna, vira auto-fit conforme a largura */
.cards {
  display: grid;
  gap: var(--space-md);
  list-style: none;
}

.card {
  display: grid;
  gap: var(--space-xs);
  height: 100%;
  padding: var(--space-md);
  background: var(--color-surface);
  border: var(--border);
  border-left: 0.25rem solid var(--color-primary);
  border-radius: var(--radius);
  color: var(--color-text);
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.card:hover {
  background: var(--color-primary-soft);
}

.card-challenge {
  border-left-color: var(--color-accent);
}

.card-number {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-primary);
}

.card-challenge .card-number {
  color: var(--color-accent);
}

.card-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-primary-dark);
}

.card-text {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

@media (min-width: 40rem) {
  .hero {
    padding: var(--space-xl);
  }

  .cards {
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
}
</style>
