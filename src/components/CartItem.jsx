import React from 'react';
import { Plus, Minus, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onUpdateQuantity,
  onRemove
}) {
  const { addToast } = useToast();
  const maxStock = item.stock ?? 99;
  const isAtMaxStock = item.quantity >= maxStock;

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      // Allow user to temporarily clear input
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      if (num < 1) {
        onUpdateQuantity(item.id, 1);
      } else if (num > maxStock) {
        onUpdateQuantity(item.id, maxStock);
        addToast({
          title: 'Stock Limit',
          message: `Only ${maxStock} items available in stock.`,
          type: 'warning'
        });
      } else {
        onUpdateQuantity(item.id, num);
      }
    }
  };

  const handleBlur = (e) => {
    const num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 1) {
      onUpdateQuantity(item.id, 1);
    }
  };

  const handlePlus = () => {
    if (isAtMaxStock) {
      addToast({
        title: 'Max Stock Limit',
        message: `Maximum stock for ${item.name} is ${maxStock} units.`,
        type: 'warning'
      });
      return;
    }
    onIncrement(item.id);
  };

  const handleMinus = () => {
    if (item.quantity <= 1) {
      addToast({
        title: 'Minimum Quantity',
        message: 'Minimum quantity is 1. Tap the trash icon to remove.',
        type: 'info'
      });
      return;
    }
    onDecrement(item.id);
  };

  const lineTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item-row">
      {/* Thumbnail */}
      <div className="cart-item-image-wrapper">
        <img
          src={item.image}
          alt={item.name}
          className="cart-item-image"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="cart-item-info">
        <div className="cart-item-header">
          <div>
            <span className="cart-item-category">{item.category}</span>
            <h4 className="cart-item-name">{item.name}</h4>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="cart-item-remove-btn"
            title={`Remove ${item.name} from bag`}
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="cart-item-price-unit">
          ${item.price.toFixed(2)} each
        </div>

        {/* Quantity Controls & Line Item Total */}
        <div className="cart-item-controls-row">
          <div className="cart-qty-stepper">
            <button
              type="button"
              onClick={handleMinus}
              disabled={item.quantity <= 1}
              className="qty-btn"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={item.quantity}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="qty-input"
              aria-label={`Quantity for ${item.name}`}
            />

            <button
              type="button"
              onClick={handlePlus}
              disabled={isAtMaxStock}
              className="qty-btn"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="cart-item-total">
            ${lineTotal}
          </div>
        </div>

        {/* Stock limit warning if reached */}
        {isAtMaxStock && (
          <div className="cart-item-stock-warning">
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span>Max available stock reached ({maxStock})</span>
          </div>
        )}
      </div>
    </div>
  );
}
