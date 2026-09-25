import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon } from "@/components/icons";
import { categories, products, type Category } from "@/data/products";

export const metadata: Metadata = { title: "Produtos" };

interface Props { searchParams: Promise<{ categoria?: string }>; }

export default async function ProdutosPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const active = categories.some((c) => c.key === categoria) ? (categoria as Category) : null;
  const visible = active ? products.filter((p) => p.category === active) : products;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <h1 className="pt-5 font-display text-2xl font-semibold">Produtos</h1>
      <nav className="sticky top-14 z-30 -mx-4 mt-3 flex gap-2 overflow-x-auto bg-cream/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6">
        <Link
          href="/produtos"
          className={`flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm font-bold ${!active ? "bg-cafe text-white" : "border border-cafe/10 bg-white text-cafe-soft"}`}
        >
          Todos
        </Link>
        {categories.map((c) => (
          <Link
            key={c.key}
            href={`/produtos?categoria=${c.key}`}
            aria-pressed={active === c.key}
            className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-bold ${active === c.key ? "bg-cafe text-white" : "border border-cafe/10 bg-white text-cafe-soft"}`}
          >
            <CategoryIcon category={c.key} size={16} aria-hidden /> {c.label}
          </Link>
        ))}
      </nav>
      <div className="mt-3 grid grid-cols-2 gap-3 pb-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}
