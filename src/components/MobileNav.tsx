"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartIcon, HomeIcon, RepeatIcon, StoreIcon } from "@/components/icons";
import { useCart } from "@/lib/cart";

const tabs = [
  { href: "/", label: "Início", icon: HomeIcon },
  { href: "/assinatura", label: "Assinar", icon: RepeatIcon },
  { href: "/#categorias", label: "Categorias", icon: StoreIcon },
  { href: "/carrinho", label: "Carrinho", icon: CartIcon },
];

export function MobileNav() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-cafe/10 bg-white/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {tabs.map((tab) => {
          const active = pathname === tab.href || (tab.href === "/#categorias" && pathname === "/");
          const Icon = tab.icon;
          return (
            <li key={tab.href}>
              <Link href={tab.href} className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold ${active ? "text-laranja" : "text-cafe-soft"}`}>
                <span className="relative">
                  <Icon size={22} />
                  {tab.href === "/carrinho" && count > 0 && (
                    <span className="absolute -right-2.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-laranja px-1 text-[10px] font-bold text-white">{count}</span>
                  )}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
