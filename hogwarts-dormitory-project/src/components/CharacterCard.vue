<script setup lang="ts">
import type { Character } from '@/types/quiz'

defineProps<{
  character: Character
}>()
</script>

<template>
  <article class="card">
    <div class="portrait-wrap">
      <img
        v-if="character.image"
        :src="character.image"
        :alt="character.name"
        class="portrait"
        loading="lazy"
      />
      <div v-else class="portrait placeholder">No Image</div>
    </div>

    <div class="meta">
      <h4 class="name">{{ character.name }}</h4>
      <p class="actor">俳優: {{ character.actor }}</p>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: linear-gradient(180deg, #fff8e4 0%, #f1e0b9 100%);
  border: 1px solid #81643f;
  border-radius: 14px;
  overflow: hidden;
}

.portrait-wrap {
  align-items: center;
  background: #d6c8a5;
  display: flex;
  justify-content: center;
  padding: 0.65rem;
  width: 100%;
}

.portrait {
  display: block;
  aspect-ratio: 3 / 4;
  height: auto;
  max-height: clamp(220px, 34vw, 340px);
  object-fit: contain;
  object-position: center;
  width: 100%;
}

.placeholder {
  align-items: center;
  aspect-ratio: 3 / 4;
  color: #6a5437;
  display: flex;
  font-weight: 700;
  justify-content: center;
  max-height: clamp(220px, 34vw, 340px);
  width: 100%;
}

.meta {
  padding: 0.85rem;
}

.name {
  color: #2f2114;
  font-size: 1.05rem;
  font-weight: 800;
}

.actor {
  color: #6e5839;
  font-size: 0.95rem;
  margin-top: 0.25rem;
}
</style>
