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

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Hero */}
      <section className="mt-4 rounded-[2rem] bg-gradient-to-br from-mel via-mel-2 to-cream-2 px-6 py-8 sm:px-8 sm:py-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-folha">
          <PinIcon size={13} /> {cityLabel(defaultCity)} · entrega hoje até 18h
        </span>
        <h1 className="mt-3 max-w-xl font-display text-[2rem] font-semibold leading-none sm:text-4xl">
          Fresquinho na sua porta, toda semana.
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-cafe-soft sm:text-[15px]">
          Avulso ou assinado com <strong className="text-folha">-{semanal}%</strong>. Sem fidelidade.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link href="/produtos" className="rounded-full bg-cafe px-6 py-3 text-sm font-bold text-white">
            Ver produtos
          </Link>
          <Link href="/assinatura" className="rounded-full border border-cafe/15 bg-white px-6 py-3 text-sm font-bold text-cafe">
            Assinar -{semanal}%
          </Link>
        </div>
      </section>

      {/* Produtos — escolher categoria */}
      <section className="pt-8">
        <h2 className="font-display text-xl font-semibold">Produtos</h2>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
      </section>
    </div>
  );
}
