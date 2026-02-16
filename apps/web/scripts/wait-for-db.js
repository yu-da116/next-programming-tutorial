const { PrismaClient } = require('@prisma/client');

async function main() {
  const url = process.env.DATABASE_URL || "mysql://app:app@db:3306/app";
  
  // PrismaClient生成後に接続試行を繰り返す
  let retries = 30;
  console.log(`Checking database connection to: ${url}`);
  
  while (retries > 0) {
    const prisma = new PrismaClient({
      datasources: { db: { url } },
    });

    try {
      // タイムアウト付きでクエリ実行（DNS解決や接続のハングを防ぐ）
      await Promise.race([
        prisma.$queryRaw`SELECT 1`,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Query Timeout')), 5000))
      ]);
      
      console.log('Database is ready and responding!');
      await prisma.$disconnect();
      process.exit(0);
    } catch (e) {
      const errorMsg = e.message ? e.message.split('\n')[0] : 'Unknown connection error';
      console.log(`Database not ready... (${retries} retries left) - Reason: ${errorMsg}`);
      
      await prisma.$disconnect();
      retries--;
      // リトライ間隔を3秒にして、DNSやネットワークの安定を待つ
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  
  console.error('Database connection timed out after 30 retries');
  process.exit(1);
}

main();
