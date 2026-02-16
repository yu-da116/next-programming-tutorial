# TASK-03: 一覧のソート機能（価格、更新日など）

## 概要
商品一覧の並び替えを UI と API の両方で対応してください。

## 要件
- [ ] 一覧画面にソート項目（`updatedAt`, `price`, `stock`）を追加する。
- [ ] 昇順/降順の切り替えを追加する。
- [ ] API (`GET /api/products`) が `sortBy`, `order` を受け取れるようにする。
- [ ] 不正な値はデフォルト（`updatedAt desc`）にフォールバックする。

## ヒント
- Prisma の `orderBy` はオブジェクトで動的生成できます。


