import { cityLabel, defaultCity } from "@/data/serviceArea";

export function CoverageSection() {
  return (
    <section id="atendimento" className="scroll-mt-20">
      <details className="rounded-2xl border border-cafe/10 bg-white px-4 py-3">
        <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-bold text-cafe">
          📍 Entregamos em {cityLabel(defaultCity)} · {defaultCity.neighborhoods.length} bairros — ver lista
        </summary>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {defaultCity.neighborhoods.map((bairro) => (
            <li
              key={bairro}
              className="rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-cafe"
            >
              {bairro}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
