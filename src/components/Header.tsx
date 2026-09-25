"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { CartIcon, PinIcon } from "@/components/icons";
import { useCart } from "@/lib/cart";
import { defaultCity, cityLabel } from "@/data/serviceArea";

const links = [
  { href: "/produtos", label: "Produtos" },
  { href: "/assinatura", label: "Assinatura" },
  { href: "/#atendimento", label: "Atendimento" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-cafe/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <span className="font-display text-xl font-semibold text-cafe">
            Amarelito
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href !== "/#atendimento" && pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-mel text-cafe"
                    : "text-cafe-soft hover:bg-mel/40 hover:text-cafe"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-folha-light px-3 py-1.5 text-xs font-bold text-folha sm:flex">
            <PinIcon size={14} />
            {cityLabel(defaultCity)}
          </span>
          <Link
            href="/carrinho"
            aria-label="Abrir carrinho"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-mel text-cafe transition-transform active:scale-95"
          >
            <CartIcon size={20} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-laranja px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
