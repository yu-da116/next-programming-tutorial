# プロジェクト構成ガイド

このドキュメントは「どこを触ると、どこに影響するか」を素早く把握するためのガイドです。

## 1. 全体マップ
- `docker-compose.yml`: web/db コンテナ定義、環境変数、起動コマンド
- `Makefile`: 開発用ショートカット（`make dev` など）
- `apps/web`: Next.js アプリ本体
- `requests`: 教材チケット
- `docs`: 補助ドキュメント

## 2. 起動フロー（make dev）
1. `docker compose up --build`
2. `db` 起動 + healthcheck
3. `web` の `scripts/start.sh` 実行
4. `prisma generate` → `wait-for-db.js` → `migrate deploy` → `db seed`
5. `next dev` 起動

起動周りを変える時は主に以下を編集します。
- `docker-compose.yml`
- `apps/web/scripts/start.sh`
- `apps/web/scripts/wait-for-db.js`
- `Makefile`

## 3. 画面とAPIの対応
- 画面: `apps/web/src/app/products/page.tsx`
  - 対応API: `GET /api/products`, `DELETE /api/products/:id`
- 画面: `apps/web/src/app/products/new/page.tsx`
  - 対応API: `POST /api/products`
- 画面: `apps/web/src/app/products/[id]/edit/page.tsx`
  - 対応API: `GET /api/products/:id`, `PUT /api/products/:id`
- 画面: `apps/web/src/app/page.tsx`
  - `/products` へのリダイレクト

## 4. APIの編集ポイント
- `apps/web/src/app/api/health/route.ts`: ヘルスチェック
- `apps/web/src/app/api/products/route.ts`: 一覧取得・新規作成
- `apps/web/src/app/api/products/[id]/route.ts`: 詳細取得・更新・削除

バリデーションを変える時は route を直接触らず、まず以下を編集します。
- `apps/web/src/lib/validation.ts`

DBアクセス共通は以下です。
- `apps/web/src/lib/prisma.ts`

## 5. 型とAPIクライアント
- 型定義: `apps/web/src/types/index.ts`
  - フロントで扱う `Product` 型を管理
- APIクライアント: `apps/web/src/lib/api.ts`
  - `fetch` の共通処理とエラー変換

「APIレスポンスが変わった」場合は、
1) route 側を修正
2) `types/index.ts` を修正
3) `lib/api.ts` を修正
4) 各 page を修正
の順で追うと漏れにくいです。

## 6. DB・Prisma関連
- スキーマ: `apps/web/prisma/schema.prisma`
- マイグレーション: `apps/web/prisma/migrations/*`
- seed: `apps/web/prisma/seed.ts`

項目追加（例: `description`）時の基本手順:
1. `schema.prisma` を更新
2. migration作成/適用
3. seed更新
4. API schema更新（`src/lib/validation.ts`）
5. 型更新（`src/types/index.ts`）
6. UI更新

## 7. デザイン変更
- 全体レイアウト: `apps/web/src/app/layout.tsx`
- サイドバー: `apps/web/src/app/_components/sidebar-nav.tsx`
- 画面別UI: `apps/web/src/app/products/*`
- グローバルCSS: `apps/web/src/app/globals.css`
- Tailwind設定: `apps/web/tailwind.config.js`
- PostCSS設定: `apps/web/postcss.config.js`

「Tailwindが効かない」場合は次を確認:
- `postcss.config.js` が存在するか
- `globals.css` に `@tailwind` 3行があるか
- `docker compose up --build` で再ビルドしたか

## 8. 追加機能を入れる時のおすすめ順序
1. `requests/xx_*.md` で要件確認
2. APIルートの仕様を先に固める
3. `validation.ts` と `types/index.ts` を更新
4. `lib/api.ts` を更新
5. 画面を更新
6. README/ガイドを更新

この順序にすると、実装とレビューが安定します。
