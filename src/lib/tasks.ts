import { z } from "zod";

export const createTaskSchema = z.object({
  week: z.number().int().min(1).max(4),
  title: z.string().trim().min(1).max(120),
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  completed: z.boolean().optional(),
}).refine((value) => Object.keys(value).length > 0, {
  message: "Provide a title or completion status to update.",
});

export type ProjectTask = {
  id: string;
  week: number;
  title: string;
  completed: boolean;
  created_at: string;
};