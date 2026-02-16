# TASK-01: 商品検索機能の実装

## 概要
商品一覧画面で、商品名による部分一致検索ができるようにしてください。

## 要件
- [ ] 一覧画面の上部に検索窓（input）を追加する。
- [ ] 入力内容に応じて、リアルタイムまたは検索ボタン押下で一覧を絞り込む。
- [ ] API (`GET /api/products`) がクエリパラメータ `q` を受け取れるように拡張する。
- [ ] Prisma の `contains` を使用してDB検索を行う。

## ヒント
- `apps/web/src/app/api/products/route.ts` で `request.nextUrl.searchParams` を使ってパラメータを取得できます。
- フロントエンドでは `useEffect` で検索クエリの変化を監視するか、フォーム送信イベントを利用します。