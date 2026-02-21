import { POST } from "./route";

describe("Batch API", () => {
  test("should reject excessive count to prevent DoS", async () => {
    const req = new Request("http://localhost/api/batch", {
      method: "POST",
      body: JSON.stringify({
        config: { genre: "pop" },
        count: 1000, // Excessive count
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Invalid batch request");
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

  test("should reject negative/zero count", async () => {
      const req = new Request("http://localhost/api/batch", {
        method: "POST",
        body: JSON.stringify({
          config: { genre: "pop" },
          count: -5,
        }),
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data.error).toBe("Invalid batch request");
  });
});
