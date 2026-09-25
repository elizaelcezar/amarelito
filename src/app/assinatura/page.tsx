import type { Metadata } from "next";
import Link from "next/link";
import { CoverageSection } from "@/components/CoverageSection";
import { planDiscountPercent } from "@/lib/whatsapp";
import { RepeatIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Assinatura",
  description:
    "Assine semanal (-10%) ou mensal (-15%) com desconto, sem fidelidade. Peça pelo WhatsApp.",
};

const steps = [
  "Escolha os produtos e o tamanho",
  "Selecione Semanal ou Mensal",
  "Confirme no WhatsApp",
];

export default function AssinaturaPage() {
  const plans = [
    { plan: "semanal" as const, title: "Toda semana", text: "Recebe no mesmo dia da semana." },
    { plan: "mensal" as const, title: "Todo mês", text: "Maior desconto do site." },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pt-4 sm:px-6">
      <header className="rounded-[1.75rem] bg-gradient-to-br from-mel via-mel-2 to-cream-2 px-5 py-6 sm:px-8 sm:py-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-folha">
          <RepeatIcon size={13} /> Assinatura Amarelito
        </span>
        <h1 className="mt-2.5 max-w-lg font-display text-[1.7rem] font-semibold leading-tight sm:text-4xl">
          Nunca mais acabe o que falta em casa
        </h1>
        <p className="mt-1.5 max-w-md text-sm text-cafe-soft sm:text-base">
          Escolha a frequência, receba com desconto e cancele no WhatsApp.
        </p>
      </header>

      <section className="mt-4 grid gap-3 sm:grid-cols-2">
        {plans.map((item) => (
          <div key={item.plan} className="rounded-3xl border-2 border-mel-dark/40 bg-white p-4 card-shadow">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">{item.title}</h2>
              <span className="rounded-full bg-folha px-3 py-1 text-sm font-bold text-white">
                -{planDiscountPercent(item.plan)}%
              </span>
            </div>
            <p className="mt-1 text-sm text-cafe-soft">{item.text}</p>
            <Link
              href="/produtos"
              className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-mel text-sm font-bold text-cafe"
            >
              Escolher produtos →
            </Link>
          </div>
        ))}
      </section>

      <section className="mt-4 rounded-3xl border border-cafe/10 bg-white p-4 card-shadow">
        <h2 className="font-display text-base font-semibold">Como funciona</h2>
        <ol className="mt-2 space-y-1.5 text-sm text-cafe-soft">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mel text-xs font-bold text-cafe">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-4 pb-4">
        <CoverageSection />
      </section>
    </div>
  );
}
