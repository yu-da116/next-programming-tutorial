# TASK-08 答え（詳細版）: CSVエクスポート

## 1. 目的
一覧データをCSVで外部利用できるようにします。

## 2. 変更構成
```text
apps/web/src/
  app/api/products/export/route.ts
  app/products/page.tsx
```

## 3. APIルート
```ts
const header = ['name', 'price', 'stock', 'status', 'updatedAt'];
const lines = items.map((p) => [p.name, p.price, p.stock, p.status, p.updatedAt.toISOString()].join(','));
const csv = `\uFEFF${[header.join(','), ...lines].join('\n')}`;

return new Response(csv, {
  headers: {
    'Content-Type': 'text/csv; charset=utf-8',
    'Content-Disposition': `attachment; filename="products_${yyyymmdd}.csv"`,
  },
});
```

## 4. フロント
- `fetch` -> `blob` -> ダウンロードリンク生成 -> クリック

## 5. Vue + Laravel 比較
- Laravelは `StreamedResponse` で実装しやすい
- Nextも `Response` で同様に実装可能
- 文字化け対策（BOM）はどちらも同様に必要
