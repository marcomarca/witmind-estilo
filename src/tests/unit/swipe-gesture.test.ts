import { describe, expect, it } from "vitest";
import { resolveSwipeAxis, resolveSwipeDirection } from "../../swipe-gesture.js";

describe("workspace swipe gesture", () => {
  it("maps a finger movement to the left to the next panel", () => {
    expect(resolveSwipeAxis(-90, 8)).toBe("horizontal");
    expect(resolveSwipeDirection({ axis: "horizontal", cancelled: false, dx: -90, elapsedMs: 220 })).toBe(1);
  });

  it("maps a finger movement to the right to the previous panel", () => {
    expect(resolveSwipeAxis(90, 8)).toBe("horizontal");
    expect(resolveSwipeDirection({ axis: "horizontal", cancelled: false, dx: 90, elapsedMs: 220 })).toBe(-1);
  });

  it("never navigates from a cancelled pointer with zeroed coordinates", () => {
    expect(resolveSwipeDirection({ axis: "horizontal", cancelled: true, dx: -420, elapsedMs: 180 })).toBe(0);
  });

  it("keeps vertical scrolling and small horizontal movements out of navigation", () => {
    expect(resolveSwipeAxis(14, 80)).toBe("vertical");
    expect(resolveSwipeDirection({ axis: "vertical", cancelled: false, dx: 80, elapsedMs: 100 })).toBe(0);
    expect(resolveSwipeDirection({ axis: "horizontal", cancelled: false, dx: 18, elapsedMs: 20 })).toBe(0);
  });

  it("accepts a deliberate short fling in both directions", () => {
    expect(resolveSwipeDirection({ axis: "horizontal", cancelled: false, dx: -30, elapsedMs: 40 })).toBe(1);
    expect(resolveSwipeDirection({ axis: "horizontal", cancelled: false, dx: 30, elapsedMs: 40 })).toBe(-1);
  });
});
