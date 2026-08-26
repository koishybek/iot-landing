import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  diameter: string;
  price: string;
  count: number;
}

interface CartContextType {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: any, diameter: string) => void;
  removeFromCart: (id: string, diameter: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Читаем при первом рендере, поэтому нужны обе защиты: хранилища нет при
    // пререндере в Node, и оно бросает исключение в приватном режиме браузера.
    if (typeof window === "undefined") return [];
    try {
      const saved = window.localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // Приватный режим или переполненное хранилище: корзина живёт только в памяти.
    }
  }, [cart]);

  const addToCart = (product: any, diameter: string) => {
    setCart((prev) => {
      // Find variant price if available
      let price = "Запросить цену";
      if (diameter && product.variants) {
        const variant = product.variants.find((v: any) => v.diameter === diameter);
        if (variant) price = variant.price;
      } else if (product.priceText) {
        price = product.priceText;
      }

      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.diameter === diameter
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          count: next[existingIndex].count + 1,
        };
        return next;
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          diameter: diameter || "Не указан",
          price,
          count: 1,
        },
      ];
    });
    // Корзину сами не открываем: она перекрывала каталог при каждом
    // добавлении и мешала набирать несколько позиций подряд.
  };

  const removeFromCart = (id: string, diameter: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.diameter === diameter))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
