import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PinIcon, WhatsappIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { serviceArea, cityLabel } from "@/data/serviceArea";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-16 bg-cafe text-cream">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="h-10 w-10" />
            <span className="font-display text-2xl font-semibold">Amarelito</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">
            {siteConfig.tagline} Sucos, maionese, farofas e sobremesas
            artesanais, do nosso fogão pro seu lar.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-mel">
            Nossos produtos
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            {categories.map((category) => (
              <li key={category.key}>
                <Link
                  href={`/produtos?categoria=${category.key}`}
                  className="transition-colors hover:text-mel"
                >
                  {category.emoji} {category.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/assinatura" className="transition-colors hover:text-mel">
                🔄 Assinatura semanal e mensal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-mel">
            Área de atendimento
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            {serviceArea.cities.map((city) => (
              <li key={city.name} className="flex items-start gap-2">
                <PinIcon size={16} className="mt-0.5 shrink-0 text-mel" />
                <span>
                  {cityLabel(city)}
                  <span className="block text-xs text-cream/55">
                    {city.neighborhoods.length} bairros atendidos
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-folha px-4 py-2 text-sm font-bold text-white transition-transform active:scale-95"
          >
            <WhatsappIcon size={16} />
            {siteConfig.whatsappDisplay}
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream/55 sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} {siteConfig.name} — Feito com 💛 em Pinhais/PR</span>
          <span>Pedidos e entregas pelo WhatsApp</span>
        </div>
      </div>
    </footer>
  );
}
