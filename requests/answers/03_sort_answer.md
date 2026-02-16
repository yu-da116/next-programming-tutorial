# TASK-03 答え（詳細版）: ソート

## 1. 目的
一覧並び順を `updatedAt / price / stock` × `asc / desc` で切り替えます。

## 2. 変更構成
```text
apps/web/src/
  app/api/products/route.ts      # sortBy/order受け取り
  lib/api.ts                     # クエリ組み立て
  app/products/page.tsx          # ソートUI
```

## 3. 実装ポイント
```ts
const allowedSort = ['updatedAt', 'price', 'stock'] as const;
const sortByRaw = request.nextUrl.searchParams.get('sortBy') ?? 'updatedAt';
const orderRaw = request.nextUrl.searchParams.get('order') ?? 'desc';

const sortBy = allowedSort.includes(sortByRaw as any) ? sortByRaw : 'updatedAt';
const order = orderRaw === 'asc' ? 'asc' : 'desc';

const items = await prisma.product.findMany({
  orderBy: { [sortBy]: order },
});
```

## 4. 解説
- 許可リストで `sortBy` を制限しないと、意図しないフィールド指定が入る
- デフォルトを固定しておくと、UI未指定でも挙動が安定

## 5. Vue + Laravel 比較
- Laravel: `orderBy($sortBy, $order)` 前にバリデーション必須
- Next/Prisma: 同様に許可リストで防御
- フレームワーク違いより、**入力検証の考え方**が重要
