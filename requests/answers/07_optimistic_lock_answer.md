# TASK-07 答え（詳細版）: 楽観的ロック

## 1. 目的
同時編集による上書き事故を防ぎます。

## 2. 変更構成
```text
apps/web/src/
  app/products/[id]/edit/page.tsx
  app/api/products/[id]/route.ts
  types/index.ts
```

## 3. 実装の考え方
- 編集開始時に `updatedAt` を保持
- 更新時にその値を送る
- DB更新条件に `id + updatedAt` を使う

## 4. API例
```ts
const result = await prisma.product.updateMany({
  where: { id, updatedAt: new Date(body.updatedAt) },
  data: validated,
});

if (result.count === 0) {
  return NextResponse.json({ message: 'Conflict' }, { status: 409 });
}
```

## 5. UIの挙動
- 409受信時: 「他ユーザーが更新済み」メッセージ表示
- ユーザーに再取得を促す

## 6. Vue + Laravel 比較
- Laravelでも `where('updated_at', $updatedAt)` 条件更新で同様
- 技術差よりも「競合を明示エラーにする運用」が本質
