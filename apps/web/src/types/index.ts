export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

export interface UpdateProductInput extends CreateProductInput {}

