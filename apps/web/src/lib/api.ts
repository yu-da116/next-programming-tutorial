import { Product, CreateProductInput, UpdateProductInput } from '@/types';

const API_BASE = '/api';

async function parseErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    if (data?.message && typeof data.message === 'string') {
      return data.message;
    }
  } catch {
    // ignore parse error
  }
  return fallback;
}

export const api = {
  async getProducts(): Promise<{ items: Product[]; total: number }> {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error(await parseErrorMessage(res, '商品の取得に失敗しました'));
    return res.json();
  },

  async getProduct(id: number): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error(await parseErrorMessage(res, '商品が見つかりません'));
    return res.json();
  },

  async createProduct(data: CreateProductInput): Promise<Product> {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(await parseErrorMessage(res, '作成に失敗しました'));
    }
    return res.json();
  },

  async updateProduct(id: number, data: UpdateProductInput): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(await parseErrorMessage(res, '更新に失敗しました'));
    }
    return res.json();
  },

  async deleteProduct(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(await parseErrorMessage(res, '削除に失敗しました'));
  },
};

