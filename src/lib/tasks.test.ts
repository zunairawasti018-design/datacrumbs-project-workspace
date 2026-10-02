import { describe, expect, it } from "vitest";
import { createTaskSchema, updateTaskSchema } from "./tasks";

describe("project task API validation", () => {
  it("accepts a valid task and trims its title", () => {
    expect(createTaskSchema.parse({ week: 1, title: "  Confirm scope  " })).toEqual({
      week: 1,
      title: "Confirm scope",
    });
  });

  it.each([
    { week: 0, title: "Too early" },
    { week: 5, title: "Out of range" },
    { week: 1, title: "   " },
    { week: 1, title: "x".repeat(121) },
  ])("rejects invalid create payloads: %o", (payload) => {
    expect(createTaskSchema.safeParse(payload).success).toBe(false);
  });

  it("accepts partial updates", () => {
    expect(updateTaskSchema.safeParse({ completed: true }).success).toBe(true);
    expect(updateTaskSchema.safeParse({ title: "Revised deliverable" }).success).toBe(true);
  });

  it("rejects empty or malformed updates", () => {
    expect(updateTaskSchema.safeParse({}).success).toBe(false);
    expect(updateTaskSchema.safeParse({ completed: "yes" }).success).toBe(false);
  });
});