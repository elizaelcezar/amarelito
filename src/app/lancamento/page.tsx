import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { CoverageSection } from "@/components/CoverageSection";
import { CheckIcon, PinIcon, RepeatIcon, StarIcon } from "@/components/icons";
import { cityLabel, defaultCity } from "@/data/serviceArea";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Lista de espera da assinatura",
  description:
    "Entre na lista da assinatura Amarelito: -10% na semanal, -15% na mensal, sem fidelidade. Deixe seu nome e confirme pelo WhatsApp.",
};

const benefits = [
  {
    icon: StarIcon,
    title: "Desconto de verdade",
    text: "-10% na semanal e -15% na mensal, em cada entrega.",
  },
  {
    icon: RepeatIcon,
    title: "Receba sempre",
    text: "Entrega combinada no mesmo dia, toda semana ou todo mês.",
  },
  {
    icon: PinIcon,
    title: "Do seu jeito",
    text: "Você escolhe produtos, tamanhos e quantidade.",
  },
];

const steps = ["Deixe seu nome", "Confirme no WhatsApp", "Receba toda semana com desconto"];

export default function LancamentoPage() {
  const semanal = Math.round(siteConfig.discounts.semanal * 100);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-28 pt-4 sm:px-6 md:pb-10">
      {/* Hero */}
      <header className="rounded-[1.75rem] bg-gradient-to-br from-mel via-mel-2 to-cream-2 px-5 py-7 sm:px-9 sm:py-9">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-folha">
          <span className="h-2 w-2 rounded-full bg-folha" aria-hidden />
          Lista de espera aberta · {cityLabel(defaultCity)}
        </span>
        <h1 className="mt-3 max-w-xl font-display text-[1.85rem] font-semibold leading-tight sm:text-5xl">
          Assinatura Amarelito: fresquinho com desconto toda semana.
        </h1>
        <p className="mt-2.5 max-w-md text-sm text-cafe-soft sm:text-base">
          Entre na lista e garanta <strong className="text-folha">-{semanal}%</strong> na
          semanal e <strong className="text-folha">-15%</strong> na mensal, sem fidelidade.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:w-fit">
          <a
            href="#lista"
            className="rounded-full bg-cafe px-5 py-3.5 text-center text-sm font-bold text-white"
          >
            Garantir meu desconto
          </a>
          <Link
            href="/produtos"
            className="rounded-full border border-cafe/15 bg-white px-5 py-3.5 text-center text-sm font-bold text-cafe"
          >
            Ver produtos
          </Link>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {["Sem fidelidade", "Cancela quando quiser", "Você escolhe os produtos"].map((item) => (
            <li
              key={item}
              className="flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-xs font-bold text-cafe"
            >
              <CheckIcon size={13} className="text-folha" /> {item}
            </li>
          ))}
        </ul>
      </header>

      {/* Benefícios */}
      <section className="mt-4 grid gap-3 sm:grid-cols-3">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-cafe/10 bg-white p-4 card-shadow">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-folha-light text-folha">
              <Icon size={20} />
            </span>
            <h2 className="mt-2.5 font-display text-base font-semibold">{title}</h2>
            <p className="mt-1 text-sm leading-snug text-cafe-soft">{text}</p>
          </div>
        ))}
      </section>

      {/* Captura */}
      <section id="lista" className="mt-4 scroll-mt-20 rounded-3xl border border-cafe/10 bg-white p-5 card-shadow sm:p-6">
        <div className="mx-auto max-w-md">
          <h2 className="font-display text-xl font-semibold">Entre na lista</h2>
          <p className="mt-1 text-sm text-cafe-soft">
            Preencha abaixo — a gente confirma tudo pelo WhatsApp.
          </p>

          <div className="mt-3">
            <WaitlistForm />
          </div>

          <ol className="mt-4 space-y-1.5 border-t border-cafe/10 pt-3 text-sm text-cafe-soft">
            {steps.map((step, i) => (
              <li key={step} className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mel text-xs font-bold text-cafe">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-4">
        <CoverageSection />
      </section>

      {/* Barra fixa de CTA (mobile) */}
      <div className="fixed inset-x-0 bottom-[60px] z-40 flex items-center gap-3 border-t border-cafe/10 bg-white/95 px-4 py-2.5 backdrop-blur md:hidden">
        <div className="min-w-0">
          <div className="font-display text-base font-semibold leading-tight">
            Assine com -{semanal}% / -15%
          </div>
          <div className="truncate text-[11px] text-cafe-soft">Sem fidelidade, cancele quando quiser</div>
        </div>
        <a
          href="#lista"
          className="ml-auto flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-folha px-4 text-sm font-bold text-white"
        >
          Entrar na lista
        </a>
      </div>
    </div>
  );
}
