#!/bin/sh
set -eu

echo "Generating Prisma Client..."
npx prisma generate

echo "Waiting for database to be ready (including DNS resolution)..."
node scripts/wait-for-db.js

echo "Executing migrations..."
npx prisma migrate deploy

echo "Seeding database..."
npx prisma db seed

echo "Starting Next.js dev server..."
exec npm run dev
