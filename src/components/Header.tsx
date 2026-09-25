"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CartIcon, RepeatIcon } from "@/components/icons";
import { useCart } from "@/lib/cart";
import { siteConfig } from "@/config/site";

export function Header() {
  const { count } = useCart();
  const off = Math.round(siteConfig.discounts.semanal * 100);

  return (
    <header className="sticky top-0 z-40 border-b border-cafe/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-display text-lg font-semibold text-cafe">Amarelito</span>
        </Link>

        <Link href="/assinatura" className="ml-3 hidden min-h-11 items-center gap-1.5 rounded-full bg-folha-light px-3 text-xs font-bold text-folha sm:inline-flex">
          <RepeatIcon size={14} /> Assinatura <span className="rounded-full bg-folha px-1.5 py-0.5 text-[10px] text-white">-{off}%</span>
        </Link>
        <Link href="/produtos" className="hidden min-h-11 items-center text-sm font-bold text-cafe-soft hover:text-cafe sm:flex">
          Produtos
        </Link>

        <Link href="/carrinho" aria-label="Carrinho" className="ml-auto relative flex h-11 w-11 items-center justify-center rounded-full bg-mel text-cafe">
          <CartIcon size={19} />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-laranja px-1 text-[11px] font-bold text-white">{count}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
