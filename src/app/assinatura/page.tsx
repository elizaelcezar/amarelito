import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, RepeatIcon } from "@/components/icons";
import { CoverageSection } from "@/components/CoverageSection";
import { planDiscountPercent, planPrice } from "@/lib/whatsapp";
import { formatBRL } from "@/lib/format";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Assinatura semanal e mensal",
  description:
    "Assine sucos, maionese, farofas e sobremesas da Amarelito com desconto de 10% (semanal) ou 15% (mensal). Sem fidelidade, cancelamento fácil pelo WhatsApp.",
};

const benefits = [
  "Sem fidelidade: cancel quando quiser, só chamar no WhatsApp",
  "Desconto fixo a cada entrega",
  "Você escolhe os produtos e a quantidade na hora de assinar",
  "Lembrete no WhatsApp antes de cada entrega",
];

export default function AssinaturaPage() {
  const example = products.filter((p) => p.subscriptionEligible).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
      <header className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-mel via-mel-2 to-cream-2 px-6 py-9 sm:px-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-folha">
          <RepeatIcon size={14} /> Assinatura Amarelito
        </span>
        <h1 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Nunca mais acabe o suco da casa
        </h1>
        <p className="mt-2 max-w-md text-cafe-soft">
          Monte sua cesta de favoritos e receba com regularidade, com
          desconto em cada entrega.
        </p>
      </header>

      {/* Planos */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          {
            plan: "semanal" as const,
            title: "Toda semana",
            text: "Ideal pra quem usa muito: suco de manhã, farofa no almoço. Entrega combinada no mesmo dia da semana.",
          },
          {
            plan: "mensal" as const,
            title: "Uma vez por mês",
            text: "Pra estocar o essencial: maionese, farofas e o que mais você usa no mês. Maior desconto.",
          },
        ].map((item) => (
          <div
            key={item.plan}
            className="rounded-3xl border-2 border-mel-dark/40 bg-white p-6 card-shadow"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">
                {item.title}
              </h2>
              <span className="rounded-full bg-folha px-3 py-1 text-sm font-bold text-white">
                -{planDiscountPercent(item.plan)}%
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-cafe-soft">
              {item.text}
            </p>
            <Link
              href="/produtos"
              className="mt-4 inline-block rounded-full bg-mel px-5 py-2.5 text-sm font-bold text-cafe transition-transform active:scale-95"
            >
              Escolher produtos
            </Link>
          </div>
        ))}
      </section>

      {/* Como funciona */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Como funciona</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 rounded-2xl border border-cafe/10 bg-white px-4 py-3.5 text-sm card-shadow"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-folha text-white">
                <CheckIcon size={13} />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      {/* Exemplo de economia */}
      <section className="mt-10 rounded-3xl border border-cafe/10 bg-white p-5 sm:p-8 card-shadow">
        <h2 className="font-display text-2xl font-semibold">
          Quanto dá de desconto
        </h2>
        <p className="mt-1 text-sm text-cafe-soft">
          Exemplos com os produtos da casa (preços avulsos vs. assinados):
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-cafe/10 text-left text-cafe-soft">
                <th className="py-2 font-semibold">Produto</th>
                <th className="py-2 font-semibold">Avulso</th>
                <th className="py-2 font-semibold text-folha">Semanal</th>
                <th className="py-2 font-semibold text-folha">Mensal</th>
              </tr>
            </thead>
            <tbody>
              {example.map((product) => {
                const price = product.sizes[0].price;
                return (
                  <tr key={product.slug} className="border-b border-cafe/5">
                    <td className="py-2.5">
                      {product.emoji} {product.name}
                    </td>
                    <td className="py-2.5">{formatBRL(price)}</td>
                    <td className="py-2.5 font-bold">
                      {formatBRL(planPrice("semanal", price))}
                    </td>
                    <td className="py-2.5 font-bold">
                      {formatBRL(planPrice("mensal", price))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <CoverageSection />
      </section>
    </div>
  );
}
