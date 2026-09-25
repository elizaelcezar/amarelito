import type { Metadata } from "next";
import Link from "next/link";
import { CoverageSection } from "@/components/CoverageSection";
import { planDiscountPercent } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Assinatura",
  description:
    "Assine semanal (-10%) ou mensal (-15%) com desconto, sem fidelidade. Peça pelo WhatsApp.",
};

const steps = [
  "Escolha os produtos e o tamanho",
  "Selecione Semanal ou Mensal",
  "Confirme o pedido no WhatsApp",
];

export default function AssinaturaPage() {
  const plans = [
    {
      plan: "semanal" as const,
      title: "Toda semana",
      text: "Recebe no mesmo dia da semana.",
    },
    {
      plan: "mensal" as const,
      title: "Todo mês",
      text: "Maior desconto do site.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
      <header className="rounded-[2rem] bg-gradient-to-br from-mel via-mel-2 to-cream-2 px-6 py-8 sm:px-8">
        <h1 className="max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Nunca mais acabe o que falta em casa
        </h1>
        <p className="mt-2 max-w-md text-sm text-cafe-soft sm:text-base">
          Escolha a frequência, receba com desconto e cancele no WhatsApp
          quando quiser.
        </p>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {plans.map((item) => (
          <div key={item.plan} className="rounded-3xl border-2 border-mel-dark/40 bg-white p-5 card-shadow">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">{item.title}</h2>
              <span className="rounded-full bg-folha px-3 py-1 text-sm font-bold text-white">
                -{planDiscountPercent(item.plan)}%
              </span>
            </div>
            <p className="mt-1 text-sm text-cafe-soft">{item.text}</p>
            <Link
              href="/produtos"
              className="mt-4 block rounded-full bg-mel py-3 text-center text-sm font-bold text-cafe"
            >
              Escolher produtos →
            </Link>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-cafe/10 bg-white p-5 card-shadow">
        <h2 className="font-display text-lg font-semibold">Como funciona</h2>
        <ol className="mt-3 space-y-2 text-sm text-cafe-soft">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mel text-xs font-bold text-cafe">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6">
        <CoverageSection />
      </section>
    </div>
  );
}
