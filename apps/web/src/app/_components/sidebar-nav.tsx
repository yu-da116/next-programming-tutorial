'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SidebarNav() {
  const pathname = usePathname();
  const isProducts = pathname.startsWith('/products');

  return (
    <nav className="mt-6">
      <Link
        href="/products"
        className={`block py-3 px-6 hover:bg-slate-700 transition-colors border-l-4 ${
          isProducts ? 'border-blue-500 bg-slate-700' : 'border-transparent'
        }`}
      >
        商品管理
      </Link>
    </nav>
  );
}


