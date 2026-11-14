import React, { useState, useMemo, useRef } from 'react';
import { PRODUCTS, CATEGORIES } from './data/products';
import { useCart } from './hooks/useCart';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';
import { Sparkles, PackageSearch, RotateCcw } from 'lucide-react';

function ShoppingApp() {
  const cartHook = useCart();
  const catalogRef = useRef(null);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Modal States
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // default order in catalog
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  // Scroll to catalog section smoothly
  const handleExploreClick = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  // Map cart quantities for quick lookup
  const cartQuantityMap = useMemo(() => {
    const map = {};
    cartHook.cart.forEach(item => {
      map[item.id] = item.quantity;
    });
    return map;
  }, [cartHook.cart]);

  return (
    <div className="app-layout">
      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* Navigation Bar */}
      <Navbar
        cartCount={cartHook.totalItemsCount}
        onOpenCart={cartHook.openCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        categories={CATEGORIES}
      />

      {/* Editorial Hero Banner */}
      <Hero
        onExploreClick={handleExploreClick}
        onAddToCart={cartHook.addToCart}
        onQuickView={setQuickViewProduct}
        rawProducts={PRODUCTS}
      />

      {/* Main Catalog Section */}
      <main ref={catalogRef} className="catalog-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="catalog-header mb-8">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Studio Catalog</span>
          </div>
          <h2 className="catalog-title">Explore The Permanent Collection</h2>
          <p className="catalog-subtitle">
            Every object in our permanent collection is designed with acoustic fidelity, tactile satisfaction, and enduring longevity in mind.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <FilterBar
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredProducts.length}
          onResetFilters={handleResetFilters}
          isFiltered={activeCategory !== 'all' || !!searchQuery.trim()}
        />

        {/* Products Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="empty-catalog-state">
            <PackageSearch className="w-16 h-16 text-neutral-500 mb-4 stroke-1" />
            <h3 className="text-xl font-semibold text-neutral-200">No matching products found</h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto mt-2">
              We couldn't find any instruments matching your search "{searchQuery}". Try searching for acoustic, desk, keyboard, or leather.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn btn-secondary mt-6"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={cartHook.addToCart}
                onIncrement={cartHook.incrementQuantity}
                onDecrement={cartHook.decrementQuantity}
                onRemove={cartHook.removeFromCart}
                onQuickView={setQuickViewProduct}
                cartQuantity={cartQuantityMap[product.id] || 0}
              />
            ))}
          </div>
        )}
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={cartHook.addToCart}
          cartQuantity={cartQuantityMap[quickViewProduct.id] || 0}
        />
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cartHook.isCartOpen}
        onClose={cartHook.closeCart}
        cart={cartHook.cart}
        subtotal={cartHook.subtotal}
        discount={cartHook.discount}
        shipping={cartHook.shipping}
        amountNeededForFreeShipping={cartHook.amountNeededForFreeShipping}
        freeShippingProgress={cartHook.freeShippingProgress}
        estimatedTax={cartHook.estimatedTax}
        total={cartHook.total}
        totalItemsCount={cartHook.totalItemsCount}
        onIncrement={cartHook.incrementQuantity}
        onDecrement={cartHook.decrementQuantity}
        onUpdateQuantity={cartHook.updateQuantity}
        onRemove={cartHook.removeFromCart}
        onClearCart={cartHook.clearCart}
        promoCode={cartHook.promoCode}
        promoMessage={cartHook.promoMessage}
        onApplyPromo={cartHook.applyPromoCode}
        onRemovePromo={cartHook.removePromoCode}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cartHook.cart}
        subtotal={cartHook.subtotal}
        discount={cartHook.discount}
        promoCode={cartHook.promoCode}
        shipping={cartHook.shipping}
        estimatedTax={cartHook.estimatedTax}
        total={cartHook.total}
        onOrderComplete={cartHook.clearCart}
      />

      {/* Editorial Footer */}
      <Footer onCategoryClick={setActiveCategory} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <ShoppingApp />
    </ToastProvider>
  );
}
