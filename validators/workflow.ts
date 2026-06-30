import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(1, {
      message: "Name must be at least 1 character",
    })
    .max(50, {
      message: "Name must be less than 50 characters",
    }),
  description: z
    .string()
    .max(80, {
      message: "Description must be less than 80 characters",
    })
    .optional(),
});

export type CreateWorkflowSchema = z.infer<typeof createWorkflowSchema>;
