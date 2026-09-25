import Link from "next/link";
import { Logo } from "@/components/Logo";
import { WhatsappIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cityLabel, defaultCity } from "@/data/serviceArea";

export function Footer() {
  return (
    <footer className="mt-10 hidden border-t border-cafe/10 bg-white md:block">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-display font-semibold text-cafe">Amarelito</span>
          <span className="text-sm text-cafe-soft">· {cityLabel(defaultCity)}</span>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-bold text-cafe-soft">
          <Link href="/produtos" className="hover:text-cafe">Produtos</Link>
          <Link href="/assinatura" className="hover:text-cafe">Assinatura</Link>
          <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-folha hover:underline">
            <WhatsappIcon size={14} /> {siteConfig.whatsappDisplay}
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 pb-6 text-center text-xs text-cafe-soft sm:px-6">
        © {new Date().getFullYear()} Amarelito — pedidos pelo WhatsApp
      </div>
    </footer>
  );
}
