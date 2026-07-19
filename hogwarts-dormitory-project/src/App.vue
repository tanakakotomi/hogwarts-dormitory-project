<script setup lang="ts">
import { computed, ref } from 'vue'

type House = {
  name: string
  founder: string
  colors: string
  commonRoom: string
  traits: string[]
}

const houses: House[] = [
  {
    name: 'Gryffindor',
    founder: 'Godric Gryffindor',
    colors: 'Scarlet & Gold',
    commonRoom: 'Gryffindor Tower',
    traits: ['Bravery', 'Nerve', 'Chivalry'],
  },
  {
    name: 'Hufflepuff',
    founder: 'Helga Hufflepuff',
    colors: 'Yellow & Black',
    commonRoom: 'Near the Hogwarts kitchens',
    traits: ['Loyalty', 'Patience', 'Fairness'],
  },
  {
    name: 'Ravenclaw',
    founder: 'Rowena Ravenclaw',
    colors: 'Blue & Bronze',
    commonRoom: 'Ravenclaw Tower',
    traits: ['Wisdom', 'Learning', 'Creativity'],
  },
  {
    name: 'Slytherin',
    founder: 'Salazar Slytherin',
    colors: 'Green & Silver',
    commonRoom: 'The dungeons beneath the lake',
    traits: ['Ambition', 'Cunning', 'Resourcefulness'],
  },
]

const defaultHouse = houses[0]!
const selectedHouseName = ref(defaultHouse.name)
const selectedHouse = computed<House>(
  () => houses.find((house) => house.name === selectedHouseName.value) ?? defaultHouse,
)
</script>

<template>
  <main class="app-shell">
    <section class="hero">
      <p class="eyebrow">Start implementation</p>
      <h1>Hogwarts Dormitory Project</h1>
      <p class="intro">
        The default Vue starter has been replaced with the first project-specific screen: a simple
        dormitory browser for Hogwarts houses.
      </p>
    </section>

    <section class="houses" aria-label="Hogwarts houses">
      <button
        v-for="house in houses"
        :key="house.name"
        type="button"
        class="house-card"
        :class="{ active: house.name === selectedHouseName }"
        @click="selectedHouseName = house.name"
      >
        <span class="house-name">{{ house.name }}</span>
        <span class="house-founder">{{ house.founder }}</span>
      </button>
    </section>

    <section class="details" aria-live="polite">
      <h2>{{ selectedHouse.name }}</h2>
      <dl>
        <div>
          <dt>Founder</dt>
          <dd>{{ selectedHouse.founder }}</dd>
        </div>
        <div>
          <dt>Colors</dt>
          <dd>{{ selectedHouse.colors }}</dd>
        </div>
        <div>
          <dt>Common room</dt>
          <dd>{{ selectedHouse.commonRoom }}</dd>
        </div>
        <div>
          <dt>Traits</dt>
          <dd>{{ selectedHouse.traits.join(' • ') }}</dd>
        </div>
      </dl>
    </section>
  </main>
</template>

<style scoped>
.app-shell {
  display: grid;
  gap: 1.5rem;
}

.hero,
.house-card,
.details {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-background-soft);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.hero,
.details {
  padding: 1.5rem;
}

.eyebrow {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8f6a19;
}

h1,
h2 {
  color: var(--color-heading);
  font-weight: 700;
}

h1 {
  margin-top: 0.5rem;
  font-size: clamp(2rem, 5vw, 3rem);
}

.intro {
  margin-top: 1rem;
  max-width: 60ch;
}

.houses {
  display: grid;
  gap: 1rem;
}

.house-card {
  display: grid;
  gap: 0.35rem;
  width: 100%;
  padding: 1.25rem;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.house-card:hover,
.house-card:focus-visible,
.house-card.active {
  border-color: #8f6a19;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(143, 106, 25, 0.2);
  outline: none;
}

.house-name {
  font-size: 1.2rem;
  font-weight: 700;
}

.house-founder {
  color: var(--color-text);
}

dl {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

dt {
  font-weight: 700;
}

dd {
  margin-top: 0.25rem;
}

@media (min-width: 700px) {
  .houses {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
