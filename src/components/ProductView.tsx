"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig, type Plan } from "@/config/site";
import { getCategory, type Product } from "@/data/products";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { planDiscountPercent, planPrice } from "@/lib/whatsapp";
import { MinusIcon, PlusIcon, WhatsappIcon } from "@/components/icons";

export function ProductView({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const { add } = useCart();
  const router = useRouter();

  const [sizeKey, setSizeKey] = useState(product.sizes[0].key);
  const [plan, setPlan] = useState<Plan>("semanal");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const size = product.sizes.find((s) => s.key === sizeKey)!;
  const unitPrice = planPrice(plan, size.price);
  const total = unitPrice * qty;
  const plans: Plan[] = product.subscriptionEligible ? ["avulso", "semanal", "mensal"] : ["avulso"];

  // se o produto não aceita assinatura mas o estado é semanal, volta pra avulso
  const effectivePlan: Plan = plans.includes(plan) ? plan : "avulso";

  function handleAdd() {
    if (added) {
      router.push("/carrinho");
      return;
    }
    add(product, size, effectivePlan, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 5000);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ffd88a] to-[#ffb03a] sm:h-72">
        <span className="text-8xl sm:text-9xl">{product.emoji}</span>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.weekendOnly && (
            <span className="rounded-full bg-laranja px-3 py-1 text-xs font-bold text-white">Só fim de semana</span>
          )}
          {product.subscriptionEligible && (
            <span className="rounded-full bg-folha px-3 py-1 text-xs font-bold text-white">🔁 Assinatura</span>
          )}
        </div>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-cafe-soft">{category.label}</span>
        <h1 className="mt-1 font-display text-3xl font-semibold">{product.name}</h1>
        <p className="mt-2 leading-relaxed text-cafe-soft">{product.description}</p>

        {product.subscriptionEligible && (
          <div className="mt-4 rounded-xl bg-folha-light px-3 py-2 text-xs leading-relaxed text-folha">
            🔁 <strong>Recorrente:</strong> recebe {planDiscountPercent("semanal")}% OFF na semanal,{" "}
            {planDiscountPercent("mensal")}% na mensal · sem fidelidade.
          </div>
        )}

        <fieldset className="mt-5">
          <legend className="font-display text-base font-semibold">Tamanho</legend>
          <div className="mt-3 grid gap-2">
            {product.sizes.map((option) => {
              const selected = option.key === sizeKey;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSizeKey(option.key)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left ${selected ? "border-mel-dark bg-mel/30" : "border-cafe/10 bg-white hover:border-mel"}`}
                >
                  <span>
                    <span className="block text-sm font-bold">{option.label}</span>
                    <span className="block text-xs text-cafe-soft">{option.detail}</span>
                  </span>
                  <span className="text-sm font-bold">{formatBRL(planPrice(effectivePlan, option.price))}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="font-display text-base font-semibold">Recorrência</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {plans.map((option) => {
              const selected = option === effectivePlan;
              const discount = planDiscountPercent(option);
              const isRecommended = option === "semanal";
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPlan(option)}
                  className={`relative rounded-2xl border px-2 py-3 text-center ${selected ? "border-folha bg-folha-light" : "border-cafe/10 bg-white hover:border-mel"}`}
                >
                  {isRecommended && product.subscriptionEligible && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-folha px-2 py-0.5 text-[10px] font-bold text-white">Recomendado</span>
                  )}
                  <span className="block pt-1 text-sm font-bold">{option === "avulso" ? "Avulso" : option === "semanal" ? "Semanal" : "Mensal"}</span>
                  <span className={`block text-[11px] font-bold ${discount > 0 ? "text-folha" : "text-cafe-soft"}`}>
                    {discount > 0 ? `-${discount}%` : "sem desconto"}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-cafe-soft">
            {effectivePlan === "avulso"
              ? "Compra única, sem recorrência."
              : `Recebe toda ${effectivePlan === "semanal" ? "semana" : "mês"}. Cancela no WhatsApp.`}
          </p>
        </fieldset>

        <div className="mt-5 flex items-center justify-between rounded-2xl border border-cafe/10 bg-white px-4 py-3">
          <span className="text-sm font-bold">Quantidade</span>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Diminuir" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-cafe/15">
              <MinusIcon size={16} />
            </button>
            <span className="w-6 text-center font-display text-lg font-semibold">{qty}</span>
            <button type="button" aria-label="Aumentar" onClick={() => setQty((q) => Math.min(99, q + 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-cafe/15">
              <PlusIcon size={16} />
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-cafe px-4 py-4 text-cream">
          <div className="flex items-center justify-between">
            <span className="text-sm text-cream/70">{effectivePlan === "avulso" ? "Total" : `Total · ${effectivePlan}`}</span>
            <span className="font-display text-2xl font-semibold text-mel">{formatBRL(total)}</span>
          </div>
          <button type="button" onClick={handleAdd} className={`mt-3 w-full rounded-full py-3.5 font-bold ${added ? "bg-folha text-white" : "bg-mel text-cafe"}`}>
            {added ? (
              "✓ Ir pro carrinho →"
            ) : effectivePlan === "avulso" ? (
              "Adicionar ao carrinho"
            ) : (
              "Assinar e adicionar"
            )}
          </button>
          <p className="mt-2 text-center text-xs text-cream/70">
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-2 hover:underline">
              <WhatsappIcon size={13} /> Dúvidas no WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
