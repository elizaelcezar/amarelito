"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { planLabels, type Plan } from "@/config/site";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { buildWhatsAppUrl, type OrderLine } from "@/lib/whatsapp";
import { defaultCity, cityLabel, serviceArea } from "@/data/serviceArea";
import {
  ArrowLeftIcon,
  MinusIcon,
  PinIcon,
  PlusIcon,
  TrashIcon,
  WhatsappIcon,
} from "@/components/icons";

interface FormErrors {
  name?: string;
  neighborhood?: string;
  address?: string;
}

export default function CarrinhoPage() {
  const { items, setQty, remove, clear, ready, total } = useCart();

  const [name, setName] = useState("");
  const [cityName, setCityName] = useState(defaultCity.name);
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const city = serviceArea.cities.find((c) => c.name === cityName)!;

  const lines = useMemo<OrderLine[]>(
    () =>
      items.map((item) => ({
        product: item.product,
        size: item.size,
        qty: item.entry.qty,
        plan: item.entry.plan as Plan,
      })),
    [items],
  );

  const avulsoTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.size.price * item.entry.qty, 0),
    [items],
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Digite seu nome";
    if (!neighborhood) nextErrors.neighborhood = "Escolha seu bairro";
    if (!address.trim()) nextErrors.address = "Rua e número";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const url = buildWhatsAppUrl(lines, {
      name: name.trim(),
      city: cityLabel(city),
      neighborhood,
      address: address.trim(),
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (!ready) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 pt-16 text-center">
        <span className="text-6xl">🧺</span>
        <h1 className="mt-4 font-display text-2xl font-semibold">Carrinho vazio</h1>
        <Link href="/produtos" className="mt-6 rounded-full bg-mel px-7 py-3.5 font-bold text-cafe">
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">
          Carrinho <span className="text-cafe-soft">({items.length})</span>
        </h1>
        <button type="button" onClick={clear} className="text-sm font-bold text-cafe-soft hover:text-laranja">
          Esvaziar
        </button>
      </header>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={`${item.entry.slug}-${item.entry.sizeKey}-${item.entry.plan}`}
                className="flex gap-3 rounded-3xl border border-cafe/10 bg-white p-4 card-shadow"
              >
                <span className="text-3xl">{item.product.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="truncate font-display font-semibold">{item.product.name}</h2>
                      <p className="text-xs text-cafe-soft">
                        {item.size.label} · {item.size.detail}
                        {item.entry.plan !== "avulso" && (
                          <span className="ml-2 rounded-full bg-folha-light px-2 py-0.5 text-[11px] font-bold text-folha">
                            {planLabels[item.entry.plan]}
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remover ${item.product.name}`}
                      onClick={() => remove(item.entry.slug, item.entry.sizeKey, item.entry.plan)}
                      className="shrink-0 text-cafe-soft hover:text-laranja"
                    >
                      <TrashIcon size={18} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        aria-label="Diminuir"
                        onClick={() => setQty(item.entry.slug, item.entry.sizeKey, item.entry.plan, item.entry.qty - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-cafe/15 hover:bg-mel/30"
                      >
                        <MinusIcon size={14} />
                      </button>
                      <span className="w-5 text-center font-bold">{item.entry.qty}</span>
                      <button
                        type="button"
                        aria-label="Aumentar"
                        onClick={() => setQty(item.entry.slug, item.entry.sizeKey, item.entry.plan, item.entry.qty + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-cafe/15 hover:bg-mel/30"
                      >
                        <PlusIcon size={14} />
                      </button>
                    </div>
                    <span className="font-display font-semibold">{formatBRL(item.lineTotal)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="rounded-3xl border border-cafe/10 bg-white p-5 card-shadow" noValidate>
            <h2 className="font-display text-lg font-semibold">Entrega</h2>

            <label className="mt-4 block text-sm font-bold">
              Nome
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="mt-1.5 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-2.5 font-normal outline-none focus:border-mel-dark"
              />
              {errors.name && <span className="mt-1 block text-xs font-semibold text-laranja-dark">{errors.name}</span>}
            </label>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold">
                Cidade
                <select
                  value={cityName}
                  onChange={(e) => {
                    setCityName(e.target.value);
                    setNeighborhood("");
                  }}
                  className="mt-1.5 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-2.5 font-normal outline-none focus:border-mel-dark"
                >
                  {serviceArea.cities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {cityLabel(c)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-bold">
                Bairro
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-2.5 font-normal outline-none focus:border-mel-dark"
                >
                  <option value="">Selecione...</option>
                  {city.neighborhoods.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                {errors.neighborhood && (
                  <span className="mt-1 block text-xs font-semibold text-laranja-dark">{errors.neighborhood}</span>
                )}
              </label>
            </div>

            <label className="mt-4 block text-sm font-bold">
              Rua e número
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua das Flores, 123"
                className="mt-1.5 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-2.5 font-normal outline-none focus:border-mel-dark"
              />
              {errors.address && <span className="mt-1 block text-xs font-semibold text-laranja-dark">{errors.address}</span>}
            </label>

            <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-folha">
              <PinIcon size={14} /> Entrega em {cityLabel(city)} — bairros da lista.
            </p>

            <button
              type="submit"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-folha py-4 font-bold text-white"
            >
              <WhatsappIcon size={20} />
              Fechar pedido no WhatsApp
            </button>
          </form>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-cafe/10 bg-cafe p-5 text-cream card-shadow">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between text-cream/80">
                <dt>Subtotal</dt>
                <dd>{formatBRL(avulsoTotal)}</dd>
              </div>
              {total < avulsoTotal && (
                <div className="flex justify-between font-bold text-mel">
                  <dt>Desconto assinatura</dt>
                  <dd>-{formatBRL(avulsoTotal - total)}</dd>
                </div>
              )}
              <div className="flex items-end justify-between border-t border-cream/20 pt-3">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display text-2xl font-semibold text-mel">{formatBRL(total)}</dd>
              </div>
            </dl>
          </div>

          <Link
            href="/produtos"
            className="mt-3 flex items-center justify-center gap-1.5 rounded-full border border-cafe/15 bg-white py-3 text-sm font-bold text-cafe-soft"
          >
            <ArrowLeftIcon size={15} /> Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  );
}
