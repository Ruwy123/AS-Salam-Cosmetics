insert into public.categories (name, slug, description)
values
  ('Skincare', 'skincare', 'Daily skincare essentials for balanced, healthy-looking skin.'),
  ('Face care', 'face-care', 'Gentle and effective care for the face.'),
  ('Body care', 'body-care', 'Nourishing care for soft, comfortable skin.'),
  ('Hair care', 'hair-care', 'Thoughtful essentials for healthy-looking hair.'),
  ('Beauty essentials', 'beauty-essentials', 'Small everyday essentials for your beauty ritual.')
on conflict (slug) do nothing;

with seed_products (
  category_slug, name, slug, short_description, description, price,
  compare_at_price, is_featured, is_new, stock, image_url,
  ingredient_notes, benefits, usage_instructions
) as (
  values
    (
      'skincare', 'Radiant Glow Serum', 'radiant-glow-serum',
      'Brightening serum for a fresh, healthy glow.',
      'A weightless vitamin-rich serum that brightens, smooths and supports long-lasting hydration for a healthy-looking glow.',
      68, 85, true, true, 18,
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'Niacinamide, hyaluronic acid, vitamin C, panthenol.',
      array['Boosts glow', 'Targets dullness', 'Hydrates deeply'],
      'Apply 2-3 drops to clean skin morning and night.'
    ),
    (
      'face-care', 'Dew Cream Cleanser', 'dew-cream-cleanser',
      'Soft daily cleanser for sensitive skin.',
      'A gentle cream cleanser that lifts impurities while preserving skin comfort and moisture balance.',
      42, 56, true, false, 9,
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80',
      null,
      array['Non-stripping cleanse', 'Comforts skin', 'Leaves skin fresh'],
      'Massage onto damp skin and rinse with lukewarm water.'
    ),
    (
      'body-care', 'Restorative Body Butter', 'restorative-body-butter',
      'Nutritive hydration for soft, supple skin.',
      'A rich body butter infused with ceramides and shea butter to lock in hydration and smooth rough patches.',
      54, 70, false, true, 24,
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      null,
      array['Deep moisture', 'Softens dry areas', 'Long-lasting finish'],
      'Apply on damp skin after showering for best results.'
    ),
    (
      'hair-care', 'Silk Hair Therapy Oil', 'silk-hair-therapy-oil',
      'Frizz control and shine enhancement.',
      'A lightweight leave-in treatment that smooths, nourishes and adds shine without heaviness.',
      60, 74, true, true, 12,
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
      null,
      array['Boosts shine', 'Reduces frizz', 'Protects against heat'],
      'Warm 2-3 drops between palms and smooth through mid-lengths and ends.'
    ),
    (
      'beauty-essentials', 'Velvet Lip Revive', 'velvet-lip-revive',
      'Tinted lip nourishment and comfort.',
      'A nourishing lip treatment with a soft satin finish designed for comfortable daily wear.',
      28, 36, false, false, 30,
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      null,
      array['Soft hydrated finish', 'Comforting wear', 'Subtle tint'],
      'Apply as needed throughout the day.'
    ),
    (
      'skincare', 'Healing Facial Cream', 'healing-facial-cream',
      'Barrier repair moisturizer for daily comfort.',
      'A barrier-supportive moisturizer that hydrates deeply and helps relieve tight, dry skin.',
      74, 92, true, false, 14,
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
      null,
      array['Barrier support', 'Deep hydration', 'Smooths texture'],
      'Use morning and evening after your serum.'
    )
)
insert into public.products (
  category_id, name, slug, short_description, description, price,
  compare_at_price, is_featured, is_active, is_new, stock, image_url,
  ingredient_notes, benefits, usage_instructions
)
select
  categories.id,
  seed_products.name,
  seed_products.slug,
  seed_products.short_description,
  seed_products.description,
  seed_products.price,
  seed_products.compare_at_price,
  seed_products.is_featured,
  true,
  seed_products.is_new,
  seed_products.stock,
  seed_products.image_url,
  seed_products.ingredient_notes,
  seed_products.benefits,
  seed_products.usage_instructions
from seed_products
join public.categories on categories.slug = seed_products.category_slug
on conflict (slug) do nothing;