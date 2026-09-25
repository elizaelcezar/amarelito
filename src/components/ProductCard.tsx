import Link from "next/link";
import { formatBRL } from "@/lib/format";
import { fromPrice, type Product } from "@/data/products";

const gradients: Record<string, string> = {
  sucos: "from-[#ffd88a] to-[#ffb03a]",
  polpas: "from-[#ffc2d6] to-[#ff8fab]",
  maionese: "from-[#fff3d6] to-[#ffe1a8]",
  farofas: "from-[#ffe0b8] to-[#f5b267]",
  sobremesas: "from-[#ffd9c2] to-[#ff9d5c]",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="flex flex-col overflow-hidden rounded-3xl border border-cafe/10 bg-white"
    >
      <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${gradients[product.category]}`}>
        <span className="text-5xl">{product.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-display text-[15px] font-semibold leading-tight">{product.name}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-cafe-soft">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-extrabold text-cafe">{formatBRL(fromPrice(product))}</span>
          {product.weekendOnly ? (
            <span className="rounded-full bg-laranja/15 px-2 py-1 text-[10px] font-bold text-laranja-dark">Fim de semana</span>
          ) : (
            <span className="text-xs font-bold text-laranja">Ver →</span>
          )}
        </div>
      </div>
    </Link>
  );
}
