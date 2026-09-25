/**
 * CATÁLOGO — edite os produtos, tamanhos e preços aqui.
 * Preços são exemplos: ajuste conforme a sua operação.
 */

export type Category = "sucos" | "maionese" | "farofas" | "sobremesas";

export interface CategoryMeta {
  key: Category;
  label: string;
  emoji: string;
  blurb: string;
}

export interface SizeOption {
  key: string;
  /** "Pequeno" para sucos, "Individual" para os demais */
  label: string;
  /** Ex.: "500ml", "serve 1 pessoa" */
  detail: string;
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  description: string;
  emoji: string;
  sizes: SizeOption[];
  featured?: boolean;
  /** Sobremesas só são produzidas/entregadas no fim de semana */
  weekendOnly?: boolean;
  subscriptionEligible?: boolean;
}

export const categories: CategoryMeta[] = [
  {
    key: "sucos",
    label: "Sucos naturais",
    emoji: "🍊",
    blurb: "Laranja espremida na hora, sem açúcar e sem conservantes.",
  },
  {
    key: "maionese",
    label: "Maionese",
    emoji: "🥄",
    blurb: "Feita à mão, com ingredientes de verdade.",
  },
  {
    key: "farofas",
    label: "Farofas",
    emoji: "🥜",
    blurb: "Crocantes e gostosas, do jeito caseiro.",
  },
  {
    key: "sobremesas",
    label: "Sobremesas",
    emoji: "🍰",
    blurb: "Chuchu no fim de semana: só sexta, sábado e domingo.",
  },
];

export const products: Product[] = [
  {
    slug: "suco-de-laranja-natural",
    name: "Suco de Laranja Natural",
    category: "sucos",
    description:
      "Laranja espremida na hora, doce naturalmente. Sem açúcar, sem água, sem conservantes — só laranja de verdade, entregue geladinho.",
    emoji: "🍊",
    featured: true,
    subscriptionEligible: true,
    sizes: [
      { key: "p", label: "Pequeno", detail: "500ml · 1 pessoa", price: 9 },
      { key: "m", label: "Médio", detail: "1L · 2 pessoas", price: 16 },
      { key: "g", label: "Grande", detail: "2L · família", price: 28 },
    ],
  },
  {
    slug: "maionese-artesanal",
    name: "Maionese Artesanal",
    category: "maionese",
    description:
      "Feita à mão no dia, com ovos frescos, óleo, limão e um toque de alho. Sabor de feira, sem conservantes artificiais.",
    emoji: "🥄",
    featured: true,
    subscriptionEligible: true,
    sizes: [
      { key: "i", label: "Individual", detail: "300g · 1 pessoa", price: 14 },
      { key: "c", label: "Casal", detail: "600g · 2 pessoas", price: 24 },
      { key: "f", label: "Família", detail: "1kg · família", price: 38 },
    ],
  },
  {
    slug: "farofa-de-bacon",
    name: "Farofa de Bacon",
    category: "farofas",
    description:
      "Bacon crocante, cebola dourada e farinha de mandioca torrada na hora. Acompanha o que você quiser.",
    emoji: "🥓",
    featured: true,
    subscriptionEligible: true,
    sizes: [
      { key: "i", label: "Individual", detail: "300g · 1 pessoa", price: 16 },
      { key: "c", label: "Casal", detail: "600g · 2 pessoas", price: 28 },
      { key: "f", label: "Família", detail: "1kg · família", price: 42 },
    ],
  },
  {
    slug: "farofa-de-ovo-com-cebolinha",
    name: "Farofa de Ovo com Cebolinha",
    category: "farofas",
    description:
      "Ovo desfiado, cebolinha fresca e mandioca torrada. A opção leve da casa, vegetariana e cheia de sabor.",
    emoji: "🍳",
    subscriptionEligible: true,
    sizes: [
      { key: "i", label: "Individual", detail: "300g · 1 pessoa", price: 14 },
      { key: "c", label: "Casal", detail: "600g · 2 pessoas", price: 24 },
      { key: "f", label: "Família", detail: "1kg · família", price: 36 },
    ],
  },
  {
    slug: "pudim-de-leite-condensado",
    name: "Pudim de Leite Condensado",
    category: "sobremesas",
    description:
      "Cremoso, com calda de caramelo queimado na medida. Feito sob encomenda para chegar no fim de semana.",
    emoji: "🍮",
    featured: true,
    weekendOnly: true,
    subscriptionEligible: false,
    sizes: [
      { key: "i", label: "Individual", detail: "2 porções", price: 18 },
      { key: "c", label: "Casal", detail: "4 porções", price: 32 },
      { key: "f", label: "Família", detail: "8 porções", price: 56 },
    ],
  },
  {
    slug: "brownie-com-chocolate",
    name: "Brownie com Chocolate",
    category: "sobremesas",
    description:
      "Chocolate meio amargo, casquinha crocante por fora e interior úmido. Assado no dia, só no fim de semana.",
    emoji: "🍫",
    weekendOnly: true,
    subscriptionEligible: false,
    sizes: [
      { key: "i", label: "Individual", detail: "2 unidades", price: 16 },
      { key: "c", label: "Casal", detail: "6 unidades", price: 42 },
      { key: "f", label: "Família", detail: "12 unidades", price: 78 },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(key: Category): CategoryMeta {
  return categories.find((c) => c.key === key)!;
}

export function fromPrice(product: Product): number {
  return Math.min(...product.sizes.map((s) => s.price));
}
