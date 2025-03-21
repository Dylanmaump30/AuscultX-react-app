import { z } from "zod";

export const schemaLogin = z.object({
  email: z.string().email("Must be a valid email address"),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters long"),
  name: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export type LoginValues = z.infer<typeof schemaLogin>;
