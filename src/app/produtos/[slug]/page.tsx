import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { ProductView } from "@/components/ProductView";
import { ArrowLeftIcon } from "@/components/icons";

interface ProdutoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProdutoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProdutoPage({ params }: ProdutoPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-5 sm:px-6 md:pb-6">
      <Link
        href="/produtos"
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-cafe-soft transition-colors hover:text-cafe"
      >
        <ArrowLeftIcon size={16} /> Voltar para os produtos
      </Link>

      <div className="mt-1 md:mt-4">
        <ProductView key={product.slug} product={product} />
      </div>
    </div>
  );
}
