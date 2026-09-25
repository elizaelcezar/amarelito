import { siteConfig, type Plan } from "@/config/site";
import type { Product, SizeOption } from "@/data/products";

export function planPrice(plan: Plan, price: number): number {
  if (plan === "avulso") return price;
  const discount = siteConfig.discounts[plan];
  return Math.round(price * (1 - discount) * 100) / 100;
}

export function planDiscountPercent(plan: Plan): number {
  if (plan === "avulso") return 0;
  return Math.round(siteConfig.discounts[plan] * 100);
}

export interface OrderCustomer {
  name: string;
  city: string;
  neighborhood: string;
  address: string;
  reference?: string;
  notes?: string;
}

export interface OrderLine {
  product: Product;
  size: SizeOption;
  qty: number;
  plan: Plan;
}

export function orderTotal(lines: OrderLine[]): number {
  return lines.reduce(
    (sum, line) => sum + planPrice(line.plan, line.size.price) * line.qty,
    0,
  );
}

export function buildWhatsAppUrl(
  lines: OrderLine[],
  customer?: OrderCustomer,
): string {
  const planNames: Record<Plan, string> = {
    avulso: "Avulso",
    semanal: "Assinatura semanal",
    mensal: "Assinatura mensal",
  };

  const itemLines = lines.map((line, index) => {
    const unit = planPrice(line.plan, line.size.price);
    const total = unit * line.qty;
    const planTag =
      line.plan === "avulso" ? "" : ` · ${planNames[line.plan]}`;
    return `${index + 1}. ${line.product.name} — ${line.size.label} (${line.size.detail})${planTag}\n   ${line.qty}x ${unit.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} = ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
  });

  const total = orderTotal(lines);
  const hasSubscription = lines.some((l) => l.plan !== "avulso");

  const parts: string[] = [
    `Olá, ${siteConfig.name}! 👋 Quero fazer um pedido:`,
    "",
    "*Itens*",
    ...itemLines,
    "",
    `*Total: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}*`,
  ];

  if (hasSubscription) {
    parts.push("", "_Meu pedido inclui assinatura. Confirme a periodicidade comigo, por favor._");
  }

  if (customer) {
    parts.push(
      "",
      "*Dados para entrega*",
      `Nome: ${customer.name}`,
      `Endereço: ${customer.address} — ${customer.neighborhood}`,
      `Cidade: ${customer.city}`,
    );
    if (customer.reference) parts.push(`Ponto de referência: ${customer.reference}`);
    if (customer.notes) parts.push(`Observações: ${customer.notes}`);
  }

  const weekendItem = lines.find((l) => l.product.weekendOnly);
  if (weekendItem) {
    parts.push("", "_Obs.: sobremesas são entregues apenas no fim de semana (sex, sáb e dom)._");
  }

  const text = encodeURIComponent(parts.join("\n"));
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}
