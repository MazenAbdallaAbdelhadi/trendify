import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
  bio: z.string().optional(),
  profileImage: z.instanceof(File).optional(),
});
