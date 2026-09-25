import { cityLabel, defaultCity } from "@/data/serviceArea";

export function CoverageSection() {
  return (
    <section id="atendimento" className="scroll-mt-20">
      <details className="rounded-2xl border border-cafe/10 bg-white px-4 py-3">
        <summary className="cursor-pointer list-none text-sm font-bold text-cafe">
          📍 Entregamos em {cityLabel(defaultCity)} — ver bairros
        </summary>
        <p className="mt-2 text-sm leading-relaxed text-cafe-soft">
          {defaultCity.neighborhoods.join(" · ")}
        </p>
      </details>
    </section>
  );
}
