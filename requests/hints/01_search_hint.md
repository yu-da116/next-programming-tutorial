# TASK-01 ヒント: 商品検索

## まずやること
- `apps/web/src/app/api/products/route.ts` の `GET` を `request: NextRequest` 受け取りに変更します。
- `request.nextUrl.searchParams.get('q')` で検索語を取得します。

## API側のポイント
- `q` が空なら全件、値ありなら `where: { name: { contains: q } }` を使います。
- 大文字小文字を無視したいなら MySQL では照合順序に依存するため、まずはそのままでOKです。

## フロント側のポイント
- `apps/web/src/lib/api.ts` の `getProducts` に `q?: string` を追加します。
- `products/page.tsx` に入力欄を追加して、入力値を state 管理します。

## つまずきやすい点
- 空文字検索で API に `q=` を送ると意図せず絞り込みになる場合があります。
- `q?.trim()` して空ならクエリを付けない実装にすると安定します。
