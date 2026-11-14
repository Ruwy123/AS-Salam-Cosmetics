import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const allowedDestinations = new Set(["/account", "/reset-password"]);

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const requestedDestination = request.nextUrl.searchParams.get("next");
  const destination = allowedDestinations.has(requestedDestination ?? "")
    ? requestedDestination!
    : "/account";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=callback", request.url));
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        new URL("/login?error=callback", request.url),
      );
    }
  } catch {
    return NextResponse.redirect(new URL("/login?error=callback", request.url));
  }

  return NextResponse.redirect(new URL(destination, request.url));
}
