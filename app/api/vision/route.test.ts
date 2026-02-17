import { expect, test, describe } from "bun:test";
import { POST } from "./route";

describe("Vision API Route", () => {
  test("should return 400 if description is missing", async () => {
    const req = new Request("http://localhost/api/vision", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Invalid vision request");
  });

  test("should return 400 if description is not a string", async () => {
    const req = new Request("http://localhost/api/vision", {
      method: "POST",
      body: JSON.stringify({ description: 123 }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Invalid vision request");
  });

  test("should return 200 for valid description", async () => {
    const req = new Request("http://localhost/api/vision", {
      method: "POST",
      body: JSON.stringify({ description: "a party in the forest" }),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.prompt).toBeDefined();
  });
});
