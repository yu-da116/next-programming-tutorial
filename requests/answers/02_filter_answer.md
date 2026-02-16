# TASK-02 答え（詳細版）: ステータスフィルタ

## 1. 目的
`active` / `inactive` の状態で商品を絞り込みます。検索と同様に、**クエリ拡張可能なAPI設計**に慣れる目的です。

## 2. 変更ディレクトリ構成
```text
apps/web/src/
  app/api/products/route.ts
  app/products/page.tsx
  lib/api.ts
  types/index.ts                 # 必要なら検索条件型を追加
```

## 3. 実装
```ts
// route.ts
const statusRaw = request.nextUrl.searchParams.get('status');
const status = statusRaw === 'active' || statusRaw === 'inactive' ? statusRaw : undefined;

const items = await prisma.product.findMany({
  where: status ? { status } : undefined,
  orderBy: { updatedAt: 'desc' },
});
```

```tsx
// page.tsx
<select value={status} onChange={(e) => setStatus(e.target.value as 'all' | 'active' | 'inactive')}>
  <option value="all">全て</option>
  <option value="active">有効</option>
  <option value="inactive">無効</option>
</select>
```

## 4. 処理
- UI選択値 -> APIクエリ `status` -> Prisma `where` -> 結果表示

## 5. Vue + Laravel 比較
- Laravelなら `Product::when($status, fn($q) => $q->where('status', $status))`
- Next/Prisma では `where: status ? { status } : undefined`
- どちらも「条件がある時だけ where を追加」する点は同じ

## 6. 確認
- 有効のみ / 無効のみ / 全件が切り替わる
