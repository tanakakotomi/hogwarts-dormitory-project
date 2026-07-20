# hogwarts-dormitory-project

ホグワーツ寮診断アプリです。8つの質問に回答し、4寮のポイント合計から診断結果を出します。

## 仕様概要

- 4寮（グリフィンドール / レイブンクロー / ハッフルパフ / スリザリン）に対して回答ごとにポイント加算
- 最終的に最もポイントが高い寮を診断結果として表示
- 結果画面では、診断された寮に属するキャラクター一覧を表示（APIデータ使用）

## 設計方針（責務の分離）

- Store（Pinia）:
	計算ロジックとデータ取得を担当。寮ポイント計算、診断状態、キャラクター取得などのビジネスロジックを集約。
- Components:
	表示ロジックを担当。質問表示、結果表示、キャラクターカード表示を分割。
- 効果:
	ロジックとUIを分離できるため、コード量が増えても保守しやすい構成。

## 状態管理とデータ取得

- Pinia:
	診断状態とAPI取得データを一元管理し、必要な画面で再利用。
- getters（computed）:
	`filteredCharacters` で「結果の寮に一致するキャラクター一覧」を共通で参照可能。
- actions:
	`fetchCharacters()` にAPI通信を隠蔽し、コンポーネント側はシンプルな呼び出しのみで利用可能。
- axios:
	キャラクターデータ取得に使用。

## 採用APIスタイル

- Composition APIベースで実装。
- `script setup` と PiniaのSetup Store（`ref` / `computed` / 関数）を組み合わせて構成。

### Composition APIを採用した理由

- ロジックのまとまり単位で記述できるため、質問進行・ポイント計算・API取得の責務を分離しやすい。
- Storeとの親和性が高く、状態・算出値・操作（state/getters/actions）を見通しよく管理できる。
- 機能追加時に関連コードを追いやすく、コンポーネント分割後も保守しやすい。

## Vueの実装ポイント

- v-if:
	診断中画面と結果画面の切り替えに使用。
- v-for:
	選択肢やキャラクター一覧の繰り返し描画に使用。
- props:
	親で持つデータを子コンポーネントへ受け渡し。
- emits:
	子（QuizQuestion）から親（HomeView）へ選択結果を通知し、親がStoreを更新。
- slot:
	ResultDisplayの枠を保ちながら、タイトルや補助テキストなどの中身を差し替え可能。

## コンポーネント構成

- `src/views/HomeView.vue`: 親コンポーネント。画面切り替えとStore連携を担当。
- `src/components/QuizQuestion.vue`: 質問と選択肢を表示し、回答をemit。
- `src/components/ResultDisplay.vue`: 診断結果とキャラクター一覧を表示。
- `src/components/CharacterCard.vue`: キャラクター1件分の表示。
- `src/stores/quiz.ts`: 質問データ、ポイント計算、API取得、結果抽出を管理。