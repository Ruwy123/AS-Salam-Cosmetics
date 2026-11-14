import "server-only";

import { connection } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  categories as fallbackCategories,
  products as fallbackProducts,
} from "@/lib/mock-data";
import type { Product } from "@/types";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

type ProductRow = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  description: string;
  price: number | string;
  compare_at_price: number | string | null;
  is_featured: boolean;
  is_new: boolean;
  stock: number;
  image_url: string | null;
  ingredient_notes: string | null;
  benefits: string[] | null;
  usage_instructions: string | null;
};

export type StoreCatalog = {
  products: Product[];
  categories: CategoryRow[];
  source: "supabase" | "development-fixtures";
};

const fallbackCatalog: StoreCatalog = {
  products: fallbackProducts.map((product) => ({
    ...product,
    categorySlug: categorySlugFromName(product.category),
  })),
  categories: fallbackCategories.map((category, index) => ({
    id: `fallback-category-${index + 1}`,
    name: category.name,
    slug: category.slug,
    description: null,
  })),
  source: "development-fixtures",
};

function categorySlugFromName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getStoreCatalog(): Promise<StoreCatalog> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return fallbackCatalog;
  }

  await connection();

  try {
    const supabase = await createSupabaseServerClient();
    const [productsResult, categoriesResult] = await Promise.all([
      supabase
        .from("products")
        .select(
          "id,category_id,name,slug,short_description,description,price,compare_at_price,is_featured,is_new,stock,image_url,ingredient_notes,benefits,usage_instructions",
        )
        .eq("is_active", true)
        .order("created_at", { ascending: false }),
      supabase
        .from("categories")
        .select("id,name,slug,description")
        .eq("is_active", true)
        .order("name", { ascending: true }),
    ]);

    if (productsResult.error || categoriesResult.error) {
      console.error("Catalog query failed", {
        products: productsResult.error?.code,
        categories: categoriesResult.error?.code,
      });
      if (process.env.NODE_ENV !== "production") return fallbackCatalog;
      return { products: [], categories: [], source: "supabase" };
    }

    const categories = (categoriesResult.data ?? []) as CategoryRow[];
    const categoryById = new Map(
      categories.map((category) => [category.id, category]),
    );
    const rows = (productsResult.data ?? []) as ProductRow[];

    if (rows.length === 0 && process.env.NODE_ENV !== "production") {
      console.info(
        "Catalog is empty; rendering development fixtures until seed.sql is applied.",
      );
      return fallbackCatalog;
    }

    const mappedProducts = rows.map((row): Product => {
      const category = row.category_id
        ? categoryById.get(row.category_id)
        : undefined;
      const image =
        row.image_url ??
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80";

      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        price: Number(row.price),
        compareAtPrice:
          row.compare_at_price === null
            ? undefined
            : Number(row.compare_at_price),
        category: category?.name ?? "Beauty",
        categorySlug:
          category?.slug ?? categorySlugFromName(category?.name ?? "Beauty"),
        description: row.description,
        shortDescription: row.short_description ?? row.description,
        image,
        gallery: [],
        isNew: row.is_new,
        isFeatured: row.is_featured,
        stock: row.stock,
        featuredText: row.is_featured ? "Best seller" : undefined,
        ingredients: row.ingredient_notes ?? undefined,
        benefits: row.benefits ?? undefined,
        usage: row.usage_instructions ?? undefined,
      };
    });

    return {
      products: mappedProducts,
      categories: categories.map((category) => ({
        ...category,
        description: category.description ?? null,
      })),
      source: "supabase",
    };
  } catch (error) {
    console.error("Catalog service unavailable", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    if (process.env.NODE_ENV !== "production") return fallbackCatalog;
    return { products: [], categories: [], source: "supabase" };
  }
}
