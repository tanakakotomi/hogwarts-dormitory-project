export const HOUSES = ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'] as const

export type House = (typeof HOUSES)[number]

export interface Character {
  id: string
  name: string
  house: string
  image: string
  actor: string
  patronus: string
}

export interface QuizOption {
  label: string
  house: House
}

export interface QuizQuestion {
  id: number
  text: string
  options: QuizOption[]
}

export type HousePoints = Record<House, number>
