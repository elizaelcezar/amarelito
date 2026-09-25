const steps = [
  {
    emoji: "🛒",
    title: "1. Escolha",
    text: "Monte seu pedido: suco, maionese, farofa ou sobremesa, no tamanho que quiser.",
  },
  {
    emoji: "🤝",
    title: "2. Combine",
    text: "Compre avulso ou assine semanal/mensal e garanta desconto em cada entrega.",
  },
  {
    emoji: "🛵",
    title: "3. Receba",
    text: "Confirme no WhatsApp e receba fresquinho na porta da sua casa.",
  },
];

export function HowItWorks() {
  return (
    <section>
      <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">
        É simples assim
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-3xl border border-cafe/10 bg-white p-5 text-center card-shadow"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mel/40 text-3xl">
              {step.emoji}
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-cafe-soft">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
