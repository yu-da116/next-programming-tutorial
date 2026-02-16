# TASK-04 ヒント: バリデーション強化

## 何を強化するか
- `name`: 前後空白除去 + 1〜100文字
- `price`, `stock`: `int` かつ `>= 0`

## 実装のコツ
- `apps/web/src/lib/validation.ts` に schema を集約します。
- API ルートは共通 schema を import するだけにすると読みやすいです。

## エラー整形
- Zodエラーは `error.errors[0].message` を返せば教材としてシンプルです。
- ステータスは 422 に統一すると意味が明確です。
