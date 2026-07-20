import type { House, HousePoints, QuizQuestion } from '@/types/quiz'

export const HOUSE_LABELS: Record<House, string> = {
  Gryffindor: 'グリフィンドール',
  Ravenclaw: 'レイブンクロー',
  Hufflepuff: 'ハッフルパフ',
  Slytherin: 'スリザリン'
}

export const HOUSE_COMMENTS: Record<House, string> = {
  Gryffindor: 'グリフィンドール生のあなたは、きっと勇敢で決断力のある挑戦者タイプかもしれないね！',
  Ravenclaw: 'レイブンクロー生のあなたは、知的で探究心あふれるひらめきタイプかも！',
  Hufflepuff: 'ハッフルパフ生のあなたは、思いやりにあふれた誠実なサポーターかもしれないね！',
  Slytherin: 'スリザリン生のあなたは、きっと目標達成に強い戦略家かも！'
}

export const DEFAULT_HOUSE: House = 'Gryffindor'

export const INITIAL_HOUSE_POINTS: HousePoints = {
  Gryffindor: 0,
  Ravenclaw: 0,
  Hufflepuff: 0,
  Slytherin: 0
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: '困っている人がいたら、あなたならどうする？',
    options: [
      { label: '相手が安心できるよう寄り添う', house: 'Hufflepuff' },
      { label: 'すぐ助けに行く', house: 'Gryffindor' },
      { label: '他の人も巻き込んで効率よく解決する', house: 'Slytherin' },
      { label: 'どう助けるのが一番良いか考える', house: 'Ravenclaw' }
    ]
  },
  {
    id: 2,
    text: '新しいことを始めるときは？',
    options: [
      { label: '情報を集めてから始める', house: 'Ravenclaw' },
      { label: '成功する方法を考えてから動く', house: 'Slytherin' },
      { label: 'とりあえず挑戦する', house: 'Gryffindor' },
      { label: '周りと相談して決める', house: 'Hufflepuff' }
    ]
  },
  {
    id: 3,
    text: 'チームでのあなたの役割は？',
    options: [
      { label: 'アイデア担当', house: 'Ravenclaw' },
      { label: 'サポート役', house: 'Hufflepuff' },
      { label: 'リーダー役', house: 'Slytherin' },
      { label: '盛り上げ役', house: 'Gryffindor' }
    ]
  },
  {
    id: 4,
    text: '生きるうえで一番大事なのは？',
    options: [
      { label: '思いやり', house: 'Hufflepuff' },
      { label: '知識', house: 'Ravenclaw' },
      { label: '勇気', house: 'Gryffindor' },
      { label: '目標達成', house: 'Slytherin' }
    ]
  },
  {
    id: 5,
    text: 'ホグワーツで好きな授業は？',
    options: [
      { label: '呪文学', house: 'Ravenclaw' },
      { label: '闇の魔術に対する防衛術', house: 'Gryffindor' },
      { label: '魔法薬学', house: 'Slytherin' },
      { label: '魔法生物飼育学', house: 'Hufflepuff' }
    ]
  },
  {
    id: 6,
    text: '休日にしたいことは？',
    options: [
      { label: '家族や友達と過ごす', house: 'Hufflepuff' },
      { label: '自分磨きや勉強をする', house: 'Slytherin' },
      { label: '本や映画を楽しむ', house: 'Ravenclaw' },
      { label: 'キャンプやハイキングに出かける', house: 'Gryffindor' }
    ]
  },
  {
    id: 7,
    text: '友達からよく言われるのは？',
    options: [
      { label: '頭がいい', house: 'Ravenclaw' },
      { label: 'しっかりしている', house: 'Slytherin' },
      { label: '優しい', house: 'Hufflepuff' },
      { label: '行動力がある', house: 'Gryffindor' }
    ]
  },
  {
    id: 8,
    text: 'お宝を見つけたら？',
    options: [
      { label: 'まず触ってみる', house: 'Gryffindor' },
      { label: 'みんなに知らせる', house: 'Hufflepuff' },
      { label: 'どう活用できるか考える', house: 'Slytherin' },
      { label: '何なのか調べる', house: 'Ravenclaw' }
    ]
  },
  {
    id: 9,
    text: '好きな魔法動物は？',
    options: [
      { label: 'ヘドウィグ', house: 'Gryffindor' },
      { label: 'ヒッポグリフ', house: 'Ravenclaw' },
      { label: '二フラー', house: 'Hufflepuff' },
      { label: 'セストラル', house: 'Slytherin' }
    ]
  }
]
