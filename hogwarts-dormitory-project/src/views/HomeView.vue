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
      :points="quizStore.housePoints"
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

<style scoped>
.page {
  margin: 0 auto;
  max-width: 980px;
}

.hero-row {
  align-items: center;
  display: flex;
  gap: clamp(0.6rem, 2vw, 1.2rem);
  justify-content: center;
  margin-bottom: 0.5rem;
}

.page-title {
  color: #f8e8b8;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  letter-spacing: 0.04em;
  margin: 0;
  text-align: left;
}

.logo {
  display: block;
  height: auto;
  object-fit: contain;
  width: clamp(56px, 10vw, 70px);
}

.page-subtitle {
  color: #e6dcb9;
  font-size: 1rem;
  margin-bottom: 1.4rem;
  text-align: center;
}

@media (max-width: 560px) {
  .hero-row {
    flex-direction: column;
    gap: 0.25rem;
  }

  .page-title {
    text-align: center;
  }
}

.result-heading {
  color: #2d1f13;
  font-size: 1.8rem;
  font-weight: 800;
}

.result-description {
  color: #4f3a25;
  margin-top: 0.35rem;
}
</style>
