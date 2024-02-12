import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const messageSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name should be atleast 3 characters longer")
    .max(30, "Name shouyld not be longer than 30 characters"),
  email: z.string().min(1, "Email is required").email("Email is not valid"),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Invalid phone number")
    .or(z.literal("")),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type MessageProps = z.infer<typeof messageSchema>;
