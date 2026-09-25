import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type Category } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Confira sucos naturais, maionese, farofas e sobremesas artesanais da Amarelito, com tamanhos individual, casal e família.",
};

interface ProdutosPageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function ProdutosPage({ searchParams }: ProdutosPageProps) {
  const { categoria } = await searchParams;
  const active = categories.some((c) => c.key === categoria)
    ? (categoria as Category)
    : null;

  const visible = active
    ? products.filter((p) => p.category === active)
    : products;

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
      <header>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          Nossos produtos
        </h1>
        <p className="mt-2 max-w-xl text-cafe-soft">
          Tudo feito no dia, com ingredientes de verdade. Escolha o tamanho
          ideal — do individual à família.
        </p>
      </header>

      <nav className="mt-5 flex gap-2 overflow-x-auto pb-1" aria-label="Categorias">
        <Link
          href="/produtos"
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
            !active
              ? "bg-cafe text-white"
              : "border border-cafe/15 bg-white text-cafe-soft hover:bg-mel/30"
          }`}
        >
          Todos
        </Link>
        {categories.map((category) => (
          <Link
            key={category.key}
            href={`/produtos?categoria=${category.key}`}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              active === category.key
                ? "bg-cafe text-white"
                : "border border-cafe/15 bg-white text-cafe-soft hover:bg-mel/30"
            }`}
          >
            {category.emoji} {category.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <p className="mt-8 rounded-2xl bg-mel/25 px-4 py-3 text-sm text-cafe-soft">
        🍰 As sobremesas são produzidas apenas no fim de semana (sexta, sábado
        e domingo).
      </p>
    </div>
  );
}
