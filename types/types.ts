import z from "zod";

export const projectUpdateValidation = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  objective: z.string().optional(),
  scope: z.string().optional(),
  stakeholders: z.string().optional(),
  budget: z.number().optional(),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "Deadline must be in the future",
  }),
  expectedOutcome: z.string().optional(),
});

export type updateProjectValidation = z.infer<typeof projectUpdateValidation>;
