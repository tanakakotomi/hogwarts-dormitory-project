<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue'
import type { Character } from '@/types/quiz'

const emit = defineEmits<{
  restart: []
}>()

import { computed } from 'vue'

const props = defineProps<{
  houseLabel: string
  comment: string
  characters: Character[]
  isLoading: boolean
  error: string
}>()

const emblemSrc = computed(() => {
  if (!props.houseLabel) return ''
  const key = props.houseLabel.toLowerCase().trim()
  // support English and common Japanese names
  if (key.includes('gryff') || key.includes('グリ')) {
    return `${import.meta.env.BASE_URL}images/Gryffindor.png`
  }
  if (key.includes('huffle') || key.includes('ハッフ')) {
    return `${import.meta.env.BASE_URL}images/Hufflepuff.png`
  }
  if (key.includes('raven') || key.includes('レイブ') || key.includes('レイブンク')) {
    return `${import.meta.env.BASE_URL}images/Ravenclaw.png`
  }
  if (key.includes('slyth') || key.includes('スリ')) {
    return `${import.meta.env.BASE_URL}images/Slytherin.png`
  }
  return ''
})
</script>

<template>
  <section class="result-panel">
    <div class="frame">
      <div class="house-emblem-wrap">
        <img v-if="emblemSrc" :src="emblemSrc" :alt="`${houseLabel} emblem`" class="house-emblem" />
      </div>

      <!-- slotを使って、親コンポーネントから日本語の寮名を受け取る -->
      <slot name="title">
        <h2 class="result-title">{{ houseLabel }}</h2>
      </slot>

      <p class="result-comment">{{ comment }}</p>
    </div>

    <!-- slotを使って、同じ寮の仲間たちという文言を受け取る -->
    <slot name="house-name">
      <p class="result-description">同じ寮の仲間たち</p>
    </slot>
    
    <p v-if="isLoading" class="status">キャラクターを召喚中...</p>
    <p v-else-if="error" class="status error">{{ error }}</p>

    <div v-else-if="characters.length > 0" class="character-grid">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>

    <button class="restart" type="button" @click="emit('restart')">もう一度診断してみる？</button>
  </section>
</template>
