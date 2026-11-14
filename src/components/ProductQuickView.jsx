import React, { useState, useEffect } from 'react';
import { X, Star, Check, Plus, Minus, ShieldCheck, Truck, ShoppingBag, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ProductQuickView({
  product,
  onClose,
  onAddToCart,
  cartQuantity = 0
}) {
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const availableStock = product.stock ?? 99;
  const remainingStock = Math.max(0, availableStock - cartQuantity);
  const isOutOfStock = remainingStock === 0;

  const handleIncrement = () => {
    if (quantity < remainingStock) {
      setQuantity(q => q + 1);
    } else {
      addToast({
        title: 'Max Stock Reached',
        message: `Only ${remainingStock} units left in stock.`,
        type: 'warning'
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      setQuantity('');
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      if (num < 1) setQuantity(1);
      else if (num > remainingStock) {
        setQuantity(remainingStock > 0 ? remainingStock : 1);
        addToast({
          title: 'Stock Exceeded',
          message: `Maximum selectable quantity is ${remainingStock}.`,
          type: 'warning'
        });
      } else {
        setQuantity(num);
      }
    }
  };

  const handleBlur = () => {
    if (!quantity || quantity < 1) setQuantity(1);
  };

  const handleAdd = () => {
    const qtyToAdd = typeof quantity === 'number' && quantity >= 1 ? quantity : 1;
    if (qtyToAdd > remainingStock) {
      addToast({
        title: 'Stock Limit',
        message: `Cannot add ${qtyToAdd} items. Only ${remainingStock} available.`,
        type: 'warning'
      });
      return;
    }

    const res = onAddToCart(product, qtyToAdd);
    if (res && res.success) {
      setIsAddedRecently(true);
      addToast({
        title: 'Added to Bag',
        message: `${qtyToAdd}x ${product.name} added to your bag.`,
        type: 'success'
      });
      setTimeout(() => setIsAddedRecently(false), 1600);
    } else if (res && !res.success) {
      addToast({
        title: 'Could not add',
        message: res.message,
        type: 'error'
      });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="quickview-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close product preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="quickview-grid">
          {/* Left: Image Showcase */}
          <div className="quickview-media">
            <img
              src={product.image}
              alt={product.name}
              className="quickview-image"
            />
            {product.badge && (
              <span className="badge badge-accent quickview-badge">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right: Details & Purchase */}
          <div className="quickview-info">
            <div className="quickview-meta-row">
              <span className="product-category-tag">{product.category}</span>
              <div className="product-rating">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                <span className="rating-num font-semibold">{product.rating}</span>
                <span className="rating-count">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h2 className="quickview-title">{product.name}</h2>

            <div className="quickview-price-container">
              <span className="quickview-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="quickview-original-price">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="quickview-save-tag">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="quickview-desc">{product.description}</p>

            {/* Feature Highlights */}
            {product.features && (
              <div className="quickview-features">
                <h4 className="quickview-section-heading">Key Features</h4>
                <ul className="quickview-features-list">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Grid */}
            {product.specs && (
              <div className="quickview-specs-box">
                {Object.entries(product.specs).map(([label, val]) => (
                  <div key={label} className="spec-row">
                    <span className="spec-label">{label}:</span>
                    <span className="spec-value">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Stock status indicator */}
            <div className="quickview-stock-indicator">
              <div className={`stock-status-pill ${isOutOfStock ? 'status-danger' : remainingStock <= 4 ? 'status-warning' : 'status-success'}`}>
                <span className="status-dot" />
                <span>
                  {isOutOfStock
                    ? 'Currently Out of Stock'
                    : remainingStock <= 4
                    ? `Only ${remainingStock} remaining in stock`
                    : `In Stock (${remainingStock} available)`}
                </span>
              </div>
              {cartQuantity > 0 && (
                <span className="text-xs text-neutral-400 ml-2">
                  ({cartQuantity} currently in your bag)
                </span>
              )}
            </div>

            {/* Actions: Quantity Stepper + Add to Cart */}
            <div className="quickview-actions">
              <div className="quickview-qty-group">
                <label className="text-xs text-neutral-400 mb-1 block">Quantity</label>
                <div className="card-qty-stepper large">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="qty-btn"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={quantity}
                    onChange={handleQuantityChange}
                    onBlur={handleBlur}
                    disabled={isOutOfStock}
                    className="qty-input"
                    aria-label="Quantity"
                  />

                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={quantity >= remainingStock || isOutOfStock}
                    className="qty-btn"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="quickview-add-wrapper">
                <label className="text-xs text-neutral-400 mb-1 block invisible">Action</label>
                <button
                  onClick={handleAdd}
                  disabled={isOutOfStock}
                  className={`btn-add-cart large ${isAddedRecently ? 'btn-added' : ''} ${isOutOfStock ? 'btn-disabled' : ''}`}
                >
                  {isAddedRecently ? (
                    <>
                      <Check className="w-5 h-5 animate-scale-up" />
                      <span>Added to Bag</span>
                    </>
                  ) : isOutOfStock ? (
                    <span>Sold Out</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Bag — ${(product.price * (quantity || 1)).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="quickview-guarantees">
              <div className="guarantee-chip">
                <Truck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Express Insured Courier</span>
              </div>
              <div className="guarantee-chip">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>2-Year Full Studio Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
