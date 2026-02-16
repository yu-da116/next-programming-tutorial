'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ProductStatus } from '@/types';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = parseInt(params.id);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    status: 'active' as ProductStatus,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await api.getProduct(id);
        setFormData({
          name: product.name,
          price: product.price,
          stock: product.stock,
          status: product.status,
        });
      } catch (err) {
        setError('商品が見つかりません');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // バリデーション
    if (!formData.name || formData.name.length > 100) {
      setError('商品名は1文字以上100文字以内で入力してください');
      return;
    }
    if (formData.price < 0 || formData.stock < 0) {
      setError('価格と在庫は0以上で入力してください');
      return;
    }

    try {
      setSaving(true);
      await api.updateProduct(id, formData);
      router.push('/products?message=updated');
    } catch (err: any) {
      setError(err.message || '更新に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10">読み込み中...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/products" className="text-blue-600 hover:underline">
          ← 商品一覧に戻る
        </Link>
        <h2 className="text-2xl font-bold mt-2">商品編集</h2>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8">
        {error && <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品名</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">価格</label>
              <input
                type="number"
                required
                min="0"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">在庫</label>
              <input
                type="number"
                required
                min="0"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ステータス</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ProductStatus })}
            >
              <option value="active">有効</option>
              <option value="inactive">無効</option>
            </select>
          </div>

          <div className="flex justify-end pt-4 space-x-4">
            <Link
              href="/products"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md transition-colors"
            >
              キャンセル
            </Link>
            <button
              type="submit"
              disabled={saving}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors ${
                saving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {saving ? '保存中...' : '更新を保存する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

