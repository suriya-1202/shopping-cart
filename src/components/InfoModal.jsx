import React, { useState } from 'react';
import {
  X, Truck, ShieldCheck, RefreshCw, Send, CheckCircle2, Lock, FileText,
  Search, Package, Copy, Check, Clock, MapPin, ExternalLink, ChevronRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

// Sample tracking datasets for realistic demo lookups
const SAMPLE_ORDERS = {
  'AUR-784291': {
    id: 'AUR-784291',
    carrier: 'DHL Express International Priority',
    carrierTracking: 'DHL-9842-0193-4810',
    status: 'In Transit — Air Freight',
    statusType: 'in_transit',
    etaDate: 'Thursday, Nov 15',
    etaTime: 'By 2:00 PM',
    destination: 'San Francisco, CA 94107',
    packageItem: {
      name: 'Aether Hi-Fi Wireless Headphones',
      qty: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80',
      weight: '1.2 kg',
      serial: 'SN-ATH-2026-9814'
    },
    timeline: [
      {
        title: 'Order Confirmed & Security Verified',
        location: 'AURA Studio Central, Kyoto',
        date: 'Nov 12, 10:15 AM',
        status: 'completed'
      },
      {
        title: 'Acoustic Calibration & White-Glove Packing',
        location: 'Kyoto Artisan Cleanroom Facility',
        date: 'Nov 13, 02:40 PM',
        status: 'completed'
      },
      {
        title: 'In Transit — Departed Osaka Kansai International (KIX)',
        location: 'Flight DHL-841 (Direct to SFO Gateway)',
        date: 'Nov 14, 08:20 AM',
        status: 'active',
        note: 'Flight in progress across Pacific air corridor'
      },
      {
        title: 'Regional Gateway Sort & Customs Clearance',
        location: 'San Francisco SFO Hub',
        date: 'Nov 14, 09:30 PM (Projected)',
        status: 'pending'
      },
      {
        title: 'Out for Final Courier Delivery',
        location: 'San Francisco Local Dispatch',
        date: 'Nov 15, Morning (Projected)',
        status: 'pending'
      }
    ]
  },
  'AUR-920418': {
    id: 'AUR-920418',
    carrier: 'FedEx Custom Critical Courier',
    carrierTracking: 'FDX-4491-8812-7001',
    status: 'Out for Delivery Today',
    statusType: 'out_for_delivery',
    etaDate: 'Today, Nov 14',
    etaTime: 'Between 1:00 PM – 4:00 PM',
    destination: 'New York, NY 10012',
    packageItem: {
      name: 'Kyoto Handcrafted Mechanical Keyboard',
      qty: 1,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80',
      weight: '1.8 kg',
      serial: 'SN-KYO-75-0144'
    },
    timeline: [
      {
        title: 'Order Confirmed & Gasket Tuned',
        location: 'Kyoto Artisan Workshop',
        date: 'Nov 10, 09:00 AM',
        status: 'completed'
      },
      {
        title: 'Customs Cleared & Arrived Regional Gateway',
        location: 'New York JFK Cargo Terminal',
        date: 'Nov 13, 06:15 PM',
        status: 'completed'
      },
      {
        title: 'Loaded onto Dedicated Electric Delivery Van',
        location: 'Manhattan South Delivery Hub',
        date: 'Nov 14, 07:45 AM',
        status: 'completed'
      },
      {
        title: 'Out for Courier Delivery — Courier #41',
        location: 'En route to recipient destination',
        date: 'Nov 14, 08:30 AM',
        status: 'active',
        note: 'Courier is 8 stops away. Adult signature required.'
      }
    ]
  }
};

export default function InfoModal({ modalType, onClose }) {
  const { addToast } = useToast();

  // Order Tracking State
  const [trackInput, setTrackInput] = useState('AUR-784291');
  const [currentOrder, setCurrentOrder] = useState(SAMPLE_ORDERS['AUR-784291']);
  const [copiedCode, setCopiedCode] = useState(false);

  // Concierge Form State
  const [conciergeForm, setConciergeForm] = useState({ name: '', email: '', message: '' });
  const [isConciergeSent, setIsConciergeSent] = useState(false);

  if (!modalType) return null;

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const clean = trackInput.trim().toUpperCase();
    if (!clean) return;

    const key = clean.startsWith('AUR-') ? clean : `AUR-${clean}`;
    if (SAMPLE_ORDERS[key]) {
      setCurrentOrder(SAMPLE_ORDERS[key]);
      addToast({
        title: 'Shipment Located',
        message: `Found live courier status for ${key}`,
        type: 'success'
      });
    } else {
      // Generate dynamic tracking record for any custom reference
      setCurrentOrder({
        id: key,
        carrier: 'DHL Express International Priority',
        carrierTracking: `DHL-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'In Transit — Dispatched from Studio',
        statusType: 'in_transit',
        etaDate: 'In 3 Business Days',
        etaTime: 'By End of Day',
        destination: 'Recipient Shipping Address',
        packageItem: {
          name: 'AURA Studio Curated Hardware Package',
          qty: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80',
          weight: '1.5 kg',
          serial: `SN-AUR-${Math.floor(10000 + Math.random() * 90000)}`
        },
        timeline: [
          {
            title: 'Order Confirmed & Payment Verified',
            location: 'AURA Central Fulfillment',
            date: 'Yesterday, 11:00 AM',
            status: 'completed'
          },
          {
            title: 'Inspected, Calibrated & Dispatched',
            location: 'Kyoto International Terminal',
            date: 'Today, 06:30 AM',
            status: 'active',
            note: 'Package handed over to DHL Express International Air Hub'
          },
          {
            title: 'International Air Transit',
            location: 'Pacific Freight Route',
            date: 'Tomorrow, Morning (Projected)',
            status: 'pending'
          },
          {
            title: 'Out for Final Delivery',
            location: 'Destination Local Hub',
            date: 'In 3 Days (Projected)',
            status: 'pending'
          }
        ]
      });
      addToast({
        title: 'Order Located',
        message: `Tracking generated for ${key}`,
        type: 'info'
      });
    }
  };

  const handleCopyCode = (code) => {
    try {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      addToast({
        title: 'Copied to Clipboard',
        message: `Tracking code ${code} copied.`,
        type: 'info'
      });
    } catch {
      // Fallback
    }
  };

  const handleLoadSample = (key) => {
    setTrackInput(key);
    setCurrentOrder(SAMPLE_ORDERS[key]);
  };

  const handleConciergeSubmit = (e) => {
    e.preventDefault();
    if (!conciergeForm.name || !conciergeForm.email || !conciergeForm.message) {
      addToast({
        title: 'Missing Required Fields',
        message: 'Please complete all fields before transmitting your inquiry.',
        type: 'warning'
      });
      return;
    }
    setIsConciergeSent(true);
    addToast({
      title: 'Inquiry Dispatched',
      message: 'An artisan concierge advisor will reply within 2 business hours.',
      type: 'success'
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="tracking-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="tracking-modal-header">
          <div className="flex items-center gap-3">
            <div className="tracking-header-icon-box">
              {modalType === 'track' && <Package className="w-5 h-5 text-indigo-600" />}
              {modalType === 'shipping' && <Truck className="w-5 h-5 text-indigo-600" />}
              {modalType === 'warranty' && <ShieldCheck className="w-5 h-5 text-indigo-600" />}
              {modalType === 'concierge' && <Send className="w-5 h-5 text-indigo-600" />}
              {modalType === 'privacy' && <Lock className="w-5 h-5 text-indigo-600" />}
              {modalType === 'terms' && <FileText className="w-5 h-5 text-indigo-600" />}
              {modalType === 'security' && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
            </div>

            <div>
              <h3 className="tracking-header-title">
                {modalType === 'track' && 'Track Studio Order'}
                {modalType === 'shipping' && 'Global Shipping & Returns Policy'}
                {modalType === 'warranty' && '2-Year Full Studio Warranty'}
                {modalType === 'concierge' && 'Artisan Concierge Support'}
                {modalType === 'privacy' && 'Privacy & Data Protection Policy'}
                {modalType === 'terms' && 'Terms of Service'}
                {modalType === 'security' && '256-Bit SSL Security Certificate'}
              </h3>
              <p className="tracking-header-subtitle">
                {modalType === 'track' && 'Real-time satellite & courier tracking for insured international shipments'}
                {modalType === 'shipping' && 'Complimentary worldwide express courier on orders over $200'}
                {modalType === 'warranty' && 'Comprehensive 24-month hardware coverage & zero-deductible replacement'}
                {modalType === 'concierge' && 'Direct contact with hardware technicians & acoustic designers in Kyoto'}
                {modalType === 'privacy' && 'Zero tracker cookies & tokenized bank-grade transaction standards'}
                {modalType === 'terms' && 'Authentic studio pieces with 30-day risk-free audition guarantee'}
                {modalType === 'security' && 'End-to-end cryptographic encryption with verified TLS 1.3 certificate'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="tracking-close-btn" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="tracking-modal-body">
          {/* ==============================================================
              1. TRACK ORDER VIEW
             ============================================================== */}
          {modalType === 'track' && (
            <div className="tracking-content-wrapper">
              {/* Search Bar Container */}
              <div className="tracking-search-card">
                <form onSubmit={handleTrackSubmit} className="tracking-search-form">
                  <div className="tracking-search-input-box">
                    <Search className="w-4 h-4 text-neutral-400 ml-3.5 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter order reference (e.g. AUR-784291)"
                      value={trackInput}
                      onChange={(e) => setTrackInput(e.target.value)}
                      className="tracking-search-input"
                    />
                    {trackInput && (
                      <button
                        type="button"
                        onClick={() => setTrackInput('')}
                        className="text-xs text-neutral-400 hover:text-neutral-700 px-2.5"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <button type="submit" className="tracking-search-submit-btn">
                    <span>Track Package</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </form>

                {/* Quick Demo Lookup Shortcuts */}
                <div className="tracking-quick-shortcuts">
                  <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Quick demo lookups:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleLoadSample('AUR-784291')}
                    className={`shortcut-chip ${currentOrder?.id === 'AUR-784291' ? 'active' : ''}`}
                  >
                    #AUR-784291 (In Transit · Air)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSample('AUR-920418')}
                    className={`shortcut-chip ${currentOrder?.id === 'AUR-920418' ? 'active' : ''}`}
                  >
                    #AUR-920418 (Out for Delivery Today)
                  </button>
                </div>
              </div>

              {/* Order Tracking Detailed Result */}
              {currentOrder && (
                <div className="tracking-result-card animate-fade-in">
                  {/* Top Status Banner */}
                  <div className="tracking-status-banner">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-extrabold text-neutral-900">
                          {currentOrder.id}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(currentOrder.id)}
                          className="copy-code-btn"
                          title="Copy tracking code"
                        >
                          {copiedCode ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-neutral-500" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="text-xs text-neutral-500 font-medium">
                        Carrier: <strong>{currentOrder.carrier}</strong> · Tracking #{currentOrder.carrierTracking}
                      </div>
                    </div>

                    <div className="status-live-pill">
                      <span className="status-live-dot" />
                      <span>{currentOrder.status}</span>
                    </div>
                  </div>

                  {/* ETA & Destination Grid */}
                  <div className="tracking-meta-grid">
                    <div className="tracking-meta-box">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Estimated Delivery</span>
                      </div>
                      <div className="text-base font-extrabold text-neutral-900">
                        {currentOrder.etaDate}
                      </div>
                      <div className="text-xs text-neutral-500 font-medium">
                        {currentOrder.etaTime}
                      </div>
                    </div>

                    <div className="tracking-meta-box">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Delivery Destination</span>
                      </div>
                      <div className="text-sm font-bold text-neutral-900">
                        {currentOrder.destination}
                      </div>
                      <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                        <Check className="w-3 h-3" /> Adult Signature Confirmed
                      </div>
                    </div>
                  </div>

                  {/* Package Item Preview */}
                  {currentOrder.packageItem && (
                    <div className="tracking-package-manifest">
                      <img
                        src={currentOrder.packageItem.image}
                        alt={currentOrder.packageItem.name}
                        className="package-manifest-thumb"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-neutral-900 truncate">
                          {currentOrder.packageItem.name}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Qty: {currentOrder.packageItem.qty} Unit · Weight: {currentOrder.packageItem.weight} · {currentOrder.packageItem.serial}
                        </div>
                      </div>
                      <div className="package-secure-tag">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                        <span>Insured</span>
                      </div>
                    </div>
                  )}

                  {/* Connected Step Timeline */}
                  <div className="tracking-timeline-section">
                    <h4 className="tracking-section-title">Shipment Progress & Transit Log</h4>

                    <div className="timeline-container">
                      {currentOrder.timeline.map((step, idx) => {
                        const isCompleted = step.status === 'completed';
                        const isActive = step.status === 'active';
                        const isPending = step.status === 'pending';

                        return (
                          <div key={idx} className={`timeline-node ${step.status}`}>
                            {/* Vertical Line Connector */}
                            {idx < currentOrder.timeline.length - 1 && (
                              <div className={`timeline-connector ${isCompleted ? 'completed' : ''}`} />
                            )}

                            {/* Node Bullet */}
                            <div className="timeline-bullet-wrapper">
                              {isCompleted && (
                                <div className="timeline-bullet completed">
                                  <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                                </div>
                              )}
                              {isActive && (
                                <div className="timeline-bullet active">
                                  <span className="bullet-radar-ring" />
                                  <span className="bullet-inner-dot" />
                                </div>
                              )}
                              {isPending && (
                                <div className="timeline-bullet pending">
                                  <span className="bullet-pending-dot" />
                                </div>
                              )}
                            </div>

                            {/* Node Content */}
                            <div className="timeline-node-body">
                              <div className="timeline-node-header">
                                <h5 className={`timeline-node-title ${isActive ? 'active' : ''}`}>
                                  {step.title}
                                </h5>
                                <span className="timeline-node-date">{step.date}</span>
                              </div>

                              <div className="timeline-node-location">
                                <MapPin className="w-3 h-3 text-neutral-400 inline mr-1" />
                                <span>{step.location}</span>
                              </div>

                              {step.note && (
                                <div className="timeline-node-note">
                                  <span>{step.note}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==============================================================
              2. GLOBAL SHIPPING & RETURNS VIEW
             ============================================================== */}
          {modalType === 'shipping' && (
            <div className="space-y-4 text-xs text-neutral-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3.5">
                <Truck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-neutral-900 text-sm mb-1">
                    Complimentary Worldwide Express Courier
                  </h4>
                  <p className="text-neutral-600">
                    All orders of $200.00 or more qualify for automated free express delivery via DHL Express or FedEx Priority with full door-to-door transit insurance.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-neutral-900 text-xs mb-1">North America & Japan</div>
                  <div className="text-[11px] text-neutral-500">2–3 Business Days · Insured Courier</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-neutral-900 text-xs mb-1">Europe & United Kingdom</div>
                  <div className="text-[11px] text-neutral-500">3–4 Business Days · DHL Express Air</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
                <RefreshCw className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-neutral-900 text-sm mb-1">
                    30-Day Risk-Free Studio Audition
                  </h4>
                  <p className="text-neutral-600">
                    Experience our hardware in your daily environment for up to 30 days. If the acoustic profile does not surpass your expectations, return it with our complimentary prepaid shipping label for a 100% full refund with zero restocking fees.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================================
              3. 2-YEAR STUDIO WARRANTY VIEW
             ============================================================== */}
          {modalType === 'warranty' && (
            <div className="space-y-4 text-xs text-neutral-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3.5">
                <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-neutral-900 text-sm mb-1">
                    Comprehensive 24-Month Hardware Guarantee
                  </h4>
                  <p className="text-neutral-600">
                    Every acoustic instrument, chassis, mechanical switch, and internal beryllium driver is covered against manufacturer defects and acoustic degradation for a full 2 years from date of receipt.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-neutral-800">Zero deductible fees for parts, labor, or courier transit.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-neutral-800">Advance hardware replacement dispatched within 24 hours of claim.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold text-neutral-800">Transferable warranty if gifted to another collector.</span>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================================
              4. CONCIERGE SUPPORT VIEW
             ============================================================== */}
          {modalType === 'concierge' && (
            <div>
              {!isConciergeSent ? (
                <form onSubmit={handleConciergeSubmit} className="space-y-3">
                  <p className="text-xs text-neutral-600 mb-2">
                    Connect directly with our dedicated hardware technicians and acoustic advisors in Kyoto & San Francisco.
                  </p>

                  <div>
                    <label className="checkout-label">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={conciergeForm.name}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, name: e.target.value })}
                      placeholder="e.g. Alexander Wright"
                      className="checkout-input"
                    />
                  </div>

                  <div>
                    <label className="checkout-label">Email Address</label>
                    <input
                      type="email"
                      required
                      value={conciergeForm.email}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, email: e.target.value })}
                      placeholder="e.g. alex@example.com"
                      className="checkout-input"
                    />
                  </div>

                  <div>
                    <label className="checkout-label">How can our concierge assist you?</label>
                    <textarea
                      rows={3}
                      required
                      value={conciergeForm.message}
                      onChange={(e) => setConciergeForm({ ...conciergeForm, message: e.target.value })}
                      placeholder="Inquire regarding acoustic pairings, order customization, or hardware specs..."
                      className="checkout-input"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full py-3 text-xs font-bold mt-2">
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    Send Inquiry to Concierge
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="font-bold text-neutral-900 text-base">Inquiry Transmitted</h4>
                  <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                    Thank you, {conciergeForm.name}. A concierge advisor will reply directly to {conciergeForm.email} within 2 business hours.
                  </p>
                  <button onClick={onClose} className="btn btn-secondary text-xs mt-3">
                    Close Dialog
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ==============================================================
              5. PRIVACY POLICY VIEW
             ============================================================== */}
          {modalType === 'privacy' && (
            <div className="space-y-3 text-xs text-neutral-600 leading-relaxed max-h-72 overflow-y-auto pr-2 custom-scroll">
              <p><strong>AURA Studio</strong> adheres to strict minimal data collection practices under GDPR and CCPA standards.</p>
              <p>We do not sell, rent, or monetize customer records under any circumstances. Payment details are tokenized through 256-bit PCI-DSS Level 1 payment gateways (Stripe & Apple Pay) and are never stored on plaintext servers.</p>
              <p>Cart preferences and applied promo codes are stored locally in your browser’s localStorage to provide continuity without cross-site tracker cookies.</p>
            </div>
          )}

          {/* ==============================================================
              6. TERMS OF SERVICE VIEW
             ============================================================== */}
          {modalType === 'terms' && (
            <div className="space-y-3 text-xs text-neutral-600 leading-relaxed max-h-72 overflow-y-auto pr-2 custom-scroll">
              <p><strong>1. Studio Authenticity:</strong> All pieces sold via this store are genuine, factory-calibrated original hardware.</p>
              <p><strong>2. Pricing & Orders:</strong> All orders are subject to stock validation. In the rare event of inventory discrepancy, full refunds are issued within 12 hours.</p>
              <p><strong>3. Satisfaction Guarantee:</strong> All customers receive our 30-day risk-free audition period with no restocking fees.</p>
            </div>
          )}

          {/* ==============================================================
              7. SSL SECURITY VIEW
             ============================================================== */}
          {modalType === 'security' && (
            <div className="space-y-3 text-xs text-neutral-700 leading-relaxed text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 mb-2">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-neutral-900 text-base">256-Bit TLS 1.3 Bank-Grade Security</h4>
              <p className="text-neutral-500 max-w-sm mx-auto">
                Every transmission between your browser and our store is guarded by end-to-end cryptographic encryption with verified SHA-256 certificate validation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
