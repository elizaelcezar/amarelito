import type { Plan } from "@/config/site";

export interface CartEntry {
  slug: string;
  sizeKey: string;
  qty: number;
  plan: Plan;
}

export interface CartSnapshot {
  entries: CartEntry[];
  hydrated: boolean;
}

const STORAGE_KEY = "amarelito-cart-v1";

const INITIAL: CartSnapshot = { entries: [], hydrated: false };
let snapshot: CartSnapshot = INITIAL;
const listeners = new Set<() => void>();

function parseStored(raw: string | null): CartEntry[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartEntry =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartEntry).slug === "string" &&
        typeof (item as CartEntry).sizeKey === "string" &&
        typeof (item as CartEntry).qty === "number" &&
        isValidPlan((item as CartEntry).plan),
    );
  } catch {
    return [];
  }
}

function loadFromStorage(): boolean {
  if (snapshot.hydrated || typeof window === "undefined") return false;
  let entries: CartEntry[] = [];
  try {
    entries = parseStored(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    entries = [];
  }
  snapshot = { entries, hydrated: true };
  return true;
}

function commit(entries: CartEntry[]) {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // cota cheia: mantém só em memória
    }
  }
  snapshot = { entries, hydrated: true };
  listeners.forEach((listener) => listener());
}

function sameLine(entry: CartEntry, slug: string, sizeKey: string, plan: Plan) {
  return entry.slug === slug && entry.sizeKey === sizeKey && entry.plan === plan;
}

export function getCartSnapshot(): CartSnapshot {
  return snapshot;
}

export function getServerCartSnapshot(): CartSnapshot {
  return INITIAL;
}

export function subscribeCart(listener: () => void): () => void {
  listeners.add(listener);
  if (loadFromStorage()) {
    listeners.forEach((l) => l());
  }
  return () => {
    listeners.delete(listener);
  };
}

export function addEntry(
  slug: string,
  sizeKey: string,
  plan: Plan,
  qty: number,
) {
  loadFromStorage();
  const current = snapshot.entries;
  const existing = current.find((e) => sameLine(e, slug, sizeKey, plan));
  const entries = existing
    ? current.map((e) => (e === existing ? { ...e, qty: e.qty + qty } : e))
    : [...current, { slug, sizeKey, qty, plan }];
  commit(entries);
}

export function setEntryQty(
  slug: string,
  sizeKey: string,
  plan: Plan,
  qty: number,
) {
  loadFromStorage();
  const entries =
    qty <= 0
      ? snapshot.entries.filter((e) => !sameLine(e, slug, sizeKey, plan))
      : snapshot.entries.map((e) =>
          sameLine(e, slug, sizeKey, plan) ? { ...e, qty } : e,
        );
  commit(entries);
}

export function removeEntry(slug: string, sizeKey: string, plan: Plan) {
  loadFromStorage();
  commit(snapshot.entries.filter((e) => !sameLine(e, slug, sizeKey, plan)));
}

export function clearCart() {
  loadFromStorage();
  commit([]);
}


function isValidPlan(value: string): value is Plan {
  return value === "avulso" || value === "semanal" || value === "mensal";
}
