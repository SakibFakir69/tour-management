import z from "zod";
import { ISactive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string()

    .optional(),

  email: z.string().email().optional(),

  password: z.string().min(8).max(40).optional(),

  phone: z.string().optional(),

  address: z.string().optional(),
});

// update
export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "must be long" })
    .max(20, { message: "must be sort" })
    .optional(),

  email: z.string().email(),

  password: z.string().min(8).max(40),

  phone: z.string(),

  address: z.string(),
  role: z.enum(Object.keys(Role) as [string]).optional(),

  isActive: z.enum(Object.values(ISactive) as [string]).optional(),
  isVerified: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});
