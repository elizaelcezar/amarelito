import Link from "next/link";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductCard } from "@/components/ProductCard";
import { CoverageSection } from "@/components/CoverageSection";
import { PinIcon, RepeatIcon, StarIcon } from "@/components/icons";
import { categories, products } from "@/data/products";
import { defaultCity, cityLabel } from "@/data/serviceArea";
import { planDiscountPercent } from "@/lib/whatsapp";

export default function HomePage() {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Hero */}
      <section className="relative mt-4 overflow-hidden rounded-[2rem] bg-gradient-to-br from-mel via-mel-2 to-cream-2 px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/30" />
        <div className="pointer-events-none absolute -bottom-12 right-16 h-32 w-32 rounded-full bg-laranja/20" />

        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-folha">
          <PinIcon size={14} /> Entregamos em {cityLabel(defaultCity)}
        </span>

        <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
          Fresquinho de verdade, direto pra sua casa.
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-cafe-soft sm:text-lg">
          Suco de laranja natural, maionese, farofas e sobremesas artesanais.
          Compre avulso ou assine e receba toda semana.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/produtos"
            className="rounded-full bg-cafe px-6 py-3.5 font-bold text-white transition-transform active:scale-95"
          >
            Ver produtos
          </Link>
          <Link
            href="/assinatura"
            className="rounded-full border-2 border-cafe/20 bg-white px-6 py-3.5 font-bold text-cafe transition-transform active:scale-95"
          >
            Quero assinar
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-cafe-soft">
          <span className="flex items-center gap-1.5">
            <StarIcon size={15} className="text-mel-dark" /> Feito no dia
          </span>
          <span className="flex items-center gap-1.5">
            <RepeatIcon size={15} className="text-mel-dark" /> Semanal ou
            mensal
          </span>
          <span className="flex items-center gap-1.5">
            <PinIcon size={15} className="text-mel-dark" /> Entrega local
          </span>
        </div>
      </section>

      {/* Categorias */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          O que você vai levar hoje?
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.key}
              href={`/produtos?categoria=${category.key}`}
              className="group rounded-3xl border border-cafe/10 bg-white p-4 text-center transition-transform hover:-translate-y-1 card-shadow"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-mel/30 text-4xl transition-transform group-hover:scale-110">
                {category.emoji}
              </div>
              <h3 className="mt-3 font-display text-sm font-semibold sm:text-base">
                {category.label}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Destaques */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Campeões da casa
          </h2>
          <Link
            href="/produtos"
            className="text-sm font-bold text-laranja hover:underline"
          >
            Ver todos →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="mt-12">
        <HowItWorks />
      </section>

      {/* Assinatura */}
      <section className="mt-12 overflow-hidden rounded-[2rem] bg-cafe px-6 py-8 text-cream sm:px-10 sm:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-mel px-3 py-1 text-xs font-bold text-cafe">
              <RepeatIcon size={14} /> Assinatura
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              Não fique sem nada em casa
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/75 sm:text-base">
              Escolha seus favoritos e receba automaticamente.{" "}
              <strong className="text-mel">
                {planDiscountPercent("semanal")}% de desconto na semanal
              </strong>{" "}
              e{" "}
              <strong className="text-mel">
                {planDiscountPercent("mensal")}% na mensal
              </strong>
              .
            </p>
          </div>
          <Link
            href="/assinatura"
            className="shrink-0 rounded-full bg-mel px-7 py-3.5 text-center font-bold text-cafe transition-transform active:scale-95"
          >
            Monte minha assinatura
          </Link>
        </div>
      </section>

      {/* Atendimento */}
      <section className="mt-12">
        <CoverageSection />
      </section>
    </div>
  );
}
