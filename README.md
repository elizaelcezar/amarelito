# 🟡 Amarelito

Loja mobile-first de sucos de laranja natural, maionese artesanal, farofas e
sobremesas de fim de semana. Compra avulsa ou assinatura semanal/mensal, com
pedido confirmado direto no WhatsApp.

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS · sem banco de
dados, sem login.

## Rodar local

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # verifica código
npm run build    # build de produção
```

## Configurações importantes (admin)

| O que mudar | Onde |
| --- | --- |
| **Número do WhatsApp** | `src/config/site.ts` → `whatsapp` (formato `55 + DDD + número`) e `whatsappDisplay` |
| **Descontos de assinatura** | `src/config/site.ts` → `discounts` (0.10 = 10%) |
| **Produtos, tamanhos e preços** | `src/data/products.ts` |
| **Área de atendimento (cidades e bairros)** | `src/data/serviceArea.ts` |
| **Nome, descrição e textos do site** | `src/config/site.ts` |

A área de atendimento começa em **Pinhais - PR** e já está preparada para
crescer: basta adicionar um novo objeto em `serviceArea.cities` com `name`,
`uf` e a lista de `neighborhoods`. A informação aparece no cabeçalho, na
home, no rodapé e é usada para validar o pedido no carrinho.

## Como funciona a venda

1. Cliente escolhe produto, tamanho (pequeno/médio/grande ou
   individual/casal/família) e modo (avulso, semanal ou mensal).
2. Monta o carrinho e preenche nome, cidade, bairro e endereço (só bairros da
   área de atendimento).
3. O botão abre o WhatsApp com o pedido formatado — a loja confirma por lá.

## Deploy (Vercel)

1. Acesse [vercel.com](https://vercel.com) → **Add New → Project** →
   importe o repositório `elizaelcezar/amarelito`.
2. Build: `npm run build` · Output: padrão do Next.js.
3. Depois do deploy, troque o placeholder do WhatsApp em
   `src/config/site.ts`.
