import { beforeEach, describe, expect, it, vi } from "vitest";
import { createClient } from "@/lib/supabase/server";
import { GET, POST } from "./route";
import { PATCH } from "./[id]/route";

vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn() }));

const mockedCreateClient = vi.mocked(createClient);

function setAuthenticated(user: { id: string } | null) {
  mockedCreateClient.mockResolvedValue({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user } }) },
  } as never);
}

function jsonRequest(body: unknown) {
  return new Request("http://localhost/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("task API endpoints", () => {
  beforeEach(() => mockedCreateClient.mockReset());

  it("rejects unauthenticated reads", async () => {
    setAuthenticated(null);

    const response = await GET();

    expect(response.status).toBe(401);
  });

  it("rejects unauthenticated task creation", async () => {
    setAuthenticated(null);

    const response = await POST(jsonRequest({ week: 1, title: "Map workflows" }));

    expect(response.status).toBe(401);
  });

  it("rejects invalid task payloads at the HTTP endpoint", async () => {
    setAuthenticated({ id: "user-1" });

    const response = await POST(jsonRequest({ week: 8, title: "  " }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.fieldErrors).toMatchObject({ week: expect.any(Array), title: expect.any(Array) });
  });

  it("rejects malformed updates at the HTTP endpoint", async () => {
    setAuthenticated({ id: "user-1" });

    const response = await PATCH(
      new Request("http://localhost/api/tasks/task-1", { method: "PATCH", body: JSON.stringify({ completed: "yes" }) }),
      { params: Promise.resolve({ id: "task-1" }) },
    );

    expect(response.status).toBe(400);
  });
});