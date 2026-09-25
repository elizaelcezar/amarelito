export const siteConfig = {
  name: "Amarelito",
  tagline: "Fresquinho de verdade, direto pra sua casa.",
  description:
    "Suco de laranja natural, maionese artesanal, farofas e sobremesas de fim de semana. Peça avulso ou assine semanalmente. Entrega em Pinhais - PR.",
  /**
   * Número do WhatsApp da loja no formato internacional: 55 + DDD + número.
   * Ex.: 5541999999999
   */
  whatsapp: "5511999999999",
  whatsappDisplay: "(41) 99999-9999",
  instagram: "",
  address: "Pinhais - PR",
  /** Descontos aplicados nas assinaturas (fração: 0.10 = 10%) */
  discounts: {
    semanal: 0.1,
    mensal: 0.15,
  },
} as const;

export const planLabels = {
  avulso: "Avulso",
  semanal: "Assinatura semanal",
  mensal: "Assinatura mensal",
} as const;

export type Plan = keyof typeof planLabels;
