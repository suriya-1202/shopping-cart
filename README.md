# AURA STUDIO — Luxury E-Commerce & Shopping Cart Application

A modern, high-performance shopping cart application engineered with **React 18**, **Vite**, modern CSS design systems, and glassmorphic micro-interactions. Built to deliver an Apple/Bang & Olufsen tier digital shopping experience.

---

## ✨ Features & Requirements Checklist

| Requirement | Implementation Details |
|---|---|
| **Display at least 8 products** | Curated catalog of **10 luxury items** across 4 categories (*Acoustics*, *Desk & Tech*, *Living & Comfort*, *Leather & EDC*) with high-res photography, star ratings, specs, and stock counts. |
| **Add to Cart button** | Implemented on both catalog cards and high-resolution Quick View modal with tactile feedback, loading state, and toast notification. |
| **Increase / Decrease quantity** | Interactive quantity steppers (`+` / `-`) and direct numeric inputs in both the product cards, product modal, and slide-over Cart Drawer. |
| **Remove products from cart** | Individual item removal with animated trash trigger and instant toast notification, plus an **"Empty Bag"** bulk reset button. |
| **Automatic Subtotal & Total** | Real-time calculation of **Subtotal**, **Dynamic Promo Code Discounts** (`WELCOME10`, `VIP20`, `AURA50`), **Free Shipping Threshold** (free over $200 with animated progress bar), **Estimated Sales Tax** (8%), and **Grand Total**. |
| **Prevent invalid quantities** | Enforced minimum quantity of 1 (cannot drop below 1 or be negative); capped by real-time available inventory stock; sanitized text input on change & blur; disables buttons and displays warning alerts when stock limits are reached. |
| **React State Management** | Centralized, pure custom hook `useCart` utilizing `useState`, `useMemo`, and `useCallback` for optimized re-renders. |
| **localStorage Persistence** | Automatic synchronization to browser `localStorage` under `aura_shopping_cart_v1` and `aura_applied_promo_v1`, surviving page reloads and browser restarts. |
| **Lightweight Animations** | CSS keyframe animations for cart slide-over drawer, badge bounce on additions, shimmer skeletons, smooth hover zoom, and celebratory confetti burst on order completion. |
| **Fully Responsive** | Optimized breakpoints for mobile (<640px), tablet (640px–1024px), and desktop (>1024px) with touch-friendly controls. |

---

## 🛠️ Architecture & Project Structure

```
Task 3/
├── index.html                   # HTML entry point with Plus Jakarta Sans & Playfair Display fonts
├── vite.config.js               # Optimized Vite configuration
├── package.json                 # React 18, Lucide React icons, Canvas Confetti
├── src/
│   ├── main.jsx                 # React root renderer
│   ├── App.jsx                  # Main coordinator: filters, search, modals, cart drawer
│   ├── index.css                # Master luxury dark-theme design system & responsive layout
│   ├── data/
│   │   └── products.js          # Catalog of 10 handcrafted products with specifications
│   ├── hooks/
│   │   └── useCart.js           # Robust custom hook: state, calculations, validation, localStorage
│   ├── context/
│   │   └── ToastContext.jsx     # Floating toast notification system
│   └── components/
│       ├── Navbar.jsx           # Sticky glassmorphic navbar with search and animated cart trigger
│       ├── Hero.jsx             # Editorial hero banner with value propositions
│       ├── FilterBar.jsx        # Category pills, live search count, and sorting dropdown
│       ├── ProductCard.jsx      # Card with image hover zoom, stock indicator, inline quantity & add
│       ├── ProductQuickView.jsx # High-res modal with full specs, features, and purchase flow
│       ├── CartDrawer.jsx       # Slide-over cart drawer with free shipping progress & promo codes
│       ├── CartItem.jsx         # Line item with quantity stepper, stock warnings, and line total
│       ├── CheckoutModal.jsx    # Complete checkout simulation with card inputs & confetti confirmation
│       ├── ToastContainer.jsx   # Micro-toast notifications viewport
│       └── Footer.jsx           # Luxury editorial footer with newsletter subscribe
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

---

## 🏷️ Test Promo Codes
Try applying any of these promo codes inside the Cart Drawer:
- `WELCOME10`: 10% discount on entire order
- `VIP20`: 20% exclusive VIP discount
- `AURA50`: $50 off orders over $200
