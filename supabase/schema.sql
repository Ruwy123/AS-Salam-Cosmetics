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

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'customer'
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.role is distinct from old.role
    and coalesce(auth.role(), '') <> 'service_role'
    and current_user <> 'postgres' then
    raise exception 'Profile role changes require a trusted server operation';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_profile_role_escalation on public.profiles;
create trigger prevent_profile_role_escalation
  before update of role on public.profiles
  for each row execute function public.prevent_profile_role_escalation();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.inventory enable row level security;
alter table public.inventory_transactions enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.discount_codes enable row level security;
alter table public.discount_redemptions enable row level security;
alter table public.store_settings enable row level security;
alter table public.newsletter_subscribers enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.categories, public.products, public.product_images,
  public.product_variants, public.discount_codes to anon;
grant select, insert, update, delete on public.categories, public.products,
  public.product_images, public.product_variants,
  public.discount_codes to authenticated;
grant select, insert, update, delete on public.profiles, public.carts,
  public.cart_items, public.orders, public.order_items, public.payments,
  public.discount_redemptions, public.inventory,
  public.inventory_transactions, public.store_settings,
  public.newsletter_subscribers to authenticated;
grant insert on public.newsletter_subscribers to anon;

drop policy if exists "profiles_read_self_or_admin" on public.profiles;
create policy "profiles_read_self_or_admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()))
  with check (id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all" on public.profiles
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "categories_read_active" on public.categories;
create policy "categories_read_active" on public.categories
  for select to anon, authenticated
  using (is_active);
drop policy if exists "categories_admin_all" on public.categories;
create policy "categories_admin_all" on public.categories
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "products_read_active" on public.products;
create policy "products_read_active" on public.products
  for select to anon, authenticated
  using (is_active);
drop policy if exists "products_admin_all" on public.products;
create policy "products_admin_all" on public.products
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "product_images_read_active" on public.product_images;
create policy "product_images_read_active" on public.product_images
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.products
      where products.id = product_images.product_id and products.is_active
    )
  );
drop policy if exists "product_images_admin_all" on public.product_images;
create policy "product_images_admin_all" on public.product_images
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "product_variants_read_active" on public.product_variants;
create policy "product_variants_read_active" on public.product_variants
  for select to anon, authenticated
  using (
    is_active and exists (
      select 1 from public.products
      where products.id = product_variants.product_id and products.is_active
    )
  );
drop policy if exists "product_variants_admin_all" on public.product_variants;
create policy "product_variants_admin_all" on public.product_variants
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "inventory_admin_all" on public.inventory;
create policy "inventory_admin_all" on public.inventory
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
drop policy if exists "inventory_transactions_admin_all" on public.inventory_transactions;
create policy "inventory_transactions_admin_all" on public.inventory_transactions
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "carts_owner_or_admin_all" on public.carts;
create policy "carts_owner_or_admin_all" on public.carts
  for all to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()))
  with check (user_id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists "cart_items_owner_or_admin_all" on public.cart_items;
create policy "cart_items_owner_or_admin_all" on public.cart_items
  for all to authenticated
  using (
    exists (
      select 1 from public.carts
      where carts.id = cart_items.cart_id
        and (carts.user_id = (select auth.uid()) or (select public.is_admin()))
    )
  )
  with check (
    exists (
      select 1 from public.carts
      where carts.id = cart_items.cart_id
        and (carts.user_id = (select auth.uid()) or (select public.is_admin()))
    )
  );

drop policy if exists "orders_read_owner_or_admin" on public.orders;
create policy "orders_read_owner_or_admin" on public.orders
  for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()));
drop policy if exists "orders_admin_all" on public.orders;
create policy "orders_admin_all" on public.orders
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "order_items_read_owner_or_admin" on public.order_items;
create policy "order_items_read_owner_or_admin" on public.order_items
  for select to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and (orders.user_id = (select auth.uid()) or (select public.is_admin()))
    )
  );
drop policy if exists "order_items_admin_all" on public.order_items;
create policy "order_items_admin_all" on public.order_items
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "payments_read_owner_or_admin" on public.payments;
create policy "payments_read_owner_or_admin" on public.payments
  for select to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
        and (orders.user_id = (select auth.uid()) or (select public.is_admin()))
    )
  );
drop policy if exists "payments_admin_all" on public.payments;
create policy "payments_admin_all" on public.payments
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "discount_codes_read_active" on public.discount_codes;
create policy "discount_codes_read_active" on public.discount_codes
  for select to anon, authenticated
  using (
    is_active
    and valid_from <= now()
    and (valid_to is null or valid_to > now())
  );
drop policy if exists "discount_codes_admin_all" on public.discount_codes;
create policy "discount_codes_admin_all" on public.discount_codes
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "discount_redemptions_read_owner_or_admin" on public.discount_redemptions;
create policy "discount_redemptions_read_owner_or_admin" on public.discount_redemptions
  for select to authenticated
  using (user_id = (select auth.uid()) or (select public.is_admin()));
drop policy if exists "discount_redemptions_admin_all" on public.discount_redemptions;
create policy "discount_redemptions_admin_all" on public.discount_redemptions
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "store_settings_admin_all" on public.store_settings;
create policy "store_settings_admin_all" on public.store_settings
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "newsletter_subscribers_public_insert" on public.newsletter_subscribers;
create policy "newsletter_subscribers_public_insert" on public.newsletter_subscribers
  for insert to anon, authenticated
  with check (length(email) between 3 and 320);
drop policy if exists "newsletter_subscribers_admin_all" on public.newsletter_subscribers;
create policy "newsletter_subscribers_admin_all" on public.newsletter_subscribers
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
