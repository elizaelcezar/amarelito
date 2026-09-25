"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig, type Plan } from "@/config/site";
import { getCategory, type Product } from "@/data/products";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { planDiscountPercent, planPrice } from "@/lib/whatsapp";
import { MinusIcon, PlusIcon, RepeatIcon, WhatsappIcon } from "@/components/icons";

const planNames: Record<Plan, string> = {
  avulso: "Avulso",
  semanal: "Semanal",
  mensal: "Mensal",
};

export function ProductView({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const { add } = useCart();
  const router = useRouter();

  const [sizeKey, setSizeKey] = useState(product.sizes[0].key);
  const [plan, setPlan] = useState<Plan>("semanal");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const size = product.sizes.find((s) => s.key === sizeKey)!;
  const plans: Plan[] = product.subscriptionEligible ? ["avulso", "semanal", "mensal"] : ["avulso"];
  const effectivePlan: Plan = plans.includes(plan) ? plan : "avulso";
  const total = planPrice(effectivePlan, size.price) * qty;

  function handleAdd() {
    if (added) {
      router.push("/carrinho");
      return;
    }
    add(product, size, effectivePlan, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 5000);
  }

  const addButton = (
    <button
      type="button"
      onClick={handleAdd}
      className={`w-full rounded-full px-4 py-3.5 text-sm font-bold transition-transform active:scale-95 ${added ? "bg-folha text-white" : "bg-mel text-cafe"}`}
    >
      {added ? "✓ Ir pro carrinho →" : effectivePlan === "avulso" ? "Adicionar ao carrinho" : "Assinar e adicionar"}
    </button>
  );

  return (
    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#ffd88a] to-[#ffb03a] sm:h-64 md:h-auto md:min-h-[24rem]">
        <span className="text-7xl sm:text-8xl" aria-hidden>{product.emoji}</span>
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.weekendOnly && (
            <span className="rounded-full bg-laranja px-3 py-1 text-xs font-bold text-white">Só fim de semana</span>
          )}
          {product.subscriptionEligible && (
            <span className="flex items-center gap-1.5 rounded-full bg-folha px-3 py-1 text-xs font-bold text-white">
              <RepeatIcon size={13} /> Assinatura
            </span>
          )}
        </div>
      </div>

      <div className="pb-2 md:pb-0">
        <span className="text-xs font-bold uppercase tracking-wider text-cafe-soft">{category.label}</span>
        <h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{product.name}</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-cafe-soft">{product.description}</p>

        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-folha hover:underline"
        >
          <WhatsappIcon size={15} /> Dúvidas no WhatsApp
        </a>

        <fieldset className="mt-2">
          <legend className="font-display text-base font-semibold">Tamanho</legend>
          <div className="mt-2 grid gap-2">
            {product.sizes.map((option) => {
              const selected = option.key === sizeKey;
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSizeKey(option.key)}
                  className={`flex min-h-12 items-center justify-between rounded-2xl border px-4 py-2.5 text-left ${selected ? "border-mel-dark bg-mel/30" : "border-cafe/10 bg-white hover:border-mel"}`}
                >
                  <span className="text-sm font-bold">
                    {option.label} <span className="font-normal text-cafe-soft">· {option.detail}</span>
                  </span>
                  <span className="text-sm font-bold">{formatBRL(planPrice(effectivePlan, option.price))}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {product.subscriptionEligible && (
          <fieldset className="mt-4">
            <legend className="font-display text-base font-semibold">Recorrência</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {plans.map((option) => {
                const selected = option === effectivePlan;
                const discount = planDiscountPercent(option);
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setPlan(option)}
                    className={`relative flex min-h-14 flex-col items-center justify-center rounded-2xl border px-2 py-2 ${selected ? "border-folha bg-folha-light" : "border-cafe/10 bg-white hover:border-mel"}`}
                  >
                    {option === "semanal" && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-folha px-2 py-0.5 text-[10px] font-bold text-white">Recomendado</span>
                    )}
                    <span className="text-sm font-bold">{planNames[option]}</span>
                    <span className={`text-[11px] font-bold ${discount > 0 ? "text-folha" : "text-cafe-soft"}`}>
                      {discount > 0 ? `-${discount}%` : "sem desconto"}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-xs text-cafe-soft">
              {effectivePlan === "avulso"
                ? "Compra única. Quer recorrência? Escolha Semanal ou Mensal."
                : `Recebe toda ${effectivePlan === "semanal" ? "semana" : "mês"}. Cancela no WhatsApp.`}
            </p>
          </fieldset>
        )}

        {/* Quantidade */}
        <div className="mt-4 flex min-h-12 items-center justify-between rounded-2xl border border-cafe/10 bg-white px-4 py-2">
          <span className="text-sm font-bold">Quantidade</span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Diminuir quantidade"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cafe/15"
            >
              <MinusIcon size={16} />
            </button>
            <span className="w-5 text-center font-bold">{qty}</span>
            <button
              type="button"
              aria-label="Aumentar quantidade"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cafe/15"
            >
              <PlusIcon size={16} />
            </button>
          </div>
        </div>

        {/* Total + CTA (desktop) */}
        <div className="mt-4 hidden rounded-2xl bg-cafe px-4 py-4 text-cream md:block">
          <div className="flex items-center justify-between">
            <span className="text-sm text-cream/70">Total · {planNames[effectivePlan]}</span>
            <span className="font-display text-2xl font-semibold text-mel">{formatBRL(total)}</span>
          </div>
          {addButton}
        </div>
      </div>

      {/* Barra fixa de compra (mobile) */}
      <div className="fixed inset-x-0 bottom-[60px] z-40 flex items-center gap-3 border-t border-cafe/10 bg-white/95 px-4 py-2.5 backdrop-blur md:hidden">
        <div className="min-w-0">
          <div className="truncate font-display text-lg font-semibold leading-tight">
            {formatBRL(total)}
            <span className="ml-1.5 text-[11px] font-bold text-folha">{planNames[effectivePlan]}</span>
          </div>
          <div className="truncate text-[11px] text-cafe-soft">
            {qty}× {size.label} · {size.detail}
          </div>
        </div>
        <div className="ml-auto min-w-0 flex-1">{addButton}</div>
      </div>
    </div>
  );
}
