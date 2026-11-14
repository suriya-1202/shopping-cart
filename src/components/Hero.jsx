import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Star, Sparkles, Check, Flame, ShoppingBag } from 'lucide-react';
import HeroBackgroundAnimation from './HeroBackgroundAnimation';

const FEATURED_HERO_ITEMS = [
  {
    id: 'prod-001',
    name: 'Aether Hi-Fi Wireless Headphones',
    category: 'Acoustics',
    price: 349.00,
    originalPrice: 399.00,
    rating: 4.9,
    reviews: 248,
    tag: 'Bestseller Flagship',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
    spec: 'Beryllium 45mm Drivers · 40h Battery · Hybrid ANC',
    accentColor: '#4f46e5'
  },
  {
    id: 'prod-002',
    name: 'Kyoto Handcrafted Keyboard',
    category: 'Desk & Tech',
    price: 219.00,
    originalPrice: 249.00,
    rating: 4.8,
    reviews: 182,
    tag: 'Staff Favorite',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85',
    spec: 'CNC Anodized Aluminum · Gasket Mount · Triple-Mode',
    accentColor: '#d97706'
  },
  {
    id: 'prod-004',
    name: 'Lumina Minimalist Desk Lamp',
    category: 'Workspace',
    price: 185.00,
    originalPrice: 210.00,
    rating: 4.9,
    reviews: 140,
    tag: 'Architectural Edition',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
    spec: 'Circadian Dimming · 98 CRI Chip · 15W Qi Fast Charger',
    accentColor: '#059669'
  }
];

export default function Hero({ onExploreClick, onAddToCart, onQuickView, rawProducts = [] }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isHeroAdded, setIsHeroAdded] = useState(false);

  // Live countdown timer for extra realism and urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate hero featured item every 7 seconds
  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setActiveItemIndex(prev => (prev + 1) % FEATURED_HERO_ITEMS.length);
    }, 7000);
    return () => clearInterval(rotationTimer);
  }, []);

  const currentHero = FEATURED_HERO_ITEMS[activeItemIndex];

  const handleHeroQuickAdd = () => {
    const productData = rawProducts.find(p => p.id === currentHero.id);
    if (productData && onAddToCart) {
      onAddToCart(productData, 1);
      setIsHeroAdded(true);
      setTimeout(() => setIsHeroAdded(false), 1800);
    }
  };

  const handleHeroQuickView = () => {
    const productData = rawProducts.find(p => p.id === currentHero.id);
    if (productData && onQuickView) {
      onQuickView(productData);
    }
  };

  return (
    <section className="hero-section">
      {/* Unique Animated Background (Homepage Hero Only) */}
      <HeroBackgroundAnimation />

      <div className="hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-main-grid">
          {/* Left Column: Compelling Editorial Typography & Social Proof */}
          <div className="hero-text-col">
            <div className="hero-pill-badge">
              <span className="hero-badge-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Autumn 2026 Architectural Release</span>
            </div>

            <h1 className="hero-title">
              Engineered Clarity.<br />
              <span className="hero-title-highlight">Timeless Form.</span>
            </h1>

            <p className="hero-description">
              Meticulously crafted acoustics, solid walnut enclosures, and precision workspace instruments designed to transform your daily rituals into moments of pure focus.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <button
                onClick={onExploreClick}
                className="btn btn-hero-primary"
              >
                <span>Explore Catalog</span>
                <ArrowDown className="w-4 h-4 ml-2 animate-bounce-subtle" />
              </button>

              <button
                onClick={handleHeroQuickView}
                className="btn btn-hero-secondary"
              >
                <span>Spotlight Item</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>

            {/* Social Proof & Live Flash Ticker */}
            <div className="hero-meta-strip">
              <div className="hero-social-proof">
                <div className="hero-avatar-stack">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Customer" className="avatar-img" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Customer" className="avatar-img" />
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" alt="Customer" className="avatar-img" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-neutral-800 ml-1">4.9 / 5.0</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium">From 2,400+ verified creators</div>
                </div>
              </div>

              {/* Limited Drop Timer */}
              <div className="hero-timer-box">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-0.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>Complimentary Shipping Drop</span>
                </div>
                <div className="font-mono text-xs font-semibold text-neutral-700">
                  Ends in: <span className="timer-digits">{String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Animated Product Spotlight Card */}
          <div className="hero-showcase-col">
            <div className="hero-showcase-card">
              {/* Top Selector Tabs */}
              <div className="hero-showcase-tabs">
                {FEATURED_HERO_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveItemIndex(idx)}
                    className={`showcase-tab-btn ${activeItemIndex === idx ? 'active' : ''}`}
                  >
                    {item.category}
                  </button>
                ))}
              </div>

              {/* Main Visual Display */}
              <div className="hero-showcase-visual group" onClick={handleHeroQuickView}>
                <img
                  key={currentHero.id}
                  src={currentHero.image}
                  alt={currentHero.name}
                  className="hero-spotlight-image animate-fade-in"
                />

                {/* Floating Micro-Badges */}
                <div className="floating-badge badge-top-left animate-float-slow">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 inline mr-1" />
                  <span>{currentHero.tag}</span>
                </div>

                <div className="floating-badge badge-bottom-right animate-float-reverse">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                    <span className="font-bold text-neutral-800">{currentHero.rating}</span>
                    <span className="text-neutral-500">({currentHero.reviews})</span>
                  </div>
                </div>

                {/* Hover Spotlight Indicator */}
                <div className="hero-view-pill">
                  <span>Click for 360° Studio View</span>
                </div>
              </div>

              {/* Showcase Card Details */}
              <div className="hero-showcase-footer">
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-wider font-bold text-indigo-600 mb-0.5">
                    {currentHero.category}
                  </div>
                  <h3
                    className="text-base font-bold text-neutral-900 truncate hover:text-indigo-600 cursor-pointer"
                    onClick={handleHeroQuickView}
                  >
                    {currentHero.name}
                  </h3>
                  <div className="text-xs text-neutral-500 truncate mt-0.5">
                    {currentHero.spec}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-neutral-900">
                      ${currentHero.price.toFixed(2)}
                    </div>
                    {currentHero.originalPrice && (
                      <div className="text-xs text-neutral-400 line-through">
                        ${currentHero.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleHeroQuickAdd}
                    className={`btn-hero-quick-add ${isHeroAdded ? 'btn-added' : ''}`}
                    aria-label={`Quick add ${currentHero.name}`}
                  >
                    {isHeroAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-scale-up" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Value Props Bar */}
        <div className="trust-grid-white">
          <div className="trust-card">
            <div className="trust-icon-box">
              <Truck className="trust-icon" />
            </div>
            <div>
              <div className="trust-title">Complimentary Global Express</div>
              <div className="trust-desc">Insured courier on orders over $200</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <ShieldCheck className="trust-icon" />
            </div>
            <div>
              <div className="trust-title">2-Year Studio Hardware Warranty</div>
              <div className="trust-desc">Comprehensive repair & replacement</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <RefreshCw className="trust-icon" />
            </div>
            <div>
              <div className="trust-title">30-Day Risk-Free Audition</div>
              <div className="trust-desc">Complimentary prepaid return labels</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">
              <Award className="trust-icon" />
            </div>
            <div>
              <div className="trust-title">Artisan Acoustic Standard</div>
              <div className="trust-desc">Individually calibrated & tested</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
