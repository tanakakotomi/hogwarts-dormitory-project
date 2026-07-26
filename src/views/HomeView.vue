<script setup lang="ts">
import { onMounted } from 'vue'
import QuizQuestion from '@/components/QuizQuestion.vue'
import ResultDisplay from '@/components/ResultDisplay.vue'
import { useQuizStore } from '@/stores/quiz'
import type { House } from '@/types/quiz'
import { SLYTHERIN_CONFIRM_TEXT, SLYTHERIN_CONFIRM_OPTIONS, AZKABAN_CONFIRM_TEXT } from '@/constants/quiz'

const quizStore = useQuizStore()
const logoImage = `${import.meta.env.BASE_URL}images/bertie_Bott's_every_flavour_beans.png`
const noSlytherinSrc = `${import.meta.env.BASE_URL}images/NoSlytherin.png`
const yesSlytherinSrc = `${import.meta.env.BASE_URL}images/YesSlytherin.png`
const wizengamotSrc = `${import.meta.env.BASE_URL}images/Wizengamot.png`

onMounted(() => {
  quizStore.fetchCharacters()
})

function handleSelected(house: House) {
  console.log('handleSelected:', house)
  quizStore.answerQuestion(house)
}
</script>

<template>
  <div class="page">
    <div class="hero-row">
      <h1 class="page-title">ホグワーツ寮診断</h1>
      <img :src="logoImage" alt="Bertie Bott's Every Flavour Beans" class="logo" />
    </div>
    <p class="page-subtitle">10個の質問に答えて、<br />あなたもホグワーツの寮生になろう！</p>

    <QuizQuestion
      v-if="!quizStore.quizFinished && !quizStore.pendingSlytherin && !quizStore.pendingAzkaban && !quizStore.azkabanAppealNeeded && quizStore.currentQuestion"
      :question-number="quizStore.currentQuestionIndex + 1"
      :total-questions="quizStore.questions.length"
      :question-text="quizStore.currentQuestion.text"
      :options="quizStore.currentQuestion.options"
      @selected="handleSelected"
    />

    <!-- Slytherin confirmation as 10th question -->
    <div v-else-if="quizStore.pendingSlytherin" class="question-panel">
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

    <!-- Azkaban confirmation/trial flow -->
    <div v-else-if="quizStore.pendingAzkaban" class="question-panel">
      <img :src="wizengamotSrc" alt="ウィゼンガモット" class="wizengamot-img" />
      <h2 class="question-title">{{ AZKABAN_CONFIRM_TEXT }}</h2>
      <div class="choices choices--two-column">
        <button class="choice-button" type="button" @click="quizStore.processAzkabanTrial()">
          ウィゼンガモット（魔法界の最高裁判所）で裁判に参加しよう！
        </button>
      </div>
    </div>

    <!-- Azkaban trial resulted in appeal -> show retry option -->
    <div v-else-if="quizStore.azkabanAppealNeeded" class="question-panel">
      <h2 class="question-title">裁判で審理する余地があると判断されたみたい！</h2>
      <div class="choices choices--horizontal">
        <button class="choice-button" type="button" @click="quizStore.resetQuiz()">もう一度診断する</button>
        <button class="choice-button" type="button" @click="quizStore.sendToAzkaban()">アズカバンに行く</button>
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
