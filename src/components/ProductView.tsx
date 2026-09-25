"use client";

import { useState } from "react";
import Link from "next/link";
import { planLabels, siteConfig, type Plan } from "@/config/site";
import { getCategory, type Product } from "@/data/products";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { planDiscountPercent, planPrice } from "@/lib/whatsapp";
import { CheckIcon, MinusIcon, PlusIcon, WhatsappIcon } from "@/components/icons";

export function ProductView({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const { add } = useCart();

  const [sizeKey, setSizeKey] = useState(product.sizes[0].key);
  const [plan, setPlan] = useState<Plan>("avulso");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const size = product.sizes.find((s) => s.key === sizeKey)!;
  const unitPrice = planPrice(plan, size.price);
  const total = unitPrice * qty;
  const plans: Plan[] = product.subscriptionEligible
    ? ["avulso", "semanal", "mensal"]
    : ["avulso"];

  function handleAdd() {
    add(product, size, plan, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 3500);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Visual */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ffd88a] to-[#ffb03a] sm:h-72">
        <span className="text-8xl sm:text-9xl">{product.emoji}</span>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.weekendOnly && (
            <span className="rounded-full bg-laranja px-3 py-1 text-xs font-bold text-white">
              Só fim de semana
            </span>
          )}
          {product.subscriptionEligible && (
            <span className="rounded-full bg-folha px-3 py-1 text-xs font-bold text-white">
              Aceita assinatura
            </span>
          )}
        </div>
      </div>

      {/* Opções */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-cafe-soft">
          {category.label}
        </span>
        <h1 className="mt-1 font-display text-3xl font-semibold">
          {product.name}
        </h1>
        <p className="mt-2 leading-relaxed text-cafe-soft">
          {product.description}
        </p>

        {/* Tamanho */}
        <fieldset className="mt-6">
          <legend className="font-display text-base font-semibold">
            Escolha o tamanho
          </legend>
          <div className="mt-3 grid gap-2">
            {product.sizes.map((option) => {
              const selected = option.key === sizeKey;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSizeKey(option.key)}
                  className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left transition-colors ${
                    selected
                      ? "border-mel-dark bg-mel/30"
                      : "border-cafe/10 bg-white hover:border-mel"
                  }`}
                >
                  <span>
                    <span className="block font-bold">{option.label}</span>
                    <span className="block text-xs text-cafe-soft">
                      {option.detail}
                    </span>
                  </span>
                  <span className="font-display font-semibold">
                    {formatBRL(planPrice(plan, option.price))}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Plano */}
        <fieldset className="mt-6">
          <legend className="font-display text-base font-semibold">
            Como quer comprar?
          </legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {plans.map((option) => {
              const selected = option === plan;
              const discount = planDiscountPercent(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPlan(option)}
                  className={`rounded-2xl border-2 px-2 py-3 text-center transition-colors ${
                    selected
                      ? "border-mel-dark bg-mel/30"
                      : "border-cafe/10 bg-white hover:border-mel"
                  }`}
                >
                  <span className="block text-sm font-bold">
                    {option === "avulso" ? "Avulso" : option === "semanal" ? "Semanal" : "Mensal"}
                  </span>
                  <span
                    className={`block text-[11px] font-semibold ${
                      discount > 0 ? "text-folha" : "text-cafe-soft"
                    }`}
                  >
                    {discount > 0 ? `-${discount}%` : "sem fidelidade"}
                  </span>
                </button>
              );
            })}
          </div>
          {plan !== "avulso" && (
            <p className="mt-2 text-xs text-cafe-soft">
              {planLabels[plan]} com {planDiscountPercent(plan)}% de desconto.
              Você confirma a data de entrega pelo WhatsApp.
            </p>
          )}
        </fieldset>

        {/* Quantidade */}
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-cafe/10 bg-white px-4 py-3">
          <span className="font-bold">Quantidade</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Diminuir"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cafe/15 text-cafe transition-colors hover:bg-mel/30"
            >
              <MinusIcon size={16} />
            </button>
            <span className="w-6 text-center font-display text-lg font-semibold">
              {qty}
            </span>
            <button
              type="button"
              aria-label="Aumentar"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cafe/15 text-cafe transition-colors hover:bg-mel/30"
            >
              <PlusIcon size={16} />
            </button>
          </div>
        </div>

        {/* Total + ações */}
        <div className="mt-4 rounded-2xl bg-cafe px-4 py-4 text-cream">
          <div className="flex items-center justify-between">
            <span className="text-sm text-cream/70">Total</span>
            <span className="font-display text-2xl font-semibold text-mel">
              {formatBRL(total)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-3 w-full rounded-full bg-mel py-3.5 font-bold text-cafe transition-transform active:scale-95"
          >
            {added ? (
              <span className="flex items-center justify-center gap-2">
                <CheckIcon size={18} /> Adicionado!
              </span>
            ) : (
              "Adicionar ao carrinho"
            )}
          </button>
          <div className="mt-2 flex items-center justify-center gap-3 text-xs text-cream/60">
            <Link href="/carrinho" className="hover:text-mel">
              Ir pro carrinho →
            </Link>
            <span aria-hidden>·</span>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-mel"
            >
              <WhatsappIcon size={13} /> Dúvidas
            </a>
          </div>
        </div>

        {product.weekendOnly && (
          <p className="mt-3 rounded-xl bg-laranja/10 px-3 py-2 text-xs font-semibold text-laranja-dark">
            🍰 Sobremesa de fim de semana: entregas de sexta a domingo.
          </p>
        )}
      </div>
    </div>
  );
}
