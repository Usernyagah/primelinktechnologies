import { createContext, useContext, useMemo, useReducer, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartState {
  items: CartItem[];
  open: boolean;
}

type Action =
  | { type: "add"; product: Product }
  | { type: "remove"; id: string }
  | { type: "inc"; id: string }
  | { type: "dec"; id: string }
  | { type: "clear" }
  | { type: "setOpen"; open: boolean };

const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      const items = existing
        ? state.items.map((i) => (i.product.id === action.product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.items, { product: action.product, qty: 1 }];
      return { ...state, items, open: true };
    }
    case "remove":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.id) };
    case "inc":
      return { ...state, items: state.items.map((i) => (i.product.id === action.id ? { ...i, qty: i.qty + 1 } : i)) };
    case "dec":
      return {
        ...state,
        items: state.items
          .map((i) => (i.product.id === action.id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      };
    case "clear":
      return { ...state, items: [] };
    case "setOpen":
      return { ...state, open: action.open };
  }
};

interface CartCtx extends CartState {
  add: (p: Product) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  count: number;
  total: number;
}

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { items: [], open: false });

  const value = useMemo<CartCtx>(() => {
    const count = state.items.reduce((s, i) => s + i.qty, 0);
    const total = state.items.reduce((s, i) => s + i.qty * i.product.price, 0);
    return {
      ...state,
      count,
      total,
      add: (p) => dispatch({ type: "add", product: p }),
      remove: (id) => dispatch({ type: "remove", id }),
      inc: (id) => dispatch({ type: "inc", id }),
      dec: (id) => dispatch({ type: "dec", id }),
      clear: () => dispatch({ type: "clear" }),
      setOpen: (open) => dispatch({ type: "setOpen", open }),
    };
  }, [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
