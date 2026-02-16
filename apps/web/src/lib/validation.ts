import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().trim().min(1).max(100),
  price: z.number().int().min(0),
  stock: z.number().int().min(0),
  status: z.enum(['active', 'inactive']),
});

export function parseProductId(rawId: string): number | null {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}


