import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sparkles, SlidersHorizontal, ShieldCheck } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  activeCategory,
  onSelectCategory,
  categories
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [badgeAnimated, setBadgeAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger bounce animation whenever cartCount changes and is > 0
  useEffect(() => {
    if (cartCount > 0) {
      setBadgeAnimated(true);
      const timer = setTimeout(() => setBadgeAnimated(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      {/* Top Banner Announcement */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 inline-block" />
          <span>Complimentary Express Worldwide Shipping on orders over $200 · Use code <strong>WELCOME10</strong> for 10% off</span>
        </div>
      </div>

      <nav className="navbar-container">
        <div className="navbar-left">
          <a href="#" className="brand-logo" aria-label="AURA Studio Home">
            <span className="brand-mark">A</span>
            <div className="brand-text">
              <span className="brand-name">AURA</span>
              <span className="brand-tagline">STUDIO</span>
            </div>
          </a>
        </div>

        {/* Center Search Bar */}
        <div className="navbar-center">
          <div className="search-box">
            <Search className="search-icon w-4 h-4" />
            <input
              type="text"
              placeholder="Search handcrafted audio, workspace, lifestyle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="search-clear-btn"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Right Navigation & Cart Trigger */}
        <div className="navbar-right">
          <button
            onClick={onOpenCart}
            className="cart-trigger-btn"
            aria-label={`Open shopping cart with ${cartCount} items`}
          >
            <div className="cart-icon-wrapper">
              <ShoppingBag className="w-5 h-5 text-current" />
              {cartCount > 0 && (
                <span className={`cart-badge ${badgeAnimated ? 'badge-bounce' : ''}`}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </div>
            <span className="cart-label-text">Bag</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
