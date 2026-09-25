"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Plan } from "@/config/site";
import { getProduct, type Product, type SizeOption } from "@/data/products";
import { planPrice } from "@/lib/whatsapp";
import {
  addEntry,
  clearCart,
  getCartSnapshot,
  getServerCartSnapshot,
  removeEntry,
  setEntryQty,
  subscribeCart,
  type CartEntry,
} from "@/lib/cartStore";

export type { CartEntry };

export interface ResolvedCartEntry {
  entry: CartEntry;
  product: Product;
  size: SizeOption;
  unitPrice: number;
  lineTotal: number;
}

interface CartContextValue {
  items: ResolvedCartEntry[];
  ready: boolean;
  count: number;
  total: number;
  add: (product: Product, size: SizeOption, plan: Plan, qty?: number) => void;
  setQty: (slug: string, sizeKey: string, plan: Plan, qty: number) => void;
  remove: (slug: string, sizeKey: string, plan: Plan) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );

  const items = useMemo<ResolvedCartEntry[]>(() => {
    const resolved: ResolvedCartEntry[] = [];
    for (const entry of snapshot.entries) {
      const product = getProduct(entry.slug);
      const size = product?.sizes.find((s) => s.key === entry.sizeKey);
      if (!product || !size) continue;
      const unitPrice = planPrice(entry.plan, size.price);
      resolved.push({
        entry,
        product,
        size,
        unitPrice,
        lineTotal: unitPrice * entry.qty,
      });
    }
    return resolved;
  }, [snapshot.entries]);

  const add = useCallback(
    (product: Product, size: SizeOption, plan: Plan, qty = 1) => {
      addEntry(product.slug, size.key, plan, qty);
    },
    [],
  );

  const setQty = useCallback(
    (slug: string, sizeKey: string, plan: Plan, qty: number) => {
      setEntryQty(slug, sizeKey, plan, qty);
    },
    [],
  );

  const remove = useCallback((slug: string, sizeKey: string, plan: Plan) => {
    removeEntry(slug, sizeKey, plan);
  }, []);

  const clear = useCallback(() => clearCart(), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      ready: snapshot.hydrated,
      count: items.reduce((sum, item) => sum + item.entry.qty, 0),
      total: items.reduce((sum, item) => sum + item.lineTotal, 0),
      add,
      setQty,
      remove,
      clear,
    }),
    [items, snapshot.hydrated, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
