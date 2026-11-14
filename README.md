# AS-Salam Cosmetics

Premium beauty storefront built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Local Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_SITE_URL`. The service-role key is not used by browser or storefront code and must never be exposed with a `NEXT_PUBLIC_` prefix.

## Supabase Setup

1. Create a Supabase project and configure the local and deployed site URLs in **Authentication → URL Configuration**.
2. Set the project URL and anon/publishable key in `.env.local`.
3. Run `supabase/schema.sql` in the Supabase SQL Editor. This creates the tables, signup profile trigger, role guard, grants, and row-level security policies. Do not connect the app to customer data before applying it.
4. Run `supabase/seed.sql` in the SQL Editor to insert the six starter catalog products and categories. It only inserts missing slugs; it does not overwrite existing catalog records.
5. Configure Supabase email confirmation links to use `/auth/callback?next=/account` and password recovery links to use `/auth/callback?next=/reset-password`.
6. Register your own account, confirm its email if confirmation is enabled, then promote that account once in the SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'your-admin-email@example.com';
```

Customer registration always creates a `customer` profile. The profile trigger rejects role changes from normal authenticated requests, and the admin area checks the profile role on the server for every request. Never promote users from a client-side form.

## Checks

```bash
npm run build
npm run lint
```

Valid Supabase environment variables are required for authentication and database access. The storefront reads active products and categories from Supabase; in development only, sample fixtures are shown while the live catalog is empty or unavailable.
