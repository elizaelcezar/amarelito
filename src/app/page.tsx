import Link from "next/link";
import { CategoryIcon, PinIcon } from "@/components/icons";
import { categories } from "@/data/products";
import { defaultCity, cityLabel } from "@/data/serviceArea";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const semanal = Math.round(siteConfig.discounts.semanal * 100);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Hero */}
      <section className="mt-3 rounded-[1.75rem] bg-gradient-to-br from-mel via-mel-2 to-cream-2 px-5 py-6 sm:mt-4 sm:px-8 sm:py-9">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-folha">
          <PinIcon size={13} /> {cityLabel(defaultCity)} · entrega hoje até 18h
        </span>
        <h1 className="mt-2.5 max-w-xl font-display text-[1.7rem] font-semibold leading-tight sm:text-4xl">
          Produtos por assinatura fresquinhos para você.
        </h1>
        <p className="mt-2 text-sm text-cafe-soft sm:text-[15px]">
          Avulso ou assinado com <strong className="text-folha">-{semanal}%</strong>. Sem fidelidade.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:flex sm:w-fit">
          <Link href="/produtos" className="rounded-full bg-cafe px-5 py-3 text-center text-sm font-bold text-white">
            Ver produtos
          </Link>
          <Link href="/assinatura" className="btn-shine rounded-full bg-laranja px-5 py-3 text-center text-sm font-bold text-white">
            Conhecer
          </Link>
        </div>
      </section>

      {/* Produtos — escolher categoria */}
      <section className="pt-6">
        <h2 className="font-display text-lg font-semibold sm:text-xl">Produtos</h2>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/produtos?categoria=${cat.key}`}
              className={`group flex items-center gap-3 overflow-hidden rounded-[1.4rem] bg-gradient-to-br ${cat.gradient} p-3.5`}
            >
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/85 text-cafe transition-transform group-hover:scale-110"
              >
                <CategoryIcon category={cat.key} size={24} />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[15px] font-semibold leading-tight text-cafe">
                  {cat.label}
                </span>
                <span className="mt-0.5 block text-[11px] font-semibold leading-snug text-cafe/70">
                  {cat.blurb}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
