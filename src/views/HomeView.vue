<script setup lang="ts">
import { onMounted } from 'vue'
import QuizQuestion from '@/components/QuizQuestion.vue'
import ResultDisplay from '@/components/ResultDisplay.vue'
import { useQuizStore } from '@/stores/quiz'
import type { House } from '@/types/quiz'
import { SLYTHERIN_CONFIRM_TEXT, SLYTHERIN_CONFIRM_OPTIONS } from '@/constants/quiz'

const quizStore = useQuizStore()
const logoImage = `${import.meta.env.BASE_URL}images/bertie_Bott's_every_flavour_beans.png`
const noSlytherinSrc = `${import.meta.env.BASE_URL}images/NoSlytherin.png`
const yesSlytherinSrc = `${import.meta.env.BASE_URL}images/YesSlytherin.png`

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
      v-if="!quizStore.quizFinished && !quizStore.pendingSlytherin && quizStore.currentQuestion"
      :question-number="quizStore.currentQuestionIndex + 1"
      :total-questions="quizStore.questions.length"
      :question-text="quizStore.currentQuestion.text"
      :options="quizStore.currentQuestion.options"
      @selected="handleSelected"
    />

    <!-- Slytherin confirmation as 10th question -->
    <div v-else-if="quizStore.pendingSlytherin" class="question-panel">
      <p class="question-count">質問 10 / 10</p>
        <h2 class="question-title">{{ SLYTHERIN_CONFIRM_TEXT }}</h2>
      <div class="choices choices--two-column">
          <button
            v-for="(opt, idx) in SLYTHERIN_CONFIRM_OPTIONS"
            :key="opt.label"
            class="choice-button"
            type="button"
            @click="idx === 0 ? quizStore.resetQuiz() : quizStore.confirmSlytherin()"
          >
            {{ opt.label }}
            <div v-if="idx === 0" class="slytherin-wrap">
              <img :src="noSlytherinSrc" alt="No Slytherin" class="slytherin-img" />
            </div>
            <div v-if="idx === 1" class="slytherin-wrap">
              <img :src="yesSlytherinSrc" alt="Yes Slytherin" class="slytherin-img" />
            </div>
          </button>
      </div>
    </div>

    <ResultDisplay
      v-else
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
    </ResultDisplay>
  </div>
</template>
