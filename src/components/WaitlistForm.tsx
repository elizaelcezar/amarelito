"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { cityLabel, defaultCity } from "@/data/serviceArea";
import { WhatsappIcon } from "@/components/icons";

interface FormErrors {
  nome?: string;
  bairro?: string;
}

export function WaitlistForm() {
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!nome.trim()) nextErrors.nome = "Digite seu nome";
    if (!bairro) nextErrors.bairro = "Escolha seu bairro";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const text = [
      `Olá, ${siteConfig.name}! 🚀 Quero entrar na lista da assinatura.`,
      "",
      `Nome: ${nome.trim()}`,
      `Bairro: ${bairro} — ${cityLabel(defaultCity)}`,
      "",
      "Me avisem quando puderem confirmar. Obrigado(a)!",
    ].join("\n");

    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label className="block text-sm font-bold">
        Seu nome
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Como te chamamos?"
          className="mt-1.5 min-h-12 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-3 font-normal outline-none focus:border-mel-dark"
        />
        {errors.nome && (
          <span className="mt-1 block text-xs font-semibold text-laranja-dark">{errors.nome}</span>
        )}
      </label>

      <label className="mt-3 block text-sm font-bold">
        Seu bairro
        <select
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          className="mt-1.5 min-h-12 w-full rounded-xl border border-cafe/15 bg-cream px-3.5 py-3 font-normal outline-none focus:border-mel-dark"
        >
          <option value="">Selecione...</option>
          {defaultCity.neighborhoods.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {errors.bairro && (
          <span className="mt-1 block text-xs font-semibold text-laranja-dark">{errors.bairro}</span>
        )}
      </label>

      <button
        type="submit"
        className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-folha px-4 font-bold text-white transition-transform active:scale-95"
      >
        <WhatsappIcon size={20} />
        {sent ? "Chat aberto — é só enviar" : "Quero minha vaga no WhatsApp"}
      </button>

      <p className="mt-2 text-center text-xs text-cafe-soft">
        {sent
          ? "Se o WhatsApp não abriu, fala com a gente pelo botão do rodapé."
          : "Sem compromisso, sem cadastro. Só o aviso do lançamento."}
      </p>
    </form>
  );
}
