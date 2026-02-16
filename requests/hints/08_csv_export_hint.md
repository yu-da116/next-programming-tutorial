# TASK-08 ヒント: CSVエクスポート

## API側
- `GET /api/products/export` を追加して、CSV文字列を返します。
- `Content-Type: text/csv; charset=utf-8` を設定します。
- Excel互換を考えるなら UTF-8 BOM (`\uFEFF`) を先頭に付与します。

## フロント側
- エクスポートボタンで API を叩き、Blob をダウンロードします。
- ファイル名は `products_YYYYMMDD.csv` のように日付付きが実務的です。
