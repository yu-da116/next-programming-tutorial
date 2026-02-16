# TASK-05 答え（詳細版）: ページネーション

## 1. 目的
件数増加に備えて、一覧を分割取得にします。

## 2. 変更構成
```text
apps/web/src/
  app/api/products/route.ts
  lib/api.ts
  app/products/page.tsx
  types/index.ts
```

## 3. API実装
```ts
const page = Math.max(1, Number(request.nextUrl.searchParams.get('page') ?? 1));
const pageSize = Math.min(100, Math.max(1, Number(request.nextUrl.searchParams.get('pageSize') ?? 20)));
const skip = (page - 1) * pageSize;

const [total, items] = await Promise.all([
  prisma.product.count({ where }),
  prisma.product.findMany({ where, orderBy, skip, take: pageSize }),
]);

return NextResponse.json({ items, total, page, pageSize });
```

## 4. フロント実装
- `page` state を持ち、前へ/次へで更新
- `total` と `pageSize` から最終ページ判定

## 5. Vue + Laravel 比較
- Laravelは `paginate()` でメタ情報込み返却が簡単
- Prismaは `count + findMany` を明示的に書く
- 明示実装の分、学習効果が高い
