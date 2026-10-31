export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  isNew: boolean;
  isFeatured: boolean;
  stock: number;
  featuredText?: string;
  ingredients?: string;
  benefits?: string[];
  usage?: string;
  sizes?: string[];
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
};
