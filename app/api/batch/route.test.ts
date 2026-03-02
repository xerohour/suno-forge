import { POST } from "./route";

describe("Batch API", () => {
  test("should clamp excessive count to 50", async () => {
    const req = new Request("http://localhost/api/batch", {
      method: "POST",
      body: JSON.stringify({
        config: { genre: "pop" },
        count: 1000, // Excessive count
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.prompts).toHaveLength(50);
  });

  test("should handle valid count", async () => {
    const req = new Request("http://localhost/api/batch", {
      method: "POST",
      body: JSON.stringify({
        config: { genre: "pop" },
        count: 5,
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.prompts).toHaveLength(5);
  });

  test("should clamp negative/zero count to 1", async () => {
      const req = new Request("http://localhost/api/batch", {
        method: "POST",
        body: JSON.stringify({
          config: { genre: "pop" },
          count: -5,
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.prompts).toHaveLength(1);
  });
});
