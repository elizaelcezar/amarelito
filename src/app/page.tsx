import Link from "next/link";
import { PinIcon } from "@/components/icons";
import { categories } from "@/data/products";
import { defaultCity, cityLabel } from "@/data/serviceArea";
import { siteConfig } from "@/config/site";

const tileStyles: Record<string, string> = {
  sucos: "from-[#ffd88a] to-[#ffb03a]",
  polpas: "from-[#ffc2d6] to-[#ff8fab]",
  maionese: "from-[#fff3d6] to-[#ffe1a8]",
  farofas: "from-[#ffe0b8] to-[#f5b267]",
  sobremesas: "from-[#ffd9c2] to-[#ff9d5c]",
};

export default function HomePage() {
  const semanal = Math.round(siteConfig.discounts.semanal * 100);
  const mensal = Math.round(siteConfig.discounts.mensal * 100);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Hero — recorrência protagonista */}
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
          <Link href="/produtos" className="rounded-full bg-cafe px-6 py-3 text-sm font-bold text-white">
            Ver produtos
          </Link>
          <Link href="/assinatura" className="rounded-full border border-cafe/15 bg-white px-6 py-3 text-sm font-bold text-cafe">
            Como funciona
          </Link>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-cafe-soft">
          <PinIcon size={13} /> Entrega hoje até 18h · cancela no WhatsApp quando quiser
        </p>
      </section>

      {/* Faixa recorrência */}
      <section className="mt-4 rounded-2xl border border-folha/15 bg-white px-4 py-3 sm:px-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-1.5 text-sm leading-relaxed">
            <span className="font-bold text-cafe">🔁 Como funciona:</span>
            <span className="text-cafe-soft">escolha → receba toda</span>
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

      {/* Categorias — porta de entrada para /produtos */}
      <section id="categorias" className="scroll-mt-20 pt-8">
        <h2 className="font-display text-xl font-semibold">O que você vai pedir hoje?</h2>
        <p className="mt-1 text-sm text-cafe-soft">Toque na categoria para ver os sabores e tamanhos.</p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/produtos?categoria=${cat.key}`}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.7rem] bg-gradient-to-br ${tileStyles[cat.key]} p-5 sm:p-6`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 text-4xl transition-transform group-hover:scale-110 sm:h-18 sm:w-18 sm:text-5xl">
                {cat.emoji}
              </div>
              <div className="mt-6">
                <h3 className="font-display text-lg font-semibold leading-tight text-cafe sm:text-xl">{cat.label}</h3>
                <p className="mt-1 text-xs font-semibold text-cafe/70 sm:text-sm">{cat.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-cafe">
                  Ver produtos →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/produtos" className="mx-auto mt-4 flex w-fit items-center gap-1.5 rounded-full border border-cafe/10 bg-white px-5 py-2.5 text-sm font-bold text-cafe-soft hover:text-cafe">
          Ver todos os produtos
        </Link>
      </section>

      {/* Cobertura minimal */}
      <section id="atendimento" className="scroll-mt-20 pt-8">
        <details className="rounded-2xl border border-cafe/10 bg-white px-4 py-3">
          <summary className="cursor-pointer list-none text-sm font-bold text-cafe">📍 Entregamos em {cityLabel(defaultCity)} — ver bairros</summary>
          <p className="mt-2 text-sm leading-relaxed text-cafe-soft">{defaultCity.neighborhoods.join(" · ")}</p>
        </details>
      </section>
    </div>
  );
}
