# TASK-04 答え（詳細版）: バリデーション強化

## 1. 目的
入力品質を上げ、APIの返却を統一します。

## 2. 変更構成
```text
apps/web/src/
  lib/validation.ts              # 共通Zod schema
  app/api/products/route.ts
  app/api/products/[id]/route.ts
```

## 3. 共通schema
```ts
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().trim().min(1).max(100),
  price: z.number().int().min(0),
  stock: z.number().int().min(0),
  status: z.enum(['active', 'inactive']),
});
```

## 4. APIでの利用
```ts
try {
  const body = await request.json();
  const validated = productSchema.parse(body);
  // create/update
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ message: error.errors[0].message }, { status: 422 });
  }
}
```

## 5. 解説
- `trim()` により「空白だけ文字列」を排除
- `int()` で小数を排除
- routeごとの重複定義を無くし、修正コストを削減

## 6. Vue + Laravel 比較
- Laravel: FormRequestで一元管理
- Next: `lib/validation.ts` で同等の一元管理
- 役割は同じで、実装場所が異なるだけ
