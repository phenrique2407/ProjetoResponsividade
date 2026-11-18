<template>
  <div class="section-answer">
    <div class="question-box">
      <strong>Pergunta-guia:</strong>
      <slot name="question"></slot>
    </div>
    <div class="answer-box">
      <strong>Resposta:</strong>
      <slot name="answer"></slot>
    </div>
  </div>
</template>

<style scoped>
/* Estilos mobile-first usando rem e variáveis CSS no :root */
.section-answer {
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
}
.question-box {
  margin-bottom: 1rem;
  font-weight: 500;
}
</style>