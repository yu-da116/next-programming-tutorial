# TASK-09 答え（詳細版）: Playwright E2E

## 1. 目的
CRUDの主要導線を自動テスト化し、退行を検知します。

## 2. 追加構成
```text
apps/web/
  playwright.config.ts
  tests/
    products.spec.ts
```

## 3. 基本シナリオ
1. 一覧が表示される
2. 新規作成できる
3. 編集できる
4. 削除できる

## 4. サンプル
```ts
test('create product', async ({ page }) => {
  await page.goto('/products/new');
  await page.getByLabel('商品名').fill('E2E Product');
  await page.getByLabel('価格').fill('1000');
  await page.getByLabel('在庫').fill('10');
  await page.getByRole('button', { name: '商品を保存する' }).click();
  await expect(page).toHaveURL('/products');
  await expect(page.getByText('E2E Product')).toBeVisible();
});
```

## 5. Vue + Laravel 比較
- Laravelなら Dusk / Pest Browser
- SPA側は Playwright / Cypress が主流
- フロント+API一体のNext構成は、E2Eの対象が明確で書きやすい
