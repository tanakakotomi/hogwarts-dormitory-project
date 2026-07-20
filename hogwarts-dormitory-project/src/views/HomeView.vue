<script setup lang="ts">
import { onMounted } from 'vue'
import QuizQuestion from '@/components/QuizQuestion.vue'
import ResultDisplay from '@/components/ResultDisplay.vue'
import { useQuizStore } from '@/stores/quiz'
import type { House } from '@/types/quiz'

const quizStore = useQuizStore()
const logoImage = "/images/bertie_Bott's_every_flavour_beans.png"

onMounted(() => {
  quizStore.fetchCharacters()
})

function handleSelected(house: House) {
  quizStore.answerQuestion(house)
}
</script>

<template>
  <div class="page">
    <div class="hero-row">
      <h1 class="page-title">ホグワーツ寮診断</h1>
      <img :src="logoImage" alt="Bertie Bott's Every Flavour Beans" class="logo" />
    </div>
    <p class="page-subtitle">9つの質問に答えて、<br />あなたもホグワーツの寮生になろう！</p>

    <QuizQuestion
      v-if="!quizStore.quizFinished && quizStore.currentQuestion"
      :question-number="quizStore.currentQuestionIndex + 1"
      :total-questions="quizStore.questions.length"
      :question-text="quizStore.currentQuestion.text"
      :options="quizStore.currentQuestion.options"
      @selected="handleSelected"
    />

    <ResultDisplay
      v-else
      :house="quizStore.resultHouse"
      :house-label="quizStore.resultHouseLabel"
      :comment="quizStore.resultComment"
      :characters="quizStore.filteredCharacters"
      :is-loading="quizStore.isLoadingCharacters"
      :error="quizStore.loadError"
      @restart="quizStore.resetQuiz"
    >
      <template #title>
        <h2 class="result-heading">結果: {{ quizStore.resultHouseLabel }}</h2>
      </template>

      <template #house-name>
        <p class="result-description">同じ寮の仲間たち</p>
      </template>
    </ResultDisplay>
  </div>
</template>
