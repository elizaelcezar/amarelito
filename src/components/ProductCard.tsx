import Link from "next/link";
import { formatBRL } from "@/lib/format";
import { fromPrice, getCategory, type Product } from "@/data/products";

const gradients: Record<string, string> = {
  sucos: "from-[#ffd88a] to-[#ffb03a]",
  maionese: "from-[#fff3d6] to-[#ffe1a8]",
  farofas: "from-[#ffe0b8] to-[#f5b267]",
  sobremesas: "from-[#ffd9c2] to-[#ff9d5c]",
};

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);

  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-cafe/10 bg-white transition-transform duration-200 hover:-translate-y-1 card-shadow"
    >
      <div
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${gradients[product.category]}`}
      >
        <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
          {product.emoji}
        </span>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.weekendOnly && (
            <span className="rounded-full bg-laranja px-2.5 py-1 text-[11px] font-bold text-white">
              Só fim de semana
            </span>
          )}
          {product.subscriptionEligible && (
            <span className="rounded-full bg-folha px-2.5 py-1 text-[11px] font-bold text-white">
              Assinável
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-cafe-soft">
          {category.label}
        </span>
        <h3 className="mt-1 font-display text-lg font-semibold leading-snug">
          {product.name}
        </h3>
        <div className="mt-auto flex items-end justify-between pt-3">
          <span className="text-sm text-cafe-soft">
            a partir de{" "}
            <strong className="text-base font-extrabold text-cafe">
              {formatBRL(fromPrice(product))}
            </strong>
          </span>
          <span className="rounded-full bg-mel px-3 py-1.5 text-xs font-bold text-cafe transition-colors group-hover:bg-mel-dark">
            Ver opções
          </span>
        </div>
      </div>
    </Link>
  );
}
