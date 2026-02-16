# TASK-06 答え（詳細版）: 共通エラーハンドリング

## 1. 目的
エラー表示の揺れをなくし、画面体験を統一します。

## 2. 変更構成
```text
apps/web/src/
  lib/api.ts                     # 共通エラーパーサ
  app/api/products/route.ts
  app/api/products/[id]/route.ts
  app/products/*.tsx
```

## 3. APIクライアント共通化
```ts
async function parseErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data?.message === 'string') return data.message;
  } catch {}
  return fallback;
}
```

## 4. API返却ルール
- 404: Not found
- 409: unique衝突
- 422: バリデーション
- 500: サーバーエラー

## 5. 解説
- 画面側は `throw new Error(...)` をそのまま表示するだけで統一される
- route側は「どの例外をどのHTTPコードにするか」を明確に持つ

## 6. Vue + Laravel 比較
- Laravelは `ValidationException` / `ModelNotFoundException` をHandlerで統一しやすい
- Nextは routeごとにハンドリングし、必要なら共通関数化する
