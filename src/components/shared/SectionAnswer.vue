<template>
  <div class="section-answer">
    <div class="question-box prose">
      <h3>Pergunta-guia</h3>
      <slot name="question"></slot>
    </div>
    <div class="answer-box prose">
      <h3>Resposta</h3>
      <slot name="answer"></slot>
    </div>
  </div>
</template>

<style scoped>
.section-answer {
  border: var(--border);
  border-radius: var(--radius);
  background: var(--color-surface);
  overflow: hidden;
}

.question-box,
.answer-box {
  padding: var(--space-md);
}

.question-box {
  background: var(--color-primary-soft);
  border-bottom: var(--border);
}

h3 {
  font-size: var(--text-base);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.answer-box {
  border-left: 0.25rem solid var(--color-success);
}

@media (min-width: 48rem) {
  .question-box,
  .answer-box {
    padding: var(--space-lg);
  }
}
</style>
