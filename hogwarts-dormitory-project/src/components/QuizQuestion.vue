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

const optionImageMap: Record<string, string> = {
  ヘドウィグ: '/images/Hedwig.png',
  ヒッポグリフ: '/images/Hippogriff.png',
  二フラー: '/images/Niffler.png',
  セストラル: '/images/Thestral.png'
}
</script>

<template>
  <section class="question-panel">
    <p class="question-count">質問 {{ questionNumber }} / {{ totalQuestions }}</p>
    <h2 class="question-title">{{ questionText }}</h2>

    <div class="choices" :class="{ 'choices--two-column': questionNumber === 9 }">
      <button
        v-for="option in options"
        :key="option.label"
        class="choice-button"
        type="button"
        @click="emit('selected', option.house)"
      >
        <span class="choice-content">
          <span class="choice-label">{{ option.label }}</span>
          <img
            v-if="optionImageMap[option.label]"
            :src="optionImageMap[option.label]"
            :alt="`${option.label}の画像`"
            class="choice-icon"
            loading="lazy"
          />
        </span>
      </button>
    </div>
  </section>
</template>
