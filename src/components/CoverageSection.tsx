import { PinIcon, WhatsappIcon } from "@/components/icons";
import { serviceArea, cityLabel } from "@/data/serviceArea";
import { siteConfig } from "@/config/site";

export function CoverageSection() {
  return (
    <section id="atendimento" className="scroll-mt-20">
      <div className="overflow-hidden rounded-3xl border border-cafe/10 bg-white card-shadow">
        <div className="bg-folha px-5 py-4 text-white sm:px-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold sm:text-2xl">
            <PinIcon size={22} /> Onde a gente entrega
          </h2>
          <p className="mt-1 text-sm text-white/85">
            Pedidos feitos até 18h chegam no mesmo dia.
          </p>
        </div>

        <div className="space-y-5 p-5 sm:p-8">
          {serviceArea.cities.map((city) => (
            <div key={city.name}>
              <h3 className="font-display text-lg font-semibold text-cafe">
                {cityLabel(city)}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {city.neighborhoods.map((neighborhood) => (
                  <span
                    key={neighborhood}
                    className="rounded-full border border-mel-dark/40 bg-mel/30 px-3 py-1.5 text-sm font-semibold text-cafe"
                  >
                    {neighborhood}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {serviceArea.note && (
            <p className="rounded-2xl bg-cream-2 px-4 py-3 text-sm text-cafe-soft">
              📍 {serviceArea.note}
            </p>
          )}

          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-folha px-5 py-3 text-sm font-bold text-white transition-transform active:scale-95"
          >
            <WhatsappIcon size={16} />
            Tirar dúvida sobre entrega
          </a>
        </div>
      </div>
    </section>
  );
}
