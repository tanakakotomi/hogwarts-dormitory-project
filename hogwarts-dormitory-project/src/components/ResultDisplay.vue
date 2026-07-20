<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue'
import type { Character, House } from '@/types/quiz'

defineProps<{
  house: House
  houseLabel: string
  comment: string
  characters: Character[]
  isLoading: boolean
  error: string
}>()

const emit = defineEmits<{
  restart: []
}>()
</script>

<template>
  <section class="result-panel">
    <div class="frame">
      <!-- 寮名 -->
      <slot name="title">
        <h2 class="result-title">{{ houseLabel }}</h2>
      </slot>

      <p class="result-comment">{{ comment }}</p>
    </div>
    
    <!-- 同じ寮の仲間たち -->
    <slot name="house-name">
      <p class="result-subtitle">{{ house }}</p>
    </slot>

    <p v-if="isLoading" class="status">キャラクターを召喚中...</p>
    <p v-else-if="error" class="status error">{{ error }}</p>

    <div v-else-if="characters.length > 0" class="character-grid">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>

    <button class="restart" type="button" @click="emit('restart')">もう一度診断してみる？</button>
  </section>
</template>
