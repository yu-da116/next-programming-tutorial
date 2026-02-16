# TASK-10 答え（詳細版）: ユニットテスト

## 1. 目的
UIを起動せずにロジックの正しさを高速確認します。

## 2. 推奨対象
- `src/lib/validation.ts`
- `src/lib/api.ts` のエラーメッセージ変換
- クエリパラメータ変換関数

## 3. 構成例
```text
apps/web/src/
  lib/
    validation.ts
    validation.test.ts
    api.ts
    api.test.ts
```

## 4. テスト例（Vitest）
```ts
import { describe, it, expect } from 'vitest';
import { productSchema } from './validation';

describe('productSchema', () => {
  it('accepts valid payload', () => {
    const parsed = productSchema.parse({ name: 'A', price: 0, stock: 0, status: 'active' });
    expect(parsed.name).toBe('A');
  });

  it('rejects decimal price', () => {
    expect(() => productSchema.parse({ name: 'A', price: 1.5, stock: 0, status: 'active' })).toThrow();
  });
});
```

## 5. Vue + Laravel 比較
- LaravelはPHPUnitでRequest/Service中心
- VueはVitestでComposable/Utility中心
- Nextフルスタックでは「lib配下」を先に関数化すると両者の良い所取りができる
