<script setup lang="ts">
import type { House, QuizOption } from '@/types/quiz'

defineProps<{
  questionNumber: number
  totalQuestions: number
  questionText: string
  options: QuizOption[]
}>()

const emit = defineEmits<{
  selected: [house: House]
}>()
</script>

<template>
  <section class="question-panel">
    <p class="question-count">質問 {{ questionNumber }} / {{ totalQuestions }}</p>
    <h2 class="question-title">{{ questionText }}</h2>

    <div class="choices">
      <button
        v-for="option in options"
        :key="option.label"
        class="choice-button"
        type="button"
        @click="emit('selected', option.house)"
      >
        {{ option.label }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.question-panel {
  background: linear-gradient(135deg, #f6e9c7 0%, #e8d6af 100%);
  border: 2px solid #2e2014;
  border-radius: 16px;
  box-shadow: 0 10px 24px rgb(0 0 0 / 16%);
  padding: 1.5rem;
}

.question-count {
  color: #5f482f;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.question-title {
  color: #2e2014;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 1rem;
}

.choices {
  display: grid;
  gap: 0.75rem;
}

.choice-button {
  background: #fffdf4;
  border: 1px solid #705234;
  border-radius: 12px;
  color: #2e2014;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.9rem 1rem;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.choice-button:hover {
  background: #f9f0d8;
  box-shadow: 0 8px 18px rgb(0 0 0 / 14%);
  transform: translateY(-1px);
}

.choice-button:active {
  transform: translateY(0);
}
</style>
