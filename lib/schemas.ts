import { z } from "zod";
import { DEPARTMENTS } from "@/types";

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    department: z.enum(DEPARTMENTS, {
      message: "Please select a department",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  uniqueId: z.string().min(1, "Unique ID is required"),
  password: z.string().min(1, "Password is required"),
});

export const fileUploadSchema = z.object({
  file: z.any().refine((file) => file instanceof File, "File is required"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type FileUploadFormData = z.infer<typeof fileUploadSchema>;
