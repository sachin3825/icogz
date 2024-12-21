import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  displayName: z.string().min(1, "Display Name is required"),
  workspaceName: z.string().min(1, "Workspace Name is required"),
  workspaceUrl: z
    .string()
    .optional()
    .refine((url) => !url || /^https?:\/\/\S+$/.test(url), {
      message: "Must be a valid URL",
    }),
  usageDetails: z.string().min(1, "Please select a usage detail"),
});
