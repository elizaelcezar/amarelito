/**
 * CATÁLOGO — edite produtos, tamanhos e preços aqui.
 */

export type Category = "sucos" | "polpas" | "maionese" | "farofas" | "sobremesas";

export interface CategoryMeta {
  key: Category;
  label: string;
  emoji: string;
  blurb: string;
}

export interface SizeOption {
  key: string;
  label: string;
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
  weekendOnly?: boolean;
  subscriptionEligible?: boolean;
}

export const categories: CategoryMeta[] = [
  { key: "sucos", label: "Sucos", emoji: "🍊", blurb: "Natural, sem açúcar." },
  { key: "polpas", label: "Polpas", emoji: "🧊", blurb: "Congeladas, 100% fruta." },
  { key: "maionese", label: "Maionese", emoji: "🥄", blurb: "Feita no dia." },
  { key: "farofas", label: "Farofa", emoji: "🥜", blurb: "Crocante e caseira." },
  { key: "sobremesas", label: "Sobremesa", emoji: "🍰", blurb: "Só fim de semana." },
];

export const products: Product[] = [
  {
    slug: "suco-de-laranja-natural",
    name: "Suco de Laranja Natural",
    category: "sucos",
    description: "Só laranja espremida na hora, geladinho.",
    emoji: "🍊",
    featured: true,
    subscriptionEligible: true,
    sizes: [
      { key: "p", label: "Pequeno", detail: "500 ml", price: 9 },
      { key: "m", label: "Médio", detail: "1 L", price: 16 },
      { key: "g", label: "Grande", detail: "2 L", price: 28 },
    ],
  },
  {
    slug: "polpa-de-morango",
    name: "Polpa de Morango",
    category: "polpas",
    description: "Morango selecionado, sem açúcar. Congelada.",
    emoji: "🍓",
    featured: true,
    subscriptionEligible: true,
    sizes: [
      { key: "i", label: "Individual", detail: "250 g", price: 10 },
      { key: "c", label: "Casal", detail: "500 g", price: 18 },
      { key: "f", label: "Família", detail: "1 kg", price: 32 },
    ],
  },
  {
    slug: "polpa-de-maracuja",
    name: "Polpa de Maracujá",
    category: "polpas",
    description: "Azedinho na medida, puro maracujá.",
    emoji: "🧡",
    featured: true,
    subscriptionEligible: true,
    sizes: [
      { key: "i", label: "Individual", detail: "250 g", price: 10 },
      { key: "c", label: "Casal", detail: "500 g", price: 18 },
      { key: "f", label: "Família", detail: "1 kg", price: 32 },
    ],
  },
  {
    slug: "polpa-de-manga",
    name: "Polpa de Manga",
    category: "polpas",
    description: "Manga madura, doce e cremosa.",
    emoji: "🥭",
    subscriptionEligible: true,
    sizes: [
      { key: "i", label: "Individual", detail: "250 g", price: 10 },
      { key: "c", label: "Casal", detail: "500 g", price: 18 },
      { key: "f", label: "Família", detail: "1 kg", price: 32 },
    ],
  },
  {
    slug: "polpa-de-goiaba",
    name: "Polpa de Goiaba",
    category: "polpas",
    description: "Goiaba vermelha, aroma de fruta fresca.",
    emoji: "🍈",
    subscriptionEligible: true,
    sizes: [
      { key: "i", label: "Individual", detail: "250 g", price: 10 },
      { key: "c", label: "Casal", detail: "500 g", price: 18 },
      { key: "f", label: "Família", detail: "1 kg", price: 32 },
    ],
  },
  {
    slug: "maionese-artesanal",
    name: "Maionese Artesanal",
    category: "maionese",
    description: "Feita no dia, com limão e toque de alho.",
    emoji: "🥄",
    featured: true,
    subscriptionEligible: true,
    sizes: [
      { key: "i", label: "Individual", detail: "300 g", price: 14 },
      { key: "c", label: "Casal", detail: "600 g", price: 24 },
      { key: "f", label: "Família", detail: "1 kg", price: 38 },
    ],
  },
  {
    slug: "farofa-de-bacon",
    name: "Farofa de Bacon",
    category: "farofas",
    description: "Bacon crocante e mandioca torrada.",
    emoji: "🥓",
    featured: true,
    subscriptionEligible: true,
    sizes: [
      { key: "i", label: "Individual", detail: "300 g", price: 16 },
      { key: "c", label: "Casal", detail: "600 g", price: 28 },
      { key: "f", label: "Família", detail: "1 kg", price: 42 },
    ],
  },
  {
    slug: "farofa-de-ovo-com-cebolinha",
    name: "Farofa de Ovo com Cebolinha",
    category: "farofas",
    description: "Leve, vegetariana e bem temperada.",
    emoji: "🍳",
    subscriptionEligible: true,
    sizes: [
      { key: "i", label: "Individual", detail: "300 g", price: 14 },
      { key: "c", label: "Casal", detail: "600 g", price: 24 },
      { key: "f", label: "Família", detail: "1 kg", price: 36 },
    ],
  },
  {
    slug: "pudim-de-leite-condensado",
    name: "Pudim de Leite Condensado",
    category: "sobremesas",
    description: "Cremoso com calda de caramelo. Só fds.",
    emoji: "🍮",
    weekendOnly: true,
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
    description: "Casquinha crocante, interior úmido. Só fds.",
    emoji: "🍫",
    weekendOnly: true,
    sizes: [
      { key: "i", label: "Individual", detail: "2 un", price: 16 },
      { key: "c", label: "Casal", detail: "6 un", price: 42 },
      { key: "f", label: "Família", detail: "12 un", price: 78 },
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
