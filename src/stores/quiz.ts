import axios from 'axios'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  DEFAULT_HOUSE,
  HOUSE_COMMENTS,
  HOUSE_LABELS,
  INITIAL_HOUSE_POINTS,
  QUIZ_QUESTIONS
} from '@/constants/quiz'
import { HOUSES, type Character, type House, type HousePoints } from '@/types/quiz'

// APIのURLを定義
const API_URL = 'https://hp-api.onrender.com/api/characters'

interface CharacterApiItem {
  id?: string
  name?: string
  house?: string
  image?: string
  actor?: string
}

function createInitialHousePoints(): HousePoints {
  return { ...INITIAL_HOUSE_POINTS }
}

/**
 * クイズの状態を管理するPiniaストア
 * 質問一覧、寮ごとのポイント、現在の質問番号、
 * 診断の完了状態、キャラクターデータを管理
 */
export const useQuizStore = defineStore('quiz', () => {
  const questions = QUIZ_QUESTIONS

  const housePoints = ref<HousePoints>(createInitialHousePoints())

  const currentQuestionIndex = ref(0)
  const quizFinished = ref(false)
  const resultHouse = ref<House>(DEFAULT_HOUSE)
  const characters = ref<Character[]>([])
  const isLoadingCharacters = ref(false)
  const loadError = ref('')

  const currentQuestion = computed(() => questions[currentQuestionIndex.value])

  const resultHouseLabel = computed(() => HOUSE_LABELS[resultHouse.value])
  const resultComment = computed(() => HOUSE_COMMENTS[resultHouse.value])

  const filteredCharacters = computed(() =>
    characters.value.filter(
      (character) =>
        character.house === resultHouse.value &&
        typeof character.image === 'string' &&
        character.image.trim().length > 0
    )
  )

	/**
	 * キャラクターデータをAPIから取得
	 */
  async function fetchCharacters() {
    if (characters.value.length > 0 || isLoadingCharacters.value) {
      return
    }

    isLoadingCharacters.value = true
    loadError.value = ''

    try {
      const response = await axios.get<CharacterApiItem[]>(API_URL)
      const data = Array.isArray(response.data) ? response.data : []

      characters.value = data.map((item, index) => ({
        id: item.id || `${item.name}-${index}`,
        name: item.name || '名前不明',
        house: item.house || '',
        image: item.image || '',
        actor: item.actor || '不明'
      }))
    } catch (error) {
      loadError.value = 'キャラクターデータの取得に失敗しました。時間をおいて再試行してください。'
      console.error(error)
    } finally {
      isLoadingCharacters.value = false
    }
  }

  function decideResultHouse(): House {
    const ranking = HOUSES
      .map((house) => ({ house, points: housePoints.value[house] }))
      .sort((a, b) => b.points - a.points)

    const topPoints = ranking[0]?.points ?? 0
    const tiedHouses = ranking.filter((item) => item.points === topPoints)
    const selectedIndex = Math.floor(Math.random() * tiedHouses.length)

    // ランダムに選ばれた寮を返す。もし何も選ばれなかった場合はデフォルトの寮（Gryffindor）を返す。
    return tiedHouses[selectedIndex]?.house ?? DEFAULT_HOUSE
  }

  function answerQuestion(house: House) {
    housePoints.value[house] += 1

    if (currentQuestionIndex.value < questions.length - 1) {
      currentQuestionIndex.value += 1
      return
    }

    resultHouse.value = decideResultHouse()
    quizFinished.value = true
  }

  function resetQuiz() {
    housePoints.value = createInitialHousePoints()
    currentQuestionIndex.value = 0
    quizFinished.value = false
    resultHouse.value = DEFAULT_HOUSE
  }

  return {
    questions,
    housePoints,
    currentQuestionIndex,
    quizFinished,
    characters,
    isLoadingCharacters,
    loadError,
    currentQuestion,
    resultHouse,
    resultHouseLabel,
    resultComment,
    filteredCharacters,
    fetchCharacters,
    answerQuestion,
    resetQuiz
  }
})
