import Link from "next/link";
import { formatBRL } from "@/lib/format";
import { fromPrice, getCategory, type Product } from "@/data/products";
import { planPrice } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  const base = fromPrice(product);
  const semanalPrice = product.subscriptionEligible ? planPrice("semanal", base) : null;
  const gradient = getCategory(product.category).gradient;

  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="flex flex-col overflow-hidden rounded-3xl border border-cafe/10 bg-white card-shadow transition-transform active:scale-[0.98]"
    >
      <div className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${gradient}`}>
        <span className="text-5xl" aria-hidden>{product.emoji}</span>
        {product.weekendOnly && (
          <span className="absolute right-2 top-2 rounded-full bg-laranja px-2 py-1 text-[10px] font-bold text-white">Fim de semana</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-display text-[15px] font-semibold leading-tight">{product.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-cafe-soft">{product.description}</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5">
          {semanalPrice !== null ? (
            <>
              <span className="text-sm font-extrabold text-cafe">{formatBRL(semanalPrice)}</span>
              <s className="text-xs font-semibold text-cafe-soft/70">{formatBRL(base)}</s>
            </>
          ) : (
            <span className="text-sm font-extrabold text-cafe">{formatBRL(base)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
