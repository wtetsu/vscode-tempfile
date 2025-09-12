// Using globals from vitest.config.ts
import * as utils from "../src/date";

describe("date utilities", () => {
  it("should generate date parameters correctly", () => {
    // Use local time to avoid timezone issues
    const time = new Date(2024, 0, 15, 10, 30, 45, 123); // Jan 15, 2024 10:30:45.123 local
    const params = utils.makeDateParameters(time);

    // Check types
    expect(typeof params.YYYY).toBe("string");
    expect(typeof params.MM).toBe("string");
    expect(typeof params.DD).toBe("string");
    expect(typeof params.HH).toBe("string");
    expect(typeof params.mm).toBe("string");
    expect(typeof params.ss).toBe("string");
    expect(typeof params.SSS).toBe("string");
    
    // Check actual values
    expect(params.YYYY).toBe("2024");
    expect(params.MM).toBe("01");
    expect(params.DD).toBe("15");
    expect(params.HH).toBe("10");
    expect(params.mm).toBe("30");
    expect(params.ss).toBe("45");
    expect(params.SSS).toBe("123");
  });

  it("should format single digit values with leading zeros", () => {
    // Use local time constructor
    const time = new Date(2024, 0, 1, 1, 1, 1, 1); // Jan 1, 2024 01:01:01.001 local
    const dateParams = utils.makeDateParams(time);
    
    expect(dateParams.YYYY).toBe("2024");
    expect(dateParams.MM).toBe("01");
    expect(dateParams.DD).toBe("01");
    expect(dateParams.HH).toBe("01");
    expect(dateParams.mm).toBe("01");
    expect(dateParams.ss).toBe("01");
    expect(dateParams.SSS).toBe("001");
  });

  it("should include tmpdir parameter", () => {
    const time = new Date(2024, 0, 1, 12, 0, 0, 0);
    const params = utils.makeDateParameters(time);
    
    // Should have tmpdir parameter
    expect(typeof params.tmpdir).toBe("string");
  });
});