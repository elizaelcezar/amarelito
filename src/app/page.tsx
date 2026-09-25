import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PinIcon } from "@/components/icons";
import { categories, products } from "@/data/products";
import { defaultCity, cityLabel } from "@/data/serviceArea";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const semanal = Math.round(siteConfig.discounts.semanal * 100);
  const mensal = Math.round(siteConfig.discounts.mensal * 100);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Hero — recorrência como protagonista */}
      <section className="mt-4 rounded-[2rem] bg-gradient-to-br from-mel via-mel-2 to-cream-2 px-6 py-8 sm:px-8 sm:py-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-folha">
          🔁 Assinatura com desconto · {cityLabel(defaultCity)}
        </span>
        <h1 className="mt-3 max-w-xl font-display text-[2rem] font-semibold leading-none sm:text-4xl">
          Assine e receba fresquinho toda semana.
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-cafe-soft sm:text-[15px]">
          Suco, polpas, maionese e farofas com <strong className="text-folha">{semanal}% OFF na semanal</strong> e{" "}
          <strong className="text-folha">{mensal}% OFF na mensal</strong>. Avulso quando quiser, sem fidelidade.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link href="#cardapio" className="rounded-full bg-cafe px-6 py-3 text-sm font-bold text-white">
            Montar assinatura
          </Link>
          <Link href="/assinatura" className="rounded-full border border-cafe/15 bg-white px-6 py-3 text-sm font-bold text-cafe">
            Como funciona
          </Link>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-cafe-soft">
          <PinIcon size={13} /> Entrega hoje até 18h · cancela no WhatsApp quando quiser
        </p>
      </section>

      {/* Faixa recorrência — curta e direta */}
      <section className="mt-4 rounded-2xl border border-folha/15 bg-white px-4 py-3 sm:px-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-1.5 text-sm leading-relaxed">
            <span className="font-bold text-cafe">🔁 Como funciona:</span>
            <span className="text-cafe-soft">escolha os itens → receba toda</span>
            <span className="rounded-full bg-folha px-2 py-0.5 text-xs font-bold text-white">semana -{semanal}%</span>
            <span className="text-cafe-soft">ou</span>
            <span className="rounded-full bg-folha px-2 py-0.5 text-xs font-bold text-white">mês -{mensal}%</span>
            <span className="text-cafe-soft">· sem fidelidade</span>
          </p>
          <Link href="/assinatura" className="shrink-0 text-sm font-bold text-laranja hover:underline">
            Ver planos →
          </Link>
        </div>
      </section>

      {/* Cardápio */}
      <section id="cardapio" className="scroll-mt-20 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Cardápio</h2>
          <Link href="/produtos" className="text-sm font-bold text-cafe-soft hover:text-cafe">
            Ver tudo →
          </Link>
        </div>
        <p className="mt-1 text-sm text-cafe-soft">Toque no produto, escolha o tamanho e se quer avulso ou assinatura.</p>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          <a href="#cardapio" className="shrink-0 rounded-full bg-cafe px-4 py-1.5 text-sm font-bold text-white">
            Todos
          </a>
          {categories.map((c) => (
            <a key={c.key} href={`#cat-${c.key}`} className="shrink-0 rounded-full border border-cafe/10 bg-white px-4 py-1.5 text-sm font-bold text-cafe-soft">
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

      {/* Cobertura minimal */}
      <section id="atendimento" className="scroll-mt-20 pt-6">
        <details className="rounded-2xl border border-cafe/10 bg-white px-4 py-3">
          <summary className="cursor-pointer list-none text-sm font-bold text-cafe">📍 Entregamos em {cityLabel(defaultCity)} — ver bairros</summary>
          <p className="mt-2 text-sm leading-relaxed text-cafe-soft">{defaultCity.neighborhoods.join(" · ")}</p>
        </details>
      </section>
    </div>
  );
}
