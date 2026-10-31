import type { Product } from "@/types";

export const categories = [
  { name: "Skincare", slug: "skincare" },
  { name: "Face care", slug: "face-care" },
  { name: "Body care", slug: "body-care" },
  { name: "Hair care", slug: "hair-care" },
  { name: "Beauty essentials", slug: "beauty-essentials" },
];

export const products: Product[] = [
  {
    id: "prod-1",
    slug: "radiant-glow-serum",
    name: "Radiant Glow Serum",
    price: 68,
    compareAtPrice: 85,
    category: "Skincare",
    description:
      "A weightless vitamin-rich serum that brightens, smooths and supports long-lasting hydration for a healthy-looking glow.",
    shortDescription: "Brightening serum for a fresh, healthy glow.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    ],
    isNew: true,
    isFeatured: true,
    stock: 18,
    featuredText: "Best seller",
    ingredients: "Niacinamide, hyaluronic acid, vitamin C, panthenol.",
    benefits: ["Boosts glow", "Targets dullness", "Hydrates deeply"],
    usage: "Apply 2-3 drops to clean skin morning and night.",
    sizes: ["30ml", "50ml"],
  },
  {
    id: "prod-2",
    slug: "dew-cream-cleanser",
    name: "Dew Cream Cleanser",
    price: 42,
    compareAtPrice: 56,
    category: "Face care",
    description:
      "A gentle cream cleanser that lifts impurities while preserving skin comfort and moisture balance.",
    shortDescription: "Soft daily cleanser for sensitive skin.",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    ],
    isNew: false,
    isFeatured: true,
    stock: 9,
    benefits: ["Non-stripping cleanse", "Comforts skin", "Leaves skin fresh"],
    usage: "Massage onto damp skin and rinse with lukewarm water.",
    sizes: ["120ml"],
  },
  {
    id: "prod-3",
    slug: "restorative-body-butter",
    name: "Restorative Body Butter",
    price: 54,
    compareAtPrice: 70,
    category: "Body care",
    description:
      "A rich body butter infused with ceramides and shea butter to lock in hydration and smooth rough patches.",
    shortDescription: "Nutritive hydration for soft, supple skin.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    ],
    isNew: true,
    isFeatured: false,
    stock: 24,
    benefits: ["Deep moisture", "Softens dry areas", "Long-lasting finish"],
    usage: "Apply on damp skin after showering for best results.",
    sizes: ["200ml"],
  },
  {
    id: "prod-4",
    slug: "silk-hair-therapy-oil",
    name: "Silk Hair Therapy Oil",
    price: 60,
    compareAtPrice: 74,
    category: "Hair care",
    description:
      "A lightweight leave-in treatment that smooths, nourishes and adds shine without heaviness.",
    shortDescription: "Frizz control and shine enhancement.",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    ],
    isNew: true,
    isFeatured: true,
    stock: 12,
    benefits: ["Boosts shine", "Reduces frizz", "Protects against heat"],
    usage:
      "Warm 2-3 drops between palms and smooth through mid-lengths and ends.",
    sizes: ["30ml", "50ml"],
  },
  {
    id: "prod-5",
    slug: "velvet-lip-revive",
    name: "Velvet Lip Revive",
    price: 28,
    compareAtPrice: 36,
    category: "Beauty essentials",
    description:
      "A nourishing lip treatment with a soft satin finish designed for comfortable daily wear.",
    shortDescription: "Tinted lip nourishment and comfort.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
    ],
    isNew: false,
    isFeatured: false,
    stock: 30,
    benefits: ["Soft hydrated finish", "Comforting wear", "Subtle tint"],
    usage: "Apply as needed throughout the day.",
    sizes: ["8ml"],
  },
  {
    id: "prod-6",
    slug: "healing-facial-cream",
    name: "Healing Facial Cream",
    price: 74,
    compareAtPrice: 92,
    category: "Skincare",
    description:
      "A barrier-supportive moisturizer that hydrates deeply and helps relieve tight, dry skin.",
    shortDescription: "Barrier repair moisturizer for daily comfort.",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    ],
    isNew: false,
    isFeatured: true,
    stock: 14,
    benefits: ["Barrier support", "Deep hydration", "Smooths texture"],
    usage: "Use morning and evening after your serum.",
    sizes: ["50ml"],
  },
];

export const testimonials = [
  {
    name: "Nadia A.",
    quote:
      "The formulas feel luxurious without being heavy, and my skin has never looked calmer or more balanced.",
  },
  {
    name: "Ama K.",
    quote:
      "Beautiful products, very thoughtful packaging, and the customer service feels genuinely personal.",
  },
  {
    name: "Efua B.",
    quote:
      "I love how clean the routine is. Everything feels premium and effective, and shipping was prompt.",
  },
];

export const homeStats = [
  { label: "Active ingredients", value: "98%" },
  { label: "Customer satisfaction", value: "4.9/5" },
  { label: "Free delivery", value: "GHS 250+" },
];
