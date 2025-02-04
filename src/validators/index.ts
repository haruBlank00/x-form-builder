import { z } from "zod";

export const VALIDATORS = {
  text: z.string(),
  requiredText: z.string().min(1, { message: "Required" }),

  email: z.string().email({ message: "Invalid email address" }),
  requiredEmail: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Required" }),

  number: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Invalid number" }),
};

export const DEFAULT_VALUES = {
  text: "",
  number: 0,
  email: "",
};
