import { z } from "zod";

export const schemaRegister = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "The name must have at least 3 characters")
      .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        "The name can only contain letters and spaces"
      ),
    username: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed")
      .min(3, "The username must have at least 3 characters"),
    email: z.string().trim().email("Must be a valid email address"),
    password: z
      .string()
      .trim()
      .min(6, "The password must have at least 6 characters"),
    confirmPassword: z
      .string()
      .trim()
      .min(6, "The password must have at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof schemaRegister>;
