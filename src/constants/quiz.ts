import type { House, HousePoints, QuizQuestion } from '@/types/quiz'

export const HOUSE_LABELS: Record<House, string> = {
  Gryffindor: 'グリフィンドール',
  Ravenclaw: 'レイブンクロー',
  Hufflepuff: 'ハッフルパフ',
  Slytherin: 'スリザリン',
  Azkaban: 'アズカバン行き'
}

export const HOUSE_COMMENTS: Record<House, string> = {
  Gryffindor: 'グリフィンドール生のあなたは、きっと困難な状況でも果敢に立ち向かえる勇敢なタイプかも！',
  Ravenclaw: 'レイブンクロー生のあなたは、知的で探究心にあふれる、ユニークなひらめきタイプかもしれないね！',
  Hufflepuff: 'ハッフルパフ生のあなたは、努力家で仲間思いなタイプかもしれないね！',
  Slytherin: 'スリザリン生のあなたは、きっと自尊心が高い、野心家タイプかも！蛇語を話せるかも！？',
  Azkaban: 'あなたはホグワーツには入学できないみたい泣。ディメンターに魂を吸い取られないように気をつけて！'
}

export const DEFAULT_HOUSE: House = 'Gryffindor'

export const INITIAL_HOUSE_POINTS: HousePoints = {
  Gryffindor: 0,
  Ravenclaw: 0,
  Hufflepuff: 0,
  Slytherin: 0,
  Azkaban: 0
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: '困っている人がいたら、あなたならどうする？',
    options: [
      { label: '相手が安心できるよう寄り添う', house: 'Hufflepuff' },
      { label: 'デス・イーター（死喰い人）を呼び出す', house: 'Azkaban' },
      { label: 'すぐさま助けに行く', house: 'Gryffindor' },
      { label: '少し面倒に思う', house: 'Slytherin' },
      { label: 'どう助けるのが一番良いか一緒に考える', house: 'Ravenclaw' }
    ]
  },
  {
    id: 2,
    text: '新しいことを始めるときは？',
    options: [
      { label: '情報を集めてから始める', house: 'Ravenclaw' },
      { label: '確実に成功する方法を考えてから動く', house: 'Slytherin' },
      { label: 'とりあえず挑戦してみる', house: 'Gryffindor' },
      { label: 'まずは闇の気配がないか探る', house: 'Azkaban' },
      { label: '周りと相談してから決める', house: 'Hufflepuff' }
    ]
  },
  {
    id: 3,
    text: 'チームでのあなたの役割は？',
    options: [
      { label: '静観担当', house: 'Azkaban' },
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
      { label: '自身に利益があるかどうか', house: 'Azkaban' },
      { label: '勇気', house: 'Gryffindor' },
      { label: '目標達成', house: 'Slytherin' }
    ]
  },
  {
    id: 5,
    text: 'ホグワーツで好きな授業は？',
    options: [
      { label: '呪文学', house: 'Ravenclaw' },
      { label: '闇の魔術に対する防衛術', house: 'Azkaban' },
      { label: '占い学', house: 'Gryffindor' },
      { label: '変身術', house: 'Slytherin' },
      { label: '魔法生物飼育学', house: 'Hufflepuff' }
    ]
  },
  {
    id: 6,
    text: '休日にしたいことは？',
    options: [
      { label: '家族や友達とのんびり過ごす', house: 'Hufflepuff' },
      { label: '自分磨きや勉強をする', house: 'Slytherin' },
      { label: '本や映画を楽しむ', house: 'Ravenclaw' },
      { label: '廃墟などいわく付きの場所を訪れる', house: 'Azkaban' },
      { label: 'キャンプやハイキングに出かける', house: 'Gryffindor' }
    ]
  },
  {
    id: 7,
    text: '友達からよく言われるのは？',
    options: [
      { label: '他人にあまり興味がなさそう', house: 'Azkaban' },
      { label: '頭がいい', house: 'Ravenclaw' },
      { label: 'しっかりしている', house: 'Slytherin' },
      { label: '優しい', house: 'Hufflepuff' },
      { label: '行動力がある', house: 'Gryffindor' }
    ]
  },
  {
    id: 8,
    text: 'お宝を見つけたらどうする？',
    options: [
      { label: 'まず触ってみる', house: 'Gryffindor' },
      { label: 'みんなに知らせる', house: 'Hufflepuff' },
      { label: 'どう活用できるか考える', house: 'Slytherin' },
      { label: '何なのか調べる', house: 'Ravenclaw' },
      { label: '一旦持ち帰って闇の帝王に委ねる', house: 'Azkaban' }
    ]
  },
  {
    id: 9,
    text: '好きな魔法生物は？',
    options: [
			{ label: '二フラー', house: 'Hufflepuff' },
      { label: 'ヘドウィグ', house: 'Gryffindor' },
      { label: 'フォークス', house: 'Ravenclaw' },
      { label: 'ディメンター', house: 'Azkaban' },
			{ label: 'マンドレイク', house: 'Slytherin' },
      { label: 'ドビー', house: 'Gryffindor' }
    ]
  },
  {
    id: 10,
    text: '好きな魔法界のお菓子は？',
    options: [
			{ label: '百味ビーンズ', house: 'Gryffindor' },
      { label: '蛙チョコ', house: 'Hufflepuff' },
      { label: 'ハグリッドの手作りケーキ', house: 'Ravenclaw' },
      { label: 'フィフィ・フィズビー（舐めている間に、数センチ浮き上がれる炭酸入りキャンディ）', house: 'Slytherin' }
    ]
  }
]

// Slytherin confirmation (10th) texts/options
export const SLYTHERIN_CONFIRM_TEXT = '結果がスリザリンになりそうです・・！どうしたい？'

export const SLYTHERIN_CONFIRM_OPTIONS = [
  { label: 'スリザリンは嫌だ！！もう一回診断して！', action: 'reset' },
  { label: 'スリザリンに行く', action: 'confirm' }
]
