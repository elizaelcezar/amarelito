import Link from "next/link";
import { formatBRL } from "@/lib/format";
import { fromPrice, type Product } from "@/data/products";
import { planPrice } from "@/lib/whatsapp";

const gradients: Record<string, string> = {
  sucos: "from-[#ffd88a] to-[#ffb03a]",
  polpas: "from-[#ffc2d6] to-[#ff8fab]",
  maionese: "from-[#fff3d6] to-[#ffe1a8]",
  farofas: "from-[#ffe0b8] to-[#f5b267]",
  sobremesas: "from-[#ffd9c2] to-[#ff9d5c]",
};

export function ProductCard({ product }: { product: Product }) {
  const base = fromPrice(product);
  const semanal = product.subscriptionEligible ? planPrice("semanal", base) : null;

  return (
    <Link href={`/produtos/${product.slug}`} className="flex flex-col overflow-hidden rounded-3xl border border-cafe/10 bg-white">
      <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${gradients[product.category]}`}>
        <span className="text-5xl">{product.emoji}</span>
        {product.subscriptionEligible && (
          <span className="absolute left-2 top-2 rounded-full bg-folha px-2 py-1 text-[10px] font-bold text-white">🔁 assine -10%</span>
        )}
        {product.weekendOnly && (
          <span className="absolute right-2 top-2 rounded-full bg-laranja px-2 py-1 text-[10px] font-bold text-white">Fim de semana</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-display text-[15px] font-semibold leading-tight">{product.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-cafe-soft">{product.description}</p>
        <div className="mt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-extrabold text-cafe">{formatBRL(base)}</span>
            <span className="text-xs text-cafe-soft">avulso</span>
          </div>
          {semanal !== null ? (
            <span className="text-xs font-bold text-folha">{formatBRL(semanal)} na semanal</span>
          ) : (
            <span className="text-xs text-cafe-soft">avulso apenas</span>
          )}
        </div>
      </div>
    </Link>
  );
}
