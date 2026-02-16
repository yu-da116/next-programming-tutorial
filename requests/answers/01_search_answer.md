# TASK-01 答え（詳細版）: 商品検索

## 1. 目的
`/products` 一覧に「商品名の部分一致検索」を追加します。  
このタスクは、**一覧取得APIのクエリ拡張**と**フロントの入力状態管理**の基本練習です。

## 2. 変更ディレクトリ構成
```text
apps/web/src/
  app/
    api/products/route.ts         # GETの検索クエリ対応
    products/page.tsx             # 検索入力UIと再取得処理
  lib/
    api.ts                        # getProductsの引数拡張
```

## 3. 実装手順

### Step 1: APIで `q` を受け取る
```ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim() ?? '';

  const items = await prisma.product.findMany({
    where: q ? { name: { contains: q } } : undefined,
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ items, total: items.length });
}
```

### Step 2: APIクライアントを拡張
```ts
async getProducts(params?: { q?: string }): Promise<{ items: Product[]; total: number }> {
  const usp = new URLSearchParams();
  if (params?.q?.trim()) usp.set('q', params.q.trim());

  const suffix = usp.toString() ? `?${usp.toString()}` : '';
  const res = await fetch(`/api/products${suffix}`);
  if (!res.ok) throw new Error(await parseErrorMessage(res, '商品の取得に失敗しました'));
  return res.json();
}
```

### Step 3: 一覧画面に検索フォームを追加
```tsx
const [q, setQ] = useState('');

const fetchProducts = async () => {
  setLoading(true);
  try {
    const data = await api.getProducts({ q });
    setProducts(data.items);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchProducts();
}, [q]);
```

## 4. 処理フロー
1. ユーザーが検索語を入力
2. `q` state が更新
3. `useEffect` で再取得
4. `GET /api/products?q=...` 実行
5. Prisma `contains` で絞り込み
6. 一覧再描画

## 5. Next.js構成の意図
- APIは `Route Handler` に閉じるため、画面と同一リポジトリで完結
- `lib/api.ts` に集約することで画面は「使うだけ」にできる

## 6. Vue + Laravel 比較
- **Vue + Laravel**: Laravelコントローラで `Request $request->query('q')`、VueはAxiosで `/api/products?q=`
- **この構成**: Next Route Handlerで `request.nextUrl.searchParams`、Reactは`fetch`ラッパ
- 違いは実装場所だけで、**責務分離（画面/通信/DB）は同じ**

## 7. 動作確認
- `/products` で "Mac" 入力 → MacBook Pro / Mac mini が絞り込み表示
- 空文字で全件に戻る
