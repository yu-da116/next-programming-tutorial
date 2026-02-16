# TASK-08: CSVエクスポート機能

## 概要
一覧データをCSVでダウンロードできるようにしてください。

## 要件
- [ ] `GET /api/products/export` を追加する。
- [ ] ヘッダー付きCSVを返す（name, price, stock, status, updatedAt）。
- [ ] 一覧画面に「CSVエクスポート」ボタンを追加する。
- [ ] 日本語文字化け対策（UTF-8 BOM など）を検討する。

## ヒント
- `text/csv` と `Content-Disposition` ヘッダーを使います。


