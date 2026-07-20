<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue'
import type { Character, House, HousePoints } from '@/types/quiz'

defineProps<{
  house: House
  houseLabel: string
  comment: string
  points: HousePoints
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

    <div class="score-grid">
      <p>寮ごとのポイントはいくつ当てはまった？</p>
      <p>グリフィンドール: <strong>{{ points.Gryffindor }}</strong></p>
      <p>レイブンクロー: <strong>{{ points.Ravenclaw }}</strong></p>
      <p>ハッフルパフ: <strong>{{ points.Hufflepuff }}</strong></p>
      <p>スリザリン: <strong>{{ points.Slytherin }}</strong></p>
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

    <button class="restart" type="button" @click="emit('restart')">もう一度診断する？</button>
  </section>
</template>

<style scoped>
.result-panel {
  background: linear-gradient(160deg, #f8efd6 0%, #ead7ad 100%);
  border: 2px solid #2d1f13;
  border-radius: 16px;
  box-shadow: 0 14px 30px rgb(0 0 0 / 18%);
  padding: 1.4rem;
}

.frame {
  border: 2px solid #745635;
  border-radius: 12px;
  margin-bottom: 1rem;
  padding: 1rem;
}

.result-title {
  color: #2d1f13;
  font-size: 1.65rem;
  font-weight: 800;
}

.result-subtitle {
  color: #5d452e;
  margin-top: 0.35rem;
}

.result-comment {
  color: #4f3a25;
  font-weight: 700;
  margin-top: 0.55rem;
}

.score-grid {
  display: grid;
  gap: 0.25rem;
  margin-bottom: 1rem;
  color: #3f2c1b;
}

.score-grid p {
  margin: 0;
}

.status {
  color: #5b452d;
  font-weight: 700;
  margin-bottom: 1rem;
}

.error {
  color: #8f1e1e;
}

.character-grid {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  margin-bottom: 1.1rem;
}

.restart {
  background: #342515;
  border: none;
  border-radius: 10px;
  color: #f7ecd0;
  cursor: pointer;
  font-size: 0.96rem;
  font-weight: 800;
  padding: 0.8rem 1rem;
}

.restart:hover {
  background: #4b311a;
}
</style>
