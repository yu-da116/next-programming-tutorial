# TASK-05 ヒント: ページネーション

## API側
- `page` と `pageSize` をクエリで受け、`skip`, `take` に変換します。
- `total` は `count()` で取得し、`items` は `findMany()` で取得します。

## フロント側
- `page` を state 管理し、ページ変更時に再取得します。
- 既存の `loading` 表示を流用できます。

## つまずきポイント
- `page` の最小値は 1 に丸める。
- `pageSize` に上限（例: 100）を設けると安全です。
