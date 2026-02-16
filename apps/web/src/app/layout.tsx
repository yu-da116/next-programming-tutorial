import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarNav } from "./_components/sidebar-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Admin",
  description: "Mob Programming Tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-800 text-white flex-shrink-0">
            <div className="p-6">
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <SidebarNav />
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-16 bg-white border-b flex items-center justify-between px-8">
              <div className="font-medium text-gray-600">Mob Programming Tutorial</div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Admin User</span>
              </div>
            </header>

            {/* Content */}
            <main className="p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

