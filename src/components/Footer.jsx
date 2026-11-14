import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import InfoModal from './InfoModal';

export default function Footer({ onCategoryClick }) {
  const { addToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast({
        title: 'Invalid Email Address',
        message: 'Please provide a valid email to receive private dispatches.',
        type: 'warning'
      });
      return;
    }
    setIsSubscribed(true);
    addToast({
      title: 'Subscribed Successfully!',
      message: 'Welcome to the AURA Studio private collector circle.',
      type: 'success'
    });
    setNewsletterEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const handleCategoryNav = (catId) => {
    if (onCategoryClick) {
      onCategoryClick(catId);
    }
    // Smooth scroll to catalog
    const catalogEl = document.querySelector('.catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="footer-container">
        <div className="footer-content max-w-7xl mx-auto px-6 py-16">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="brand-mark">A</span>
                <span className="text-lg font-extrabold tracking-widest text-neutral-900">AURA STUDIO</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Makers of precision acoustic instruments, architectural workspace objects, and timeless everyday essentials for intentional living.
              </p>
              <div className="text-xs text-neutral-500 font-medium">
                Hand-assembled with ethical materials & sustainable craftsmanship.
              </div>
            </div>

            {/* Catalog Links */}
            <div className="footer-nav-col">
              <h4 className="footer-heading">Collections</h4>
              <ul className="footer-links">
                <li><button type="button" onClick={() => handleCategoryNav('audio')} className="footer-link">Acoustics & Sound</button></li>
                <li><button type="button" onClick={() => handleCategoryNav('workspace')} className="footer-link">Desk & Tech Instruments</button></li>
                <li><button type="button" onClick={() => handleCategoryNav('lifestyle')} className="footer-link">Living & Comfort</button></li>
                <li><button type="button" onClick={() => handleCategoryNav('accessories')} className="footer-link">Leather & EDC</button></li>
              </ul>
            </div>

            {/* Client Services - Fully Interactive */}
            <div className="footer-nav-col">
              <h4 className="footer-heading">Client Services</h4>
              <ul className="footer-links">
                <li><button type="button" onClick={() => setActiveModal('track')} className="footer-link">Track Your Order</button></li>
                <li><button type="button" onClick={() => setActiveModal('shipping')} className="footer-link">Global Shipping & Returns</button></li>
                <li><button type="button" onClick={() => setActiveModal('warranty')} className="footer-link">2-Year Studio Warranty</button></li>
                <li><button type="button" onClick={() => setActiveModal('concierge')} className="footer-link">Artisan Concierge Support</button></li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="footer-newsletter-col">
              <h4 className="footer-heading">Private Dispatch</h4>
              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                Subscribe to receive limited batch releases, acoustic design notes, and private collector previews.
              </p>
              {isSubscribed ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>You are subscribed to The Aura Gazette.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="newsletter-input"
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    className="newsletter-btn"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Bar with Interactive Dialogs */}
          <div className="footer-bottom-bar">
            <div className="text-xs text-neutral-500 font-medium">
              © {new Date().getFullYear()} AURA Studio Inc. All rights reserved. Crafted with React 18 & Vite.
            </div>

            <div className="flex items-center gap-6 text-xs text-neutral-600 font-medium">
              <button type="button" onClick={() => setActiveModal('privacy')} className="footer-bottom-link">Privacy Policy</button>
              <button type="button" onClick={() => setActiveModal('terms')} className="footer-bottom-link">Terms of Service</button>
              <button type="button" onClick={() => setActiveModal('security')} className="footer-bottom-link">SSL Secured</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Information & Support Modal */}
      {activeModal && (
        <InfoModal
          modalType={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
