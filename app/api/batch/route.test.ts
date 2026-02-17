import { POST } from "./route";

describe("Batch API", () => {
  test("should clamp excessive count to prevent DoS", async () => {
    const req = new Request("http://localhost/api/batch", {
      method: "POST",
      body: JSON.stringify({
        config: { genre: "pop" },
        count: 1000, // Excessive count
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.prompts.length).toBeLessThanOrEqual(50);
    expect(data.prompts.length).toBeGreaterThan(0);
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

    expect(data.prompts).toHaveLength(5);
  });

  test("should handle negative/zero count by defaulting to 1", async () => {
      const req = new Request("http://localhost/api/batch", {
        method: "POST",
        body: JSON.stringify({
          config: { genre: "pop" },
          count: -5,
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(data.prompts.length).toBe(1);
  });
});
