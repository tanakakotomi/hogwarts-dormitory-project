# 🦉hogwarts-dormitory-project

ホグワーツ寮診断アプリです。9つの質問に回答し、4寮のポイント合計から診断結果を出します。

## 仕様概要

- 4寮（グリフィンドール / レイブンクロー / ハッフルパフ / スリザリン）に対して回答ごとにポイント加算
- 最終的に最もポイントが高い寮を診断結果として表示（同点時はランダムで決定）
- 結果画面では、診断された寮に属するキャラクター一覧を表示（APIデータ使用）
- 画面表示とGitHub Pages公開のため、`index.html` は `BASE_URL` を使う構成に調整済み

## 仕様（実装方針）

1. 責務の分離

- Store（Pinia）: 「どう計算するか」「どうデータを取得するか」というビジネスロジックを担当
- Components: 「どう表示するか」という見た目の担当
- 効果: コードが巨大化しても管理しやすい構成を維持しやすい

2. getters（Setup Storeでは computed 相当）

- `filteredCharacters` をstore側に置くことで、どのコンポーネントからでも「結果の寮のキャラ一覧」を参照しやすい

3. actions

- API通信を actions に隠蔽することで、コンポーネント側は `store.fetchCharacters()` の呼び出しに集中できる

4. `v-if` と `v-for`

- `v-if` で診断画面と結果画面を切り替え
- `v-for` で選択肢やAPI取得キャラクター一覧をループ表示

## 状態管理とデータ取得

- Pinia: 状態管理とAPI取得データの一元管理。取得済みデータはアプリ実行中に再利用可能
- props: 親（`HomeView`）から `ResultDisplay` へ渡し、`ResultDisplay` から `CharacterCard` へ必要データを渡す
- emits:
  - 子（`QuizQuestion`）でボタン押下時に「選択した寮」を親へ通知
  - 親（`HomeView`）が通知を受けてPiniaの状態を更新
- slot: `ResultDisplay` の枠組みを保ったまま、タイトルや補助文言を差し替え可能
- axios: キャラクターデータ取得に使用

## 採用APIスタイル

- Composition APIベースで実装。
- `script setup` と PiniaのSetup Store（`ref` / `computed` / 関数）を組み合わせて構成。

### Composition APIを採用した理由

- ロジックのまとまり単位で記述できるため、質問進行・ポイント計算・API取得の責務を分離しやすい。
- Storeとの親和性が高く、状態・算出値・操作（state/getters/actions）を見通しよく管理できる。
- 機能追加時に関連コードを追いやすく、コンポーネント分割後も保守しやすい。

## コンポーネント構成

- `src/views/HomeView.vue`: 親コンポーネント。画面切り替えとStore連携を担当
- `src/components/QuizQuestion.vue`: 質問と選択肢を表示し、回答をemit
- `src/components/ResultDisplay.vue`: 診断結果とキャラクター一覧を表示
- `src/components/CharacterCard.vue`: キャラクター1件分の表示
- `src/stores/quiz.ts`: ポイント計算、進行状態、API取得、結果抽出を管理
- `src/types/quiz.ts`: 型定義
- `src/constants/quiz.ts`: 質問データと定数