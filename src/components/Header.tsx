"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CartIcon } from "@/components/icons";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-cafe/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 sm:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-display text-lg font-semibold text-cafe">Amarelito</span>
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
