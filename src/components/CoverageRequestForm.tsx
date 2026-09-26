"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { WhatsappIcon } from "@/components/icons";

interface FormErrors {
  nome?: string;
  cidade?: string;
  bairro?: string;
}

export function CoverageRequestForm() {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!nome.trim()) nextErrors.nome = "Digite seu nome";
    if (!cidade.trim()) nextErrors.cidade = "Digite sua cidade";
    if (!bairro.trim()) nextErrors.bairro = "Digite seu bairro";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const text = [
      `Olá, ${siteConfig.name}! 📍 Quero entrega na minha região.`,
      "",
      `Nome: ${nome.trim()}`,
      `Cidade: ${cidade.trim()}`,
      `Bairro: ${bairro.trim()}`,
      "",
      "Me avisem quando atenderem por aqui. Obrigado(a)!",
    ].join("\n");

    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-3 rounded-2xl bg-cream/60 p-3.5">
      <p className="font-display text-sm font-semibold text-cafe">
        Não chegou aí ainda?
      </p>
      <p className="mt-0.5 text-xs text-cafe-soft">
        Informa sua cidade e bairro que a gente te avisa quando expandir.
      </p>

      <label className="mt-2.5 block text-xs font-bold text-cafe">
        Seu nome
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Como te chamamos?"
          className="mt-1 min-h-11 w-full rounded-xl border border-cafe/15 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-mel-dark"
        />
        {errors.nome && (
          <span className="mt-1 block text-xs font-semibold text-laranja-dark">{errors.nome}</span>
        )}
      </label>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="block text-xs font-bold text-cafe">
          Cidade
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Ex: Curitiba"
            className="mt-1 min-h-11 w-full rounded-xl border border-cafe/15 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-mel-dark"
          />
          {errors.cidade && (
            <span className="mt-1 block text-xs font-semibold text-laranja-dark">{errors.cidade}</span>
          )}
        </label>
        <label className="block text-xs font-bold text-cafe">
          Bairro
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            placeholder="Ex: Centro"
            className="mt-1 min-h-11 w-full rounded-xl border border-cafe/15 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-mel-dark"
          />
          {errors.bairro && (
            <span className="mt-1 block text-xs font-semibold text-laranja-dark">{errors.bairro}</span>
          )}
        </label>
      </div>

      <button
        type="submit"
        className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cafe px-4 text-sm font-bold text-white transition-transform active:scale-95"
      >
        <WhatsappIcon size={17} />
        {sent ? "Chat aberto — é só enviar" : "Me avise no WhatsApp"}
      </button>
    </form>
  );
}
