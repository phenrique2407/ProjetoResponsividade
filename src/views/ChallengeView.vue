<template>
  <main class="section-container">
    <h1>Desafio Final</h1>
    
    <p class="intro-text">
      Para validar os conhecimentos adquiridos nesse guia, responda a pergunta abaixo.
    </p>

    <div class="challenge-card">
      <h2>Missão: Investigação Visual</h2>
      
      <p class="question">
        Vá até a <strong>Seção 4 (Imagens Responsivas)</strong> e interaja com o Laboratório de <code>object-fit</code>. 
        Se você quiser que a imagem apareça por completo (sem nenhum corte da foto original), mas aceita que fiquem bordas vazias dentro da caixa vermelha, qual é a propriedade exata que você deve selecionar no menu?
      </p>

      <div class="answer-box">
        <input 
          type="text" 
          v-model="userAnswer" 
          placeholder="Digite o nome da propriedade..." 
          @keyup.enter="validateAnswer"
          :disabled="isSuccess"
        />
        <button 
          class="action-btn" 
          @click="validateAnswer"
          :disabled="isSuccess || !userAnswer.trim()"
        >
          Validar
        </button>
      </div>

      <!-- Feedback visual de erro ou acerto -->
      <transition name="fade">
        <div v-if="feedback.message" :class="['feedback-msg', feedback.type]">
          {{ feedback.message }}
        </div>
      </transition>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const userAnswer = ref('')
const isSuccess = ref(false)
const feedback = ref({
  message: '',
  type: '' // 'success' ou 'error'
})

const validateAnswer = () => {
  // Limpa a resposta (remove espaços e passa para minúsculas) para facilitar a validação
  const normalizedAnswer = userAnswer.value.trim().toLowerCase()
  
  if (normalizedAnswer === 'contain') {
    isSuccess.value = true
    feedback.value = {
      message: ' Correto! A propriedade "contain" garante que a imagem inteira fique visível, escalando-a proporcionalmente.',
      type: 'success'
    }
  } else {
    feedback.value = {
      message: ' Incorreto. Dica: volte à Seção 4, mude as dimensões da caixa vermelha e teste as opções do select.',
      type: 'error'
    }
    
    // Limpa a mensagem de erro após 4 segundos
    setTimeout(() => {
      if (!isSuccess.value) {
        feedback.value.message = ''
      }
    }, 4000)
  }
}
</script>

<style scoped>
.intro-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.challenge-card {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: 0.5rem;
  border-left: 6px solid var(--primary-color);
}

.question {
  margin: var(--spacing-md) 0 var(--spacing-lg);
  font-size: 1.05rem;
  line-height: 1.6;
}

.answer-box {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
}

input:focus {
  border-color: var(--primary-color);
}

.action-btn {
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.feedback-msg {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: 0.25rem;
  font-weight: 500;
}

.success {
  background-color: #d1fae5;
  color: #065f46;
}

.error {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Transição suave para o feedback */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile-first: Alinha o input e o botão lado a lado em telas maiores */
@media (min-width: 640px) {
  .answer-box {
    flex-direction: row;
  }
  input {
    flex: 1;
  }
  .action-btn {
    width: auto;
    padding: 0.75rem 2rem;
  }
}
</style>