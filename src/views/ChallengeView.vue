<script setup>
import { ref } from 'vue'

// Pergunta do Desafio: só se responde usando o laboratório de Grid (Seção 3).
// Grid com minmax(14rem, 1fr) e gap de 1rem: 3 x 224 + 2 x 16 = 704px.
const CORRECT_ANSWER = 704

const userAnswer = ref('')
const isSuccess = ref(false)
const feedback = ref({ message: '', type: '' })

const validateAnswer = () => {
  // Aceita "704", "704px", "704 px"
  const number = parseInt(userAnswer.value.replace(/\D/g, ''), 10)

  if (number === CORRECT_ANSWER) {
    isSuccess.value = true
    feedback.value = {
      type: 'success',
      message:
        'Correto. Três colunas: 3 x 224px + 2 x 16px de gap = 704px. Com 703px o grid ainda mostra 2 colunas.',
    }
  } else {
    feedback.value = {
      type: 'error',
      message:
        'Resposta incorreta. Dica: no laboratório de Grid da Seção 3, arraste a largura do contêiner até aparecerem 3 colunas e confira a conta de 14rem e 1rem.',
    }
  }
}
</script>

<template>
  <article class="section-container">
    <header class="head">
      <p class="eyebrow">Desafio</p>
      <h1>Desafio final</h1>
      <p class="intro">
        Esta pergunta só se responde usando o próprio guia. Procure o laboratório certo e teste.
      </p>
    </header>

    <section class="challenge-card">
      <h2>Pergunta</h2>
      <p class="question">
        No laboratório de Grid da Seção 3, a partir de qual largura do contêiner, em px, aparecem
        <strong>3 colunas</strong>?
      </p>

      <form class="answer-box" @submit.prevent="validateAnswer">
        <label for="resposta" class="sr-only">Sua resposta em pixels</label>
        <input
          id="resposta"
          v-model="userAnswer"
          type="text"
          inputmode="numeric"
          placeholder="Largura em px"
          autocomplete="off"
          :disabled="isSuccess"
        />
        <button type="submit" class="btn" :disabled="isSuccess || !userAnswer.trim()">
          Validar
        </button>
      </form>

      <p v-if="feedback.message" class="feedback" :class="feedback.type" role="status">
        {{ feedback.message }}
      </p>

      <router-link to="/secao-3" class="link">Abrir a Seção 3</router-link>
    </section>
  </article>
</template>

<style scoped>
.eyebrow {
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent);
}

h1 {
  margin-top: var(--space-xs);
  font-size: var(--text-2xl);
}

.head {
  padding-bottom: var(--space-lg);
  border-bottom: 0.1875rem solid var(--color-primary);
}

.intro {
  margin-top: var(--space-sm);
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}

.challenge-card {
  margin-top: var(--space-xl);
  padding: var(--space-md);
  background: var(--color-surface);
  border: var(--border);
  border-left: 0.375rem solid var(--color-accent);
  border-radius: var(--radius);
}

.question {
  margin-block: var(--space-md) var(--space-lg);
  font-size: var(--text-lg);
}

.answer-box {
  display: grid;
  gap: var(--space-sm);
}

.feedback {
  margin-top: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--radius);
  font-weight: 600;
}

.success {
  background: var(--color-success-soft);
  color: var(--color-success);
}

.error {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.link {
  display: inline-block;
  margin-top: var(--space-lg);
}

@media (min-width: 40rem) {
  .challenge-card {
    padding: var(--space-xl);
  }

  .answer-box {
    grid-template-columns: 1fr auto;
  }
}
</style>
