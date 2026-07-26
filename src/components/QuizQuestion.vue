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

const baseUrl = import.meta.env.BASE_URL

const optionImageMap: Record<string, string> = {
  ヘドウィグ: `${baseUrl}images/Hedwig.png`,
  マンドレイク: `${baseUrl}images/Mandrake.png`,
  二フラー: `${baseUrl}images/Niffler.png`,
  フォークス: `${baseUrl}images/Fawkes.webp`,
  ドビー: `${baseUrl}images/Dobby.png`,
  ディメンター: `${baseUrl}images/Dementor.png`,
  百味ビーンズ: `${baseUrl}images/bertie_Bott's_every_flavour_beans.png`,
  蛙チョコ: `${baseUrl}images/Chocolate_Frog.png`,
  ハグリッドの手作りケーキ: `${baseUrl}images/HAPPEE_BIRTHDAE_HARRY.png`,
  'フィフィ・フィズビー（舐めている間に、数センチ浮き上がれる炭酸入りキャンディ）': `${baseUrl}images/Fizzing_Whizzbees.png`
}
</script>

<template>
  <section class="question-panel">
    <p class="question-count">質問 {{ questionNumber }} / {{ totalQuestions }}</p>
    <h2 class="question-title">{{ questionText }}</h2>

    <div class="choices" :class="{ 'choices--two-column': questionNumber === 9 || questionNumber === 10 }">
      <!-- v-forで選択肢を表示し、クリック時に選択した要素をemitで親コンポーネントへ渡す -->
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
