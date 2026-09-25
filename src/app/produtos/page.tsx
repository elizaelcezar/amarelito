import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type Category } from "@/data/products";

export const metadata: Metadata = { title: "Produtos" };

interface Props { searchParams: Promise<{ categoria?: string }>; }

export default async function ProdutosPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const active = categories.some((c) => c.key === categoria) ? (categoria as Category) : null;
  const visible = active ? products.filter((p) => p.category === active) : products;

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
      <h1 className="font-display text-2xl font-semibold">Produtos</h1>
      <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
        <Link href="/produtos" className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold ${!active ? "bg-cafe text-white" : "border border-cafe/10 bg-white text-cafe-soft"}`}>Todos</Link>
        {categories.map((c) => (
          <Link key={c.key} href={`/produtos?categoria=${c.key}`} className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold ${active === c.key ? "bg-cafe text-white" : "border border-cafe/10 bg-white text-cafe-soft"}`}>{c.emoji} {c.label}</Link>
        ))}
      </nav>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}
