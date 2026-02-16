# TASK-03 ヒント: ソート

## 設計のコツ
- `sortBy` と `order` を API に渡す設計にします。
- `sortBy` は許可リスト (`updatedAt`, `price`, `stock`) でバリデーションします。

## Prismaの書き方
- `orderBy: { [sortBy]: order }` のような動的生成が可能です。
- 型エラーを避けるため、変換関数で union 型に丸めると安全です。

## UIのコツ
- ソートUIは「項目select + 昇降順select」で十分です。
- 初期値を `updatedAt` / `desc` にすると管理画面らしくなります。
