import { cityLabel, defaultCity } from "@/data/serviceArea";
import { PinIcon } from "@/components/icons";
import { CoverageRequestForm } from "@/components/CoverageRequestForm";

export function CoverageSection() {
  return (
    <section id="atendimento" className="scroll-mt-20">
      <details className="group overflow-hidden rounded-[1.4rem] border border-folha/15 bg-gradient-to-br from-white via-white to-folha-light/70 card-shadow">
        <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-folha text-white shadow-sm">
            <PinIcon size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[15px] font-semibold leading-tight text-cafe">
              Entregamos em {cityLabel(defaultCity)}
            </span>
            <span className="mt-0.5 block text-xs font-bold text-folha">
              {defaultCity.neighborhoods.length} bairros · toque para ver a lista
            </span>
          </span>
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-cafe-soft transition-transform duration-200 group-open:rotate-180"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        <div className="px-4 pb-4">
          <ul className="flex flex-wrap gap-1.5 border-t border-folha/10 pt-3">
            {defaultCity.neighborhoods.map((bairro) => (
              <li
                key={bairro}
                className="rounded-full border border-cafe/10 bg-white px-3 py-1.5 text-xs font-bold text-cafe"
              >
                {bairro}
              </li>
            ))}
          </ul>
          <CoverageRequestForm />
        </div>
      </details>
    </section>
  );
}
