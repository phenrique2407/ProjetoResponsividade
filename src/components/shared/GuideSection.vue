<script setup>
import SectionAnswer from '@/components/shared/SectionAnswer.vue'
import SourceList from '@/components/shared/SourceList.vue'
import SectionPager from '@/components/shared/SectionPager.vue'

// Molde de toda seção: cabeçalho, explicação, código, laboratórios,
// pergunta-guia com resposta e fontes consultadas.
defineProps({
  number: { type: Number, required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  sources: { type: Array, required: true },
})
</script>

<template>
  <article class="guide-section section-container">
    <header class="section-head">
      <p class="eyebrow">Seção {{ number }} de 5</p>
      <h1>{{ title }}</h1>
      <p v-if="lead" class="lead">{{ lead }}</p>
    </header>

    <section class="block">
      <h2><span class="step">1</span> Explicação curta</h2>
      <div class="prose"><slot name="explanation"></slot></div>
    </section>

    <section class="block">
      <h2><span class="step">2</span> Exemplo de código comentado</h2>
      <div class="stack"><slot name="code"></slot></div>
    </section>

    <section v-if="$slots.labs" class="block">
      <h2><span class="step">3</span> Laboratório</h2>
      <div class="stack"><slot name="labs"></slot></div>
    </section>

    <section class="block">
      <h2><span class="step">4</span> Pergunta-guia</h2>
      <SectionAnswer>
        <template #question><slot name="question"></slot></template>
        <template #answer><slot name="answer"></slot></template>
      </SectionAnswer>
    </section>

    <section class="block">
      <h2><span class="step">5</span> Fontes consultadas</h2>
      <SourceList :sources="sources" />
    </section>

    <SectionPager :number="number" />
  </article>
</template>

<style scoped>
.section-head {
  padding-bottom: var(--space-lg);
  border-bottom: 0.1875rem solid var(--color-primary);
}

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

.lead {
  margin-top: var(--space-sm);
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}

.block {
  margin-top: var(--space-xl);
  min-width: 0;
}

.block > h2 {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  font-size: var(--text-xl);
}

.step {
  flex: none;
  display: inline-grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 50%;
  font-size: var(--text-sm);
}

.stack {
  display: grid;
  gap: var(--space-lg);
  min-width: 0;
}
</style>
