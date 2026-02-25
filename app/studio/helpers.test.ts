import { describe, test, expect } from "bun:test";
import { getComplexityLabel } from "./helpers";

describe("getComplexityLabel", () => {
  test("should return 'High' for values > 75", () => {
    expect(getComplexityLabel(76)).toBe("High");
    expect(getComplexityLabel(100)).toBe("High");
  });

  test("should return 'Medium' for values between 41 and 75", () => {
    expect(getComplexityLabel(75)).toBe("Medium");
    expect(getComplexityLabel(41)).toBe("Medium");
    expect(getComplexityLabel(60)).toBe("Medium");
  });

  test("should return 'Low' for values <= 40", () => {
    expect(getComplexityLabel(40)).toBe("Low");
    expect(getComplexityLabel(0)).toBe("Low");
    expect(getComplexityLabel(20)).toBe("Low");
  });
});
