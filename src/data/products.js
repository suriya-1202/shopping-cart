export const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'audio', label: 'Acoustics' },
  { id: 'workspace', label: 'Desk & Tech' },
  { id: 'lifestyle', label: 'Living & Comfort' },
  { id: 'accessories', label: 'Leather & EDC' }
];

export const PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Aether Hi-Fi Wireless Headphones',
    category: 'audio',
    price: 349.00,
    originalPrice: 399.00,
    rating: 4.9,
    reviewCount: 248,
    stock: 8,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
    description: 'Precision-tuned beryllium drivers deliver studio-grade acoustic clarity with active adaptive noise cancellation and 40-hour ultra battery life.',
    features: [
      'Custom 45mm beryllium acoustic drivers',
      'Hybrid active noise cancellation with transparency mode',
      'Ultra-soft memory foam and lambskin ear cushions',
      '40-hour battery life with 10-minute fast charging'
    ],
    specs: {
      Connectivity: 'Bluetooth 5.3 & 3.5mm Hi-Res',
      Weight: '280g',
      Battery: '40 Hours Playback',
      Warranty: '2-Year Manufacturer'
    }
  },
  {
    id: 'prod-002',
    name: 'Kyoto Handcrafted Mechanical Keyboard',
    category: 'workspace',
    price: 219.00,
    originalPrice: 249.00,
    rating: 4.8,
    reviewCount: 182,
    stock: 12,
    badge: 'Staff Pick',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85',
    description: 'CNC-machined aluminum chassis with gasket mounting, factory-lubed linear switches, and seamless dual wireless connectivity.',
    features: [
      'Gasket-mounted acoustic dampening structure',
      'Hot-swappable PCB with custom lubed switches',
      'PBT dye-sublimated cherry profile keycaps',
      'Triple-mode connectivity (2.4GHz, BT 5.2, USB-C)'
    ],
    specs: {
      Layout: '75% Compact Layout',
      Switch: 'Custom Linear Thock 45g',
      Material: 'CNC Anodized Aluminum',
      Backlight: 'Per-key RGB North-facing'
    }
  },
  {
    id: 'prod-003',
    name: 'Artisan Ceramic Pour-Over Dripper',
    category: 'lifestyle',
    price: 58.00,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 95,
    stock: 15,
    badge: null,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85',
    description: 'Individually thrown stoneware dripper engineered with optimized spiral interior grooves for even extraction and rich floral notes.',
    features: [
      'High-fired organic stoneware ceramic',
      'Precision thermal retention spiral ribs',
      'Compatible with standard V60 cone filters',
      'Dishwasher safe and food-grade glazed'
    ],
    specs: {
      Capacity: '1 - 4 Cups',
      Origin: 'Kyoto, Japan',
      Finish: 'Matte Charcoal Stoneware',
      Weight: '340g'
    }
  },
  {
    id: 'prod-004',
    name: 'Lumina Minimalist Desk Lamp',
    category: 'workspace',
    price: 185.00,
    originalPrice: 210.00,
    rating: 4.9,
    reviewCount: 140,
    stock: 6,
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
    description: 'Sculptural architectural task lamp featuring circadian-rhythm auto-dimming, touch sensory control, and integrated Qi wireless charging.',
    features: [
      'Full-spectrum 98 CRI LED chip for zero eye fatigue',
      'Continuous color temperature dial (2700K - 6500K)',
      '15W Fast Qi wireless charging base',
      'Solid aerospace aluminum counter-balanced arm'
    ],
    specs: {
      Brightness: '1200 Lumens Max',
      Power: 'USB-C PD 30W Input',
      Material: 'Anodized Aircraft Aluminum',
      Lifespan: '50,000+ Operating Hours'
    }
  },
  {
    id: 'prod-005',
    name: 'Sylvan Full-Grain Leather Commuter Pack',
    category: 'accessories',
    price: 295.00,
    originalPrice: 340.00,
    rating: 4.9,
    reviewCount: 312,
    stock: 5,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
    description: 'Vegetable-tanned full-grain Tuscan leather with waterproof lining, padded 16-inch laptop pocket, and hidden passport security sleeve.',
    features: [
      'Top-tier Tuscan vegetable-tanned leather',
      'Dedicated suspended 16” MacBook sleeve',
      'YKK Excella weather-resistant metal zippers',
      'Breathable contoured mesh back panel'
    ],
    specs: {
      Capacity: '22 Liters',
      Dimensions: '46cm x 31cm x 15cm',
      Hardware: 'Matte Black Gunmetal',
      Warranty: 'Lifetime Craftsmanship'
    }
  },
  {
    id: 'prod-006',
    name: 'Vessel Studio Reference Monitors (Pair)',
    category: 'audio',
    price: 480.00,
    originalPrice: 520.00,
    rating: 4.9,
    reviewCount: 78,
    stock: 4,
    badge: 'Audiophile',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=85',
    description: 'Bi-amplified nearfield monitors crafted from dense walnut cabinetry with silk dome tweeters and carbon-composite low frequency woofers.',
    features: [
      'Pure silk dome tweeters for crisp airy highs',
      '5.25” woven Kevlar cone woofers',
      'Class-D 120W bi-amp with DSP room tuning',
      'Balanced XLR and optical lossless digital inputs'
    ],
    specs: {
      Frequency: '42Hz - 24,000Hz',
      Power: '120W RMS Total',
      Enclosure: 'Solid American Walnut',
      Inputs: 'XLR, Optical, RCA, BT 5.0'
    }
  },
  {
    id: 'prod-007',
    name: 'Chronos Minimalist Sapphire Watch',
    category: 'accessories',
    price: 265.00,
    originalPrice: 295.00,
    rating: 4.8,
    reviewCount: 164,
    stock: 10,
    badge: 'Classic',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
    description: 'Swiss movement encased in 316L brushed surgical steel with double-domed anti-reflective sapphire crystal and interchangeable straps.',
    features: [
      'Swiss Ronda quartz high-precision caliber',
      'Scratch-resistant double-domed sapphire crystal',
      'Quick-release Italian saddle leather strap',
      '5 ATM water resistance (50 meters / 165 ft)'
    ],
    specs: {
      Diameter: '39mm Case, 7.5mm Thickness',
      Crystal: 'Anti-Reflective Sapphire',
      'Strap Width': '20mm Quick-Release',
      Movement: 'Swiss Quartz Gold Caliber'
    }
  },
  {
    id: 'prod-008',
    name: 'Nebula Ultrasonic Botanical Diffuser',
    category: 'lifestyle',
    price: 89.00,
    originalPrice: 110.00,
    rating: 4.6,
    reviewCount: 203,
    stock: 14,
    badge: null,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85',
    description: 'Milled ceramic cover housing 2.4MHz ultrasonic cold vapor technology, ambient warm-amber glow, and automatic safety shut-off.',
    features: [
      'Cold ultrasound diffusion preserves essential oil terpenes',
      'Whisper-quiet operation (<20dB)',
      'Dual mist modes: Continuous or 30s Intermittent',
      'Handcrafted natural porcelain stone shell'
    ],
    specs: {
      Capacity: '250ml Water Tank',
      Coverage: 'Up to 500 sq. ft.',
      Timer: '1h / 3h / 6h / Auto-Off',
      LED: 'Warm 2200K Ambient Glow'
    }
  },
  {
    id: 'prod-009',
    name: 'Meridian Wool & Merino Throw Blanket',
    category: 'lifestyle',
    price: 140.00,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 67,
    stock: 9,
    badge: 'Cozy',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85',
    description: 'Woven from 100% sustainably sourced extra-fine Australian Merino wool. Featherlight warmth, hypoallergenic, and timeless herringbone weave.',
    features: [
      'Pure 19.5 micron ultra-fine Merino wool',
      'Naturally temperature regulating and odor-resistant',
      'Classic hand-twisted fringed edges',
      'OEKO-TEX Standard 100 certified non-toxic'
    ],
    specs: {
      Dimensions: '140cm x 190cm',
      Origin: 'Woven in Portugal',
      Care: 'Dry Clean or Gentle Wool Wash',
      Weight: '750g'
    }
  },
  {
    id: 'prod-010',
    name: 'Apex Matte Titanium Thermal Flask',
    category: 'accessories',
    price: 75.00,
    originalPrice: 90.00,
    rating: 4.8,
    reviewCount: 189,
    stock: 18,
    badge: 'Eco Pick',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85',
    description: 'Grade 1 medical pure titanium with vacuum double-wall insulation. Keeps drinks steaming hot for 18h or glacier cold for 36h with zero metallic taste.',
    features: [
      'Pure Grade 1 biocompatible titanium construction',
      'Zero taste transfer, BPA-free, and chemical resistant',
      'Double-wall vacuum insulation with copper lining',
      'Ultralight weight at just 210 grams'
    ],
    specs: {
      Capacity: '650ml / 22 oz',
      Weight: '210g (Ultralight)',
      Thermal: '18h Hot / 36h Cold',
      Cap: 'Leakproof Titanium Thread'
    }
  }
];
