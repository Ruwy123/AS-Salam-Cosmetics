create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  phone text,
  avatar_url text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text,
  description text not null,
  price numeric(10,2) not null check (price >= 0),
  compare_at_price numeric(10,2) check (compare_at_price is null or compare_at_price >= 0),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  is_new boolean not null default false,
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  ingredient_notes text,
  benefits text[],
  usage_instructions text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  sku text,
  price numeric(10,2) not null,
  stock integer not null default 0 check (stock >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, sku)
);

create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null unique references public.products(id) on delete cascade,
  available_stock integer not null default 0 check (available_stock >= 0),
  low_stock_threshold integer not null default 5,
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory_transactions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete restrict,
  quantity_change integer not null,
  reason text not null,
  reference_type text,
  reference_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  variant_id uuid references public.product_variants(id) on delete set null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cart_id, product_id, variant_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  order_number text not null unique,
  subtotal numeric(10,2) not null default 0,
  discount_amount numeric(10,2) not null default 0,
  shipping_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  status text not null default 'pending' check (status in ('pending','processing','shipped','delivered','cancelled')),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed','refunded')),
  customer_name text not null,
  email text not null,
  phone text,
  delivery_address text not null,
  city text not null,
  delivery_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  variant_id uuid references public.product_variants(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0),
  total_price numeric(10,2) not null,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  provider text not null,
  provider_reference text,
  amount numeric(10,2) not null,
  currency text not null default 'GHS',
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.discount_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  type text not null check (type in ('percentage','fixed')),
  value numeric(10,2) not null,
  min_order_value numeric(10,2) not null default 0,
  valid_from timestamptz not null default now(),
  valid_to timestamptz,
  usage_limit integer,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.discount_redemptions (
  id uuid primary key default gen_random_uuid(),
  discount_id uuid not null references public.discount_codes(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  redeemed_at timestamptz not null default now()
);

create table if not exists public.store_settings (
  id uuid primary key default gen_random_uuid(),
  store_name text not null default 'AS-Salam Cosmetics',
  logo_url text,
  contact_email text,
  contact_phone text,
  address text,
  currency text not null default 'GHS',
  announcement text,
  shipping_fee numeric(10,2) not null default 18,
  policies jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_active on public.products(is_active);
create index if not exists idx_orders_user on public.orders(user_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_cart_items_cart on public.cart_items(cart_id);
create index if not exists idx_discount_codes_active on public.discount_codes(is_active);
