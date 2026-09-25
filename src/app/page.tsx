import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PinIcon } from "@/components/icons";
import { categories, products } from "@/data/products";
import { defaultCity, cityLabel } from "@/data/serviceArea";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Hero compacto */}
      <section className="mt-4 rounded-[2rem] bg-gradient-to-br from-mel via-mel-2 to-cream-2 px-6 py-8 sm:px-8 sm:py-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-folha">
          <PinIcon size={13} /> {cityLabel(defaultCity)} · entrega hoje até 18h
        </span>
        <h1 className="mt-3 max-w-xl font-display text-[2rem] font-semibold leading-none sm:text-4xl">
          Fresquinho, direto pra sua casa.
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-cafe-soft sm:text-base">
          Suco, polpas congeladas, maionese, farofas e sobremesas. Tamanhos
          P/M/G.
        </p>
        <Link
          href="#cardapio"
          className="mt-5 inline-block rounded-full bg-cafe px-6 py-3 text-sm font-bold text-white"
        >
          Ver cardápio
        </Link>
      </section>

      {/* Cardápio */}
      <section id="cardapio" className="scroll-mt-20 pt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Cardápio</h2>
          <Link
            href="/produtos"
            className="text-sm font-bold text-cafe-soft hover:text-cafe"
          >
            Ver tudo →
          </Link>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          <Link
            href="#cardapio"
            className="shrink-0 rounded-full bg-cafe px-4 py-1.5 text-sm font-bold text-white"
          >
            Todos
          </Link>
          {categories.map((c) => (
            <a
              key={c.key}
              href={`#cat-${c.key}`}
              className="shrink-0 rounded-full border border-cafe/10 bg-white px-4 py-1.5 text-sm font-bold text-cafe-soft"
            >
              {c.emoji} {c.label}
            </a>
          ))}
        </div>

        {categories.map((cat) => {
          const items = products.filter((p) => p.category === cat.key);
          if (items.length === 0) return null;
          return (
            <div key={cat.key} id={`cat-${cat.key}`} className="scroll-mt-20 pt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cafe-soft">
                {cat.emoji} {cat.label}
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Nota compacta */}
      <p className="mt-8 rounded-2xl bg-white px-4 py-3 text-center text-sm text-cafe-soft">
        Avulso ou assinatura semanal/mensal · 🍰 sobremesas só de sex a dom
      </p>

      {/* Cobertura minimal */}
      <section id="atendimento" className="scroll-mt-20 pt-6">
        <details className="rounded-2xl border border-cafe/10 bg-white px-4 py-3">
          <summary className="cursor-pointer list-none text-sm font-bold text-cafe">
            📍 Entregamos em {cityLabel(defaultCity)} — ver bairros
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-cafe-soft">
            {defaultCity.neighborhoods.join(" · ")}
          </p>
        </details>
      </section>
    </div>
  );
}
