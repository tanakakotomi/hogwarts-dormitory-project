<script setup lang="ts">
import type { Character } from '@/types/quiz'

defineProps<{
  character: Character
}>()
</script>

<template>
  <article class="card">
    <div class="portrait-wrap">
      <!-- v-ifで画像データがある要素だけ表示 -->
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
