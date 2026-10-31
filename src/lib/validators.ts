import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const signUpSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export const addressSchema = z.object({
  fullName: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  address: z.string().min(5, "Please enter your delivery address."),
  city: z.string().min(2, "Please enter your city."),
  notes: z.string().optional(),
});

export const orderStatusSchema = z.enum([
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);
