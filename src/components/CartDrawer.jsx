import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, ArrowRight, Tag, ShieldCheck, Trash2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import CartItem from './CartItem';
import { useToast } from '../context/ToastContext';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  subtotal,
  discount,
  shipping,
  amountNeededForFreeShipping,
  freeShippingProgress,
  estimatedTax,
  total,
  totalItemsCount,
  onIncrement,
  onDecrement,
  onUpdateQuantity,
  onRemove,
  onClearCart,
  promoCode,
  promoMessage,
  onApplyPromo,
  onRemovePromo,
  onOpenCheckout
}) {
  const { addToast } = useToast();
  const [promoInput, setPromoInput] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput);
    if (res.success) {
      addToast({
        title: 'Promo Applied!',
        message: res.message,
        type: 'success'
      });
      setPromoInput('');
    } else {
      addToast({
        title: 'Promo Code Error',
        message: res.message,
        type: 'error'
      });
    }
  };

  const handleQuickPromo = (code) => {
    const res = onApplyPromo(code);
    if (res.success) {
      addToast({
        title: 'Promo Applied!',
        message: res.message,
        type: 'success'
      });
    }
  };

  const handleRemoveItem = (id) => {
    const item = onRemove(id);
    if (item) {
      addToast({
        title: 'Item Removed',
        message: `Removed ${item.name} from your bag.`,
        type: 'info'
      });
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to empty your shopping bag?')) {
      onClearCart();
      addToast({
        title: 'Bag Emptied',
        message: 'All items removed from your shopping bag.',
        type: 'info'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <aside
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping Bag Drawer"
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-left">
            <ShoppingBag className="w-5 h-5 text-indigo-400" />
            <h2 className="drawer-title">Shopping Bag</h2>
            <span className="drawer-count-badge">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="drawer-close-btn"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-banner">
          <div className="shipping-progress-header">
            {amountNeededForFreeShipping > 0 ? (
              <span className="shipping-text">
                Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more for <strong>Free Express Delivery</strong>
              </span>
            ) : (
              <span className="shipping-text-success">
                <Sparkles className="w-4 h-4 text-emerald-400 inline mr-1" />
                You unlocked <strong>Free Worldwide Express Shipping!</strong>
              </span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div
              className={`shipping-progress-fill ${amountNeededForFreeShipping === 0 ? 'fill-complete' : ''}`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List or Empty State */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon-wrapper">
                <ShoppingBag className="w-12 h-12 text-neutral-500 stroke-[1.5]" />
              </div>
              <h3 className="empty-cart-title">Your shopping bag is empty</h3>
              <p className="empty-cart-desc">
                Looks like you haven't added any handcrafted pieces to your collection yet.
              </p>
              <button
                onClick={onClose}
                className="btn btn-primary mt-4"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer with Calculations & Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Toggle / Form */}
            <div className="promo-section">
              {!promoCode ? (
                <div>
                  {!showPromoInput ? (
                    <button
                      onClick={() => setShowPromoInput(true)}
                      className="promo-toggle-btn"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Have a promo code?</span>
                    </button>
                  ) : (
                    <form onSubmit={handlePromoSubmit} className="promo-form">
                      <input
                        type="text"
                        placeholder="e.g. WELCOME10"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="promo-input"
                      />
                      <button type="submit" className="promo-apply-btn">
                        Apply
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPromoInput(false)}
                        className="promo-cancel-btn"
                      >
                        Cancel
                      </button>
                    </form>
                  )}

                  {/* Quick Promo Pills for testing */}
                  <div className="quick-promo-pills">
                    <span className="text-xs text-neutral-400">Try:</span>
                    <button
                      type="button"
                      onClick={() => handleQuickPromo('WELCOME10')}
                      className="quick-promo-chip"
                    >
                      WELCOME10 (-10%)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickPromo('VIP20')}
                      className="quick-promo-chip"
                    >
                      VIP20 (-20%)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="applied-promo-pill">
                  <div className="applied-promo-info">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-xs tracking-wider uppercase text-emerald-300">{promoCode}</span>
                      <div className="text-xs text-neutral-400">Discount applied</div>
                    </div>
                  </div>
                  <button
                    onClick={onRemovePromo}
                    className="remove-promo-btn"
                    title="Remove coupon"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoMessage && promoMessage.type === 'error' && (
                <div className="promo-error-text">
                  <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                  {promoMessage.text}
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="order-summary-breakdown">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-val">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row text-emerald-400">
                  <span className="summary-label flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 inline" />
                    Promo Discount ({promoCode})
                  </span>
                  <span className="summary-val font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span className="summary-label">Estimated Shipping</span>
                <span className="summary-val">
                  {shipping === 0 ? (
                    <span className="text-emerald-400 font-medium">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Estimated Sales Tax (8%)</span>
                <span className="summary-val">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-row total-row">
                <span className="total-label">Grand Total</span>
                <span className="total-val">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <div className="drawer-actions">
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="btn btn-primary checkout-btn"
              >
                <span>Proceed to Checkout</span>
                <span className="checkout-btn-price">${total.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={handleClear}
                className="btn-empty-bag"
              >
                <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                Empty Bag
              </button>
            </div>

            {/* Security Guarantee */}
            <div className="checkout-trust-badge">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Guaranteed safe checkout with 256-bit SSL encryption</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
