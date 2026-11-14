import { useState, useEffect, useMemo, useCallback } from 'react';

const CART_STORAGE_KEY = 'aura_shopping_cart_v1';
const PROMO_STORAGE_KEY = 'aura_applied_promo_v1';

// Available discount promo codes
export const VALID_PROMOS = {
  'WELCOME10': { discountPercent: 10, description: '10% New Customer Discount' },
  'VIP20': { discountPercent: 20, description: '20% VIP Member Exclusive' },
  'AURA50': { fixedDiscount: 50, description: '$50 Off Orders over $200', minSpend: 200 }
};

export const FREE_SHIPPING_THRESHOLD = 200;
export const STANDARD_SHIPPING_FEE = 15;
export const TAX_RATE = 0.08; // 8%

export function useCart() {
  // Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Validate structure
          return parsed.filter(item => item && item.id && item.quantity > 0);
        }
      }
    } catch (err) {
      console.error('Failed to load cart from localStorage:', err);
    }
    return [];
  });

  // Promo code state
  const [promoCode, setPromoCode] = useState(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [promoMessage, setPromoMessage] = useState(null);

  // Cart drawer open/close
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [cart]);

  // Persist promo code to localStorage
  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Failed to save promo to localStorage:', err);
    }
  }, [promoCode]);

  /**
   * Add to Cart with quantity validation & stock check
   * Returns: { success: boolean, message: string }
   */
  const addToCart = useCallback((product, quantityToAdd = 1) => {
    const qty = parseInt(quantityToAdd, 10);
    if (isNaN(qty) || qty <= 0) {
      return { success: false, message: 'Quantity must be at least 1' };
    }

    const availableStock = product.stock ?? 99;

    let result = { success: true, message: `Added ${product.name} to cart` };

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);

      if (existingIndex > -1) {
        const currentQty = prevCart[existingIndex].quantity;
        const newQty = currentQty + qty;

        if (newQty > availableStock) {
          result = {
            success: false,
            message: `Only ${availableStock} units available in stock. You already have ${currentQty} in your cart.`
          };
          return prevCart;
        }

        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        result = {
          success: true,
          message: `Updated quantity for ${product.name} (${newQty} in cart)`
        };
        return updated;
      } else {
        if (qty > availableStock) {
          result = {
            success: false,
            message: `Cannot add ${qty} units. Maximum stock available is ${availableStock}.`
          };
          return prevCart;
        }

        return [...prevCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          stock: availableStock,
          quantity: qty
        }];
      }
    });

    return result;
  }, []);

  /**
   * Update quantity of an item directly
   */
  const updateQuantity = useCallback((productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);

    // Prevent non-numeric or <= 0
    if (isNaN(qty) || qty < 1) {
      return { success: false, message: 'Quantity must be at least 1' };
    }

    let result = { success: true };

    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const maxStock = item.stock ?? 99;
          if (qty > maxStock) {
            result = {
              success: false,
              message: `Maximum stock limit reached (${maxStock} units max).`
            };
            return { ...item, quantity: maxStock };
          }
          return { ...item, quantity: qty };
        }
        return item;
      });
    });

    return result;
  }, []);

  /**
   * Increase quantity by 1
   */
  const incrementQuantity = useCallback((productId) => {
    let result = { success: true };
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const maxStock = item.stock ?? 99;
          if (item.quantity >= maxStock) {
            result = {
              success: false,
              message: `Maximum available stock reached for ${item.name} (${maxStock} units).`
            };
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
    return result;
  }, []);

  /**
   * Decrease quantity by 1 (minimum 1, won't drop below 1)
   */
  const decrementQuantity = useCallback((productId) => {
    let result = { success: true };
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          if (item.quantity <= 1) {
            result = {
              success: false,
              message: 'Quantity cannot be less than 1. Use the trash button to remove.'
            };
            return item;
          }
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
    return result;
  }, []);

  /**
   * Remove item from cart
   */
  const removeFromCart = useCallback((productId) => {
    const found = cart.find(item => item.id === productId);
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    return found || null;
  }, [cart]);

  /**
   * Clear all items from cart
   */
  const clearCart = useCallback(() => {
    setCart([]);
    setPromoCode('');
    setPromoMessage(null);
  }, []);

  /**
   * Apply a promotional discount code
   */
  const applyPromoCode = useCallback((code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      setPromoCode('');
      setPromoMessage(null);
      return { success: false, message: 'Please enter a promo code' };
    }

    const promo = VALID_PROMOS[cleanCode];
    if (!promo) {
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try WELCOME10 or VIP20.' });
      return { success: false, message: 'Invalid promo code' };
    }

    setPromoCode(cleanCode);
    setPromoMessage({ type: 'success', text: `Success! ${promo.description} applied.` });
    return { success: true, message: promo.description };
  }, []);

  /**
   * Remove current promo code
   */
  const removePromoCode = useCallback(() => {
    setPromoCode('');
    setPromoMessage(null);
  }, []);

  // Compute calculated values
  const calculations = useMemo(() => {
    const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Calculate Promo Discount
    let discount = 0;
    const promo = VALID_PROMOS[promoCode];
    if (promo) {
      if (promo.discountPercent) {
        discount = (subtotal * promo.discountPercent) / 100;
      } else if (promo.fixedDiscount) {
        if (!promo.minSpend || subtotal >= promo.minSpend) {
          discount = Math.min(promo.fixedDiscount, subtotal);
        }
      }
    }

    // Free shipping threshold calculations
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
    const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

    // Tax calculation
    const taxableAmount = Math.max(0, subtotal - discount);
    const estimatedTax = taxableAmount * TAX_RATE;

    // Total
    const total = taxableAmount + (subtotal > 0 ? shipping : 0) + estimatedTax;

    return {
      totalItemsCount,
      subtotal,
      discount,
      shipping,
      amountNeededForFreeShipping,
      freeShippingProgress,
      estimatedTax,
      total
    };
  }, [cart, promoCode]);

  return {
    cart,
    isCartOpen,
    setIsCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    addToCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    promoCode,
    promoMessage,
    applyPromoCode,
    removePromoCode,
    ...calculations
  };
}
