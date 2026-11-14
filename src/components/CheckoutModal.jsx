import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Lock, Sparkles, Truck, ArrowLeft, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  subtotal,
  discount,
  promoCode,
  shipping,
  estimatedTax,
  total,
  onOrderComplete
}) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing latency
    setTimeout(() => {
      setIsSubmitting(false);
      const randomOrderId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(randomOrderId);
      setStep('success');

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti trigger', err);
      }
    }, 1200);
  };

  const handleFinish = () => {
    onOrderComplete();
    setStep('form');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={step === 'form' ? onClose : undefined} role="dialog" aria-modal="true">
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-modal-header">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-sm tracking-wide uppercase text-neutral-300">
              {step === 'form' ? 'Secure Express Checkout' : 'Order Confirmed'}
            </span>
          </div>

          {step === 'form' && (
            <button onClick={onClose} className="modal-close-btn" aria-label="Close checkout">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step 1: Checkout Form */}
        {step === 'form' && (
          <div className="checkout-modal-body">
            <div className="checkout-grid">
              {/* Left Column: Customer and Payment details */}
              <form onSubmit={handlePay} className="checkout-form-col">
                <div className="checkout-section">
                  <h3 className="checkout-section-title">1. Shipping Address</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="checkout-label">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="checkout-input"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="checkout-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="checkout-input"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="checkout-label">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="checkout-input"
                      />
                    </div>
                    <div>
                      <label className="checkout-label">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="checkout-input"
                      />
                    </div>
                    <div>
                      <label className="checkout-label">Postal / ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        required
                        value={formData.zip}
                        onChange={handleChange}
                        className="checkout-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="checkout-section mt-5">
                  <h3 className="checkout-section-title">2. Payment Method</h3>
                  <div className="payment-method-selector mb-3">
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, paymentMethod: 'card' }))}
                      className={`payment-tab-btn ${formData.paymentMethod === 'card' ? 'active' : ''}`}
                    >
                      <CreditCard className="w-4 h-4 inline mr-1.5" />
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, paymentMethod: 'apple' }))}
                      className={`payment-tab-btn ${formData.paymentMethod === 'apple' ? 'active' : ''}`}
                    >
                      Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, paymentMethod: 'paypal' }))}
                      className={`payment-tab-btn ${formData.paymentMethod === 'paypal' ? 'active' : ''}`}
                    >
                      PayPal
                    </button>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-3 bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800">
                      <div>
                        <label className="checkout-label">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="checkout-input"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="checkout-label">Expires</label>
                          <input
                            type="text"
                            name="cardExp"
                            value={formData.cardExp}
                            onChange={handleChange}
                            className="checkout-input"
                          />
                        </div>
                        <div>
                          <label className="checkout-label">Security CVC</label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            className="checkout-input"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod !== 'card' && (
                    <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center text-sm text-neutral-300">
                      You will authenticate seamlessly with {formData.paymentMethod === 'apple' ? 'Apple Pay Touch ID' : 'PayPal Instant Checkout'}.
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full py-3.5 text-base font-semibold"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="spinner-subtle" />
                        Processing Payment...
                      </span>
                    ) : (
                      <span>Complete Order — ${total.toFixed(2)}</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Right Column: Order Mini Summary */}
              <div className="checkout-summary-col">
                <h4 className="text-sm font-semibold text-neutral-200 mb-3">Order Items ({cart.length})</h4>
                <div className="checkout-items-mini-list custom-scroll">
                  {cart.map(item => (
                    <div key={item.id} className="checkout-mini-item">
                      <img src={item.image} alt={item.name} className="checkout-mini-thumb" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-neutral-200 truncate">{item.name}</div>
                        <div className="text-xs text-neutral-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
                      </div>
                      <div className="text-xs font-semibold text-neutral-100">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="checkout-totals-box mt-4">
                  <div className="flex justify-between text-xs text-neutral-400 py-1">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-400 py-1">
                      <span>Discount ({promoCode})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-neutral-400 py-1">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400 py-1">
                    <span>Sales Tax</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-neutral-800 my-2 pt-2 flex justify-between font-bold text-sm text-neutral-100">
                    <span>Total Due</span>
                    <span className="text-indigo-300">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-[11px] text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>256-bit encrypted checkout. Your payment details are strictly tokenized.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Order Placed Success Confirmation */}
        {step === 'success' && (
          <div className="checkout-success-view">
            <div className="success-icon-badge">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>

            <h2 className="text-2xl font-bold text-neutral-100 mt-4 font-serif">
              Thank You for Your Order!
            </h2>
            <p className="text-neutral-400 text-sm mt-1 max-w-md mx-auto">
              Your order confirmation and tracking credentials have been dispatched to <strong>{formData.email}</strong>.
            </p>

            {/* Receipt Summary Card */}
            <div className="success-receipt-card">
              <div className="receipt-row">
                <span className="text-neutral-400 text-xs">Order Reference</span>
                <span className="font-mono text-xs font-semibold text-indigo-300">{orderId}</span>
              </div>
              <div className="receipt-row">
                <span className="text-neutral-400 text-xs">Estimated Delivery</span>
                <span className="text-xs text-neutral-200 font-medium">3–5 Business Days (Insured)</span>
              </div>
              <div className="receipt-row">
                <span className="text-neutral-400 text-xs">Shipping To</span>
                <span className="text-xs text-neutral-200">{formData.fullName}, {formData.city}</span>
              </div>
              <div className="receipt-row border-t border-neutral-800 pt-2 font-semibold">
                <span className="text-neutral-300 text-xs">Amount Paid</span>
                <span className="text-sm text-emerald-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleFinish}
                className="btn btn-primary px-8 py-3 text-sm font-semibold"
              >
                Continue Browsing Catalog
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
