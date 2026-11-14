"use server";

import { redirect } from "next/navigation";
import { passwordSchema, signInSchema, signUpSchema } from "@/lib/validators";
import type { AuthActionState } from "@/lib/auth-state";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SignupErrorDetails = {
  code?: string;
  status?: number;
  name?: string;
  message?: string;
};

function getSignupErrorMessage(error: SignupErrorDetails) {
  const code = error.code?.toLowerCase() ?? "";
  const detail = error.message?.toLowerCase() ?? "";
  const identity = `${code} ${error.name?.toLowerCase() ?? ""} ${detail}`;

  if (error.status === 429 || identity.includes("rate_limit")) {
    return "Too many confirmation emails were requested. Wait a few minutes, then use Resend confirmation email on this page.";
  }

  if (
    code === "user_already_exists" ||
    code === "email_exists" ||
    identity.includes("already registered")
  ) {
    return "This email already has an account. Log in, or use Resend confirmation email if you have not confirmed it yet.";
  }

  if (code === "weak_password" || identity.includes("password should")) {
    return "Choose a stronger password that meets the password requirements.";
  }

  if (code === "email_address_invalid" || identity.includes("invalid email")) {
    return "Supabase could not send to this email address. Check the address and try again.";
  }

  if (
    code === "redirect_url_not_allowed" ||
    identity.includes("redirect url")
  ) {
    return "The confirmation link URL is not allowed in Supabase. Add http://localhost:3000/** to Authentication → URL Configuration.";
  }

  if (code === "signup_disabled" || identity.includes("signup is disabled")) {
    return "New account registration is currently disabled in Supabase Auth settings.";
  }

  if (
    identity.includes("database error") ||
    identity.includes("saving new user") ||
    identity.includes("trigger")
  ) {
    return "Supabase could not save the new user to the database. Check the Auth user trigger and database logs in your Supabase project.";
  }

  if (
    error.name?.toLowerCase().includes("fetch") ||
    identity.includes("network") ||
    identity.includes("timeout")
  ) {
    return "Could not reach Supabase Auth just now. Check your connection and try again.";
  }

  const reference = error.code || error.name || "unknown";
  return `Supabase rejected signup (reference: ${reference}). Check the Auth logs in your Supabase project.`;
}

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Enter a valid email and password." };
  }

  let destination = "/";
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

    if (error) {
      return { status: "error", message: "Email or password is incorrect." };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profile?.role === "admin") {
      destination = "/admin";
    }
  } catch {
    return {
      status: "error",
      message: "Account services are not configured yet.",
    };
  }

  redirect(destination);
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        "Enter your name, a valid email, and a password of 8 characters or more.",
    };
  }

  let hasSession = false;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: { full_name: parsed.data.fullName },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=/account`,
      },
    });

    if (error) {
      console.error(
        "Supabase signup failed",
        JSON.stringify({
          name: error.name,
          code: error.code,
          status: error.status,
          message: error.message?.slice(0, 240),
        }),
      );
      return {
        status: "error",
        message: getSignupErrorMessage(error),
      };
    }

    hasSession = Boolean(data.session);
  } catch {
    return {
      status: "error",
      message: "Account services are not configured yet.",
    };
  }

  if (hasSession) {
    redirect("/account");
  }

  return {
    status: "success",
    message:
      "Check your inbox and spam folder for a confirmation link. After confirming your email, return here to log in.",
    email: parsed.data.email,
  };
}

export async function resendConfirmationAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.shape.email.safeParse(formData.get("email"));

  if (!parsed.success) {
    return { status: "error", message: "Enter a valid email address." };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: parsed.data,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=/account`,
      },
    });

    if (error) {
      return {
        status: "error",
        message:
          "We could not request another email. Wait a minute and try again.",
      };
    }
  } catch {
    return {
      status: "error",
      message: "Account services are not configured yet.",
    };
  }

  return {
    status: "success",
    message:
      "If this address has an unconfirmed account, a new confirmation email is on its way. Check your inbox and spam folder.",
  };
}

export async function sendPasswordResetAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.shape.email.safeParse(formData.get("email"));

  if (!parsed.success) {
    return { status: "error", message: "Enter a valid email address." };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
    });

    if (error) {
      return {
        status: "error",
        message: "We could not send a reset email right now. Please try again.",
      };
    }
  } catch {
    return {
      status: "error",
      message: "Account services are not configured yet.",
    };
  }

  return {
    status: "success",
    message:
      "If an account exists for that address, reset instructions are on the way.",
  };
}

export async function updatePasswordAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = passwordSchema.safeParse({
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Use a password of at least 8 characters.",
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.updateUser({
      password: parsed.data.password,
    });

    if (error) {
      return {
        status: "error",
        message: "This reset link is invalid or expired. Request a new one.",
      };
    }
  } catch {
    return {
      status: "error",
      message: "Account services are not configured yet.",
    };
  }

  redirect("/account");
}

export async function signOutAction() {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } finally {
    redirect("/login");
  }
}
