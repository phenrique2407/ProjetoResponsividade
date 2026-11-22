<template>
  <section class="section-container">
    <h1>Página não encontrada</h1>
    <p class="text">O endereço digitado não existe neste guia.</p>
    <router-link to="/" class="btn">Voltar ao início</router-link>
  </section>
</template>

<style scoped>
.text {
  margin-block: var(--space-md);
}

.btn {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}
</style>
