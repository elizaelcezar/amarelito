"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { planLabels, type Plan } from "@/config/site";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { buildWhatsAppUrl, orderTotal, type OrderLine } from "@/lib/whatsapp";
import {
  defaultCity,
  cityLabel,
  serviceArea,
} from "@/data/serviceArea";
import {
  ArrowLeftIcon,
  CheckIcon,
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
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
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
    () =>
      items.reduce((sum, item) => sum + item.size.price * item.entry.qty, 0),
    [items],
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Conta pra gente quem é você 😉";
    if (!neighborhood) nextErrors.neighborhood = "Escolha seu bairro";
    if (!address.trim()) nextErrors.address = "Rua e número, por favor";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const url = buildWhatsAppUrl(lines, {
      name: name.trim(),
      city: cityLabel(city),
      neighborhood,
      address: address.trim(),
      reference: reference.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (!ready) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 pt-16 text-center">
        <span className="text-6xl">🧺</span>
        <h1 className="mt-4 font-display text-2xl font-semibold">
          Seu carrinho está vazio
        </h1>
        <p className="mt-2 text-cafe-soft">
          Bora escolher um fresquinho? Tem suco, maionese, farofas e sobremesa
          esperando por você.
        </p>
        <Link
          href="/produtos"
          className="mt-6 rounded-full bg-mel px-7 py-3.5 font-bold text-cafe transition-transform active:scale-95"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Seu carrinho</h1>
          <p className="mt-1 text-sm text-cafe-soft">
            {items.length} {items.length === 1 ? "item" : "itens"} · pedido
            confirmado pelo WhatsApp
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-sm font-bold text-cafe-soft underline-offset-4 hover:text-laranja hover:underline"
        >
          Esvaziar
        </button>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Itens + formulário */}
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
                      <h2 className="truncate font-display font-semibold">
                        {item.product.name}
                      </h2>
                      <p className="text-xs text-cafe-soft">
                        {item.size.label} · {item.size.detail}
                      </p>
                      {item.entry.plan !== "avulso" && (
                        <span className="mt-1 inline-block rounded-full bg-folha-light px-2 py-0.5 text-[11px] font-bold text-folha">
                          {planLabels[item.entry.plan]}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label={`Remover ${item.product.name}`}
                      onClick={() =>
                        remove(item.entry.slug, item.entry.sizeKey, item.entry.plan)
                      }
                      className="shrink-0 text-cafe-soft transition-colors hover:text-laranja"
                    >
                      <TrashIcon size={18} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        aria-label="Diminuir"
                        onClick={() =>
                          setQty(
                            item.entry.slug,
                            item.entry.sizeKey,
                            item.entry.plan,
                            item.entry.qty - 1,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-cafe/15 transition-colors hover:bg-mel/30"
                      >
                        <MinusIcon size={14} />
                      </button>
                      <span className="w-5 text-center font-bold">
                        {item.entry.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar"
                        onClick={() =>
                          setQty(
                            item.entry.slug,
                            item.entry.sizeKey,
                            item.entry.plan,
                            item.entry.qty + 1,
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-cafe/15 transition-colors hover:bg-mel/30"
                      >
                        <PlusIcon size={14} />
                      </button>
                    </div>
                    <span className="font-display font-semibold">
                      {formatBRL(item.lineTotal)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Dados de entrega */}
          <form
            id="form-entrega"
            onSubmit={handleSubmit}
            className="rounded-3xl border border-cafe/10 bg-white p-5 card-shadow"
            noValidate
          >
            <h2 className="font-display text-lg font-semibold">
              Dados para a entrega
            </h2>

            <label className="mt-4 block text-sm font-bold">
              Seu nome
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como te chamamos?"
                className="mt-1.5 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-2.5 font-normal outline-none transition-colors focus:border-mel-dark"
              />
              {errors.name && (
                <span className="mt-1 block text-xs font-semibold text-laranja-dark">
                  {errors.name}
                </span>
              )}
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
                  className="mt-1.5 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-2.5 font-normal outline-none transition-colors focus:border-mel-dark"
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
                  className="mt-1.5 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-2.5 font-normal outline-none transition-colors focus:border-mel-dark"
                >
                  <option value="">Selecione...</option>
                  {city.neighborhoods.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                {errors.neighborhood && (
                  <span className="mt-1 block text-xs font-semibold text-laranja-dark">
                    {errors.neighborhood}
                  </span>
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
                className="mt-1.5 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-2.5 font-normal outline-none transition-colors focus:border-mel-dark"
              />
              {errors.address && (
                <span className="mt-1 block text-xs font-semibold text-laranja-dark">
                  {errors.address}
                </span>
              )}
            </label>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold">
                Ponto de referência{" "}
                <span className="font-normal text-cafe-soft">(opcional)</span>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Próximo ao mercado..."
                  className="mt-1.5 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-2.5 font-normal outline-none transition-colors focus:border-mel-dark"
                />
              </label>
              <label className="block text-sm font-bold">
                Observações <span className="font-normal text-cafe-soft">(opcional)</span>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Interfone quebrado, etc."
                  className="mt-1.5 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-2.5 font-normal outline-none transition-colors focus:border-mel-dark"
                />
              </label>
            </div>

            <p className="mt-4 flex items-start gap-2 rounded-xl bg-folha-light px-3 py-2.5 text-xs font-semibold text-folha">
              <PinIcon size={15} className="mt-0.5 shrink-0" />
              Entregamos em {cityLabel(city)} — bairro{" "}
              {neighborhood ? `"${neighborhood}"` : "selecionado acima"}. Se o
              seu não estiver na lista, chama no WhatsApp.
            </p>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-folha py-4 font-bold text-white transition-transform active:scale-95"
            >
              <WhatsappIcon size={20} />
              Enviar pedido pelo WhatsApp
            </button>
          </form>
        </div>

        {/* Resumo */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-cafe/10 bg-cafe p-5 text-cream card-shadow">
            <h2 className="font-display text-lg font-semibold">Resumo</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-cream/75">
                <dt>Subtotal</dt>
                <dd>{formatBRL(avulsoTotal)}</dd>
              </div>
              {total < avulsoTotal && (
                <div className="flex justify-between font-bold text-mel">
                  <dt>Descontos de assinatura</dt>
                  <dd>-{formatBRL(avulsoTotal - total)}</dd>
                </div>
              )}
              <div className="flex items-end justify-between border-t border-cream/15 pt-3">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display text-2xl font-semibold text-mel">
                  {formatBRL(orderTotal(lines))}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() =>
                document
                  .querySelector<HTMLFormElement>("#form-entrega")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-4 hidden w-full rounded-full bg-mel py-3 font-bold text-cafe transition-transform active:scale-95 lg:block"
            >
              Ir pros dados de entrega
            </button>

            <ul className="mt-4 space-y-1.5 text-xs text-cream/65">
              <li className="flex items-center gap-1.5">
                <CheckIcon size={13} className="text-mel" /> Sem cadastro, sem
                senha
              </li>
              <li className="flex items-center gap-1.5">
                <CheckIcon size={13} className="text-mel" /> Confirmação
                direto no WhatsApp
              </li>
              <li className="flex items-center gap-1.5">
                <CheckIcon size={13} className="text-mel" /> Assinatura sem
                fidelidade
              </li>
            </ul>
          </div>

          <Link
            href="/produtos"
            className="mt-3 flex items-center justify-center gap-1.5 rounded-full border border-cafe/15 bg-white py-3 text-sm font-bold text-cafe-soft transition-colors hover:text-cafe"
          >
            <ArrowLeftIcon size={15} /> Continuar comprando
          </Link>
        </aside>
      </div>

      {/* âncora para o botão desktop */}
    </div>
  );
}
