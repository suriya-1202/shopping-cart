import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Check, Plus, Minus, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ProductCard({
  product,
  onAddToCart,
  onIncrement,
  onDecrement,
  onRemove,
  onQuickView,
  cartQuantity = 0
}) {
  const { addToast } = useToast();
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const availableStock = product.stock ?? 99;
  const isOutOfStock = availableStock <= 0;
  const isAtMaxStock = cartQuantity >= availableStock;

  // Handle first-time addition (product was not in cart)
  const handleInitialAdd = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    const result = onAddToCart(product, 1);
    if (result && result.success) {
      setIsAddedRecently(true);
      addToast({
        title: 'Added to Bag',
        message: `${product.name} added to your bag.`,
        type: 'success'
      });
      setTimeout(() => setIsAddedRecently(false), 1600);
    } else if (result && !result.success) {
      addToast({
        title: 'Could not add item',
        message: result.message,
        type: 'error'
      });
    }
  };

  // Handle increment when item is already in cart
  const handlePlus = (e) => {
    e.stopPropagation();
    if (isAtMaxStock) {
      addToast({
        title: 'Max Stock Limit',
        message: `Only ${availableStock} units available for this product.`,
        type: 'warning'
      });
      return;
    }
    if (onIncrement) {
      onIncrement(product.id);
    } else {
      onAddToCart(product, 1);
    }
  };

  // Handle decrement / removal when item is already in cart
  const handleMinus = (e) => {
    e.stopPropagation();
    if (cartQuantity === 1) {
      if (onRemove) {
        onRemove(product.id);
        addToast({
          title: 'Item Removed',
          message: `Removed ${product.name} from your bag.`,
          type: 'info'
        });
      }
    } else if (cartQuantity > 1) {
      if (onDecrement) {
        onDecrement(product.id);
      }
    }
  };

  return (
    <article className="product-card group">
      {/* Image Container with Badges & Quick View Trigger */}
      <div className="product-image-container">
        {/* Placeholder skeleton while loading */}
        {!imageLoaded && <div className="skeleton product-image-skeleton" />}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`product-image ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Floating Badges */}
        <div className="product-badges">
          {product.badge && (
            <span className="badge badge-accent">{product.badge}</span>
          )}
          {product.stock <= 5 && !isOutOfStock && (
            <span className="badge badge-warning">Only {product.stock} Left</span>
          )}
          {isOutOfStock && (
            <span className="badge badge-danger">Sold Out</span>
          )}
        </div>

        {/* Quick View Button Hover Overlay */}
        <div className="product-overlay-actions">
          <button
            onClick={() => onQuickView(product)}
            className="quick-view-btn"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-4 h-4 mr-1.5" />
            Quick Look
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="product-body">
        {/* Category & Rating */}
        <div className="product-meta">
          <span className="product-category-tag">{product.category}</span>
          <div className="product-rating" aria-label={`Rating ${product.rating} out of 5`}>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
            <span className="rating-num">{product.rating}</span>
            <span className="rating-count">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="product-title cursor-pointer"
          onClick={() => onQuickView(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="product-description">
          {product.description}
        </p>

        {/* Price Row */}
        <div className="product-price-row">
          <div className="product-price-wrapper">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="stock-info">
            {isOutOfStock ? (
              <span className="text-rose-500 text-xs font-bold">Out of stock</span>
            ) : cartQuantity > 0 ? (
              <span className="text-indigo-600 text-xs font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In your bag
              </span>
            ) : (
              <span className="text-emerald-600 text-xs font-semibold">In stock</span>
            )}
          </div>
        </div>

        {/* Action Controls: Clean Add Button before selection, Interactive Stepper once in cart */}
        <div className="product-actions-row">
          {cartQuantity === 0 ? (
            /* Clean Full-Width Add to Bag Button (NO "1" stepper shown before selection) */
            <button
              onClick={handleInitialAdd}
              disabled={isOutOfStock}
              className={`btn-add-cart w-full ${isAddedRecently ? 'btn-added' : ''} ${isOutOfStock ? 'btn-disabled' : ''}`}
              aria-label={`Add ${product.name} to bag`}
            >
              {isAddedRecently ? (
                <>
                  <Check className="w-4 h-4 animate-scale-up" />
                  <span>Added to Bag</span>
                </>
              ) : isOutOfStock ? (
                <span>Sold Out</span>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          ) : (
            /* Interactive In-Cart Stepper (Shown only AFTER user has selected / added to cart) */
            <div className="card-in-cart-stepper animate-scale-up w-full">
              <button
                type="button"
                onClick={handleMinus}
                className="in-cart-btn in-cart-minus"
                aria-label={cartQuantity === 1 ? 'Remove from bag' : 'Decrease quantity'}
                title={cartQuantity === 1 ? 'Remove from bag' : 'Decrease quantity'}
              >
                {cartQuantity === 1 ? (
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Minus className="w-3.5 h-3.5 text-neutral-700" />
                )}
              </button>

              <div className="in-cart-qty-indicator">
                <span className="in-cart-number">{cartQuantity}</span>
                <span className="in-cart-text">in bag</span>
              </div>

              <button
                type="button"
                onClick={handlePlus}
                disabled={isAtMaxStock}
                className="in-cart-btn in-cart-plus"
                aria-label="Increase quantity"
                title={isAtMaxStock ? 'Max stock reached' : 'Increase quantity'}
              >
                <Plus className="w-3.5 h-3.5 text-neutral-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
