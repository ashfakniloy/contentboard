import { z } from "zod";

export const logoSchema = z.object({
  logoUrl: z.string().min(1, "Logo URL is required"),
  logoId: z.string().min(1, "Logo ID is required"),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9_\s]+$/,
      "Invalid username. Letters, numbers, spaces or underscores only"
    )
    .regex(/^[a-zA-Z][a-zA-Z0-9_\s]*$/, "Username must start with a letter"),
});

export const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Password is required"),
    newPassword: z.string().min(1, "New Password is required"),
    retypePassword: z.string().min(1, "Re-enter your new password"),
  })
  .refine((data) => data.newPassword === data.retypePassword, {
    message: "Re-enter new password correctly",
    path: ["retypePassword"],
  });

export const deleteAccountSchema = z.object({
  confirmPassword: z.string().min(1, "Password is required"),
  confirmText: z
    .string()
    .min(1, "This field is required")
    .refine(
      (value) => value === "delete my account",
      "Enter the text correctly"
    ),
});

export type LogoProps = z.infer<typeof logoSchema>;
export type UsernameProps = z.infer<typeof usernameSchema>;
export type EmailProps = z.infer<typeof emailSchema>;
export type PasswordProps = z.infer<typeof passwordSchema>;
export type DeleteAccountProps = z.infer<typeof deleteAccountSchema>;
