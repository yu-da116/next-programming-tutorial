import { PrismaClient, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: 'MacBook Pro', price: 250000, stock: 10, status: ProductStatus.active },
    { name: 'iPhone 15', price: 120000, stock: 50, status: ProductStatus.active },
    { name: 'iPad Air', price: 90000, stock: 20, status: ProductStatus.active },
    { name: 'AirPods Pro', price: 35000, stock: 100, status: ProductStatus.active },
    { name: 'Apple Watch', price: 60000, stock: 30, status: ProductStatus.active },
    { name: 'Magic Mouse', price: 10000, stock: 0, status: ProductStatus.inactive },
    { name: 'Magic Keyboard', price: 20000, stock: 15, status: ProductStatus.active },
    { name: 'Studio Display', price: 200000, stock: 5, status: ProductStatus.active },
    { name: 'Mac mini', price: 80000, stock: 12, status: ProductStatus.active },
    { name: 'Apple TV 4K', price: 25000, stock: 8, status: ProductStatus.inactive },
  ];

  console.log('Seeding products...');

  for (const product of products) {
    const existing = await prisma.product.findUnique({
      where: { name: product.name },
      select: {
        id: true,
        price: true,
        stock: true,
        status: true,
      },
    });

    if (!existing) {
      await prisma.product.create({ data: product });
      continue;
    }

    const needsUpdate =
      existing.price !== product.price ||
      existing.stock !== product.stock ||
      existing.status !== product.status;

    if (needsUpdate) {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          price: product.price,
          stock: product.stock,
          status: product.status,
        },
      });
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

