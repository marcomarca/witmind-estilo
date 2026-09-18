export type SwipeAxis = "pending" | "horizontal" | "vertical";
export type SwipeDirection = -1 | 0 | 1;

export const SWIPE_AXIS_LOCK_PX = 8;
export const SWIPE_DISTANCE_PX = 56;
export const SWIPE_FLING_DISTANCE_PX = 24;
export const SWIPE_VELOCITY_PX_MS = 0.45;
export const SWIPE_AXIS_BIAS = 1.15;

export function resolvePointerReleaseCoordinate(input: {
  pointerType: string;
  lastMove: number;
  release: number;
}): number {
  // Android/WebView can report clientX/clientY as zero on pointerup. Touch and
  // pen gestures therefore finish at the last real pointermove sample; mouse
  // releases keep their final coordinate for precise drag behaviour.
  if (input.pointerType === "mouse" && Number.isFinite(input.release)) return input.release;
  return input.lastMove;
}

export function resolveSwipeAxis(dx: number, dy: number): SwipeAxis {
  const horizontal = Math.abs(dx);
  const vertical = Math.abs(dy);
  if (horizontal < SWIPE_AXIS_LOCK_PX && vertical < SWIPE_AXIS_LOCK_PX) return "pending";
  if (horizontal > vertical * SWIPE_AXIS_BIAS) return "horizontal";
  if (vertical > horizontal * SWIPE_AXIS_BIAS) return "vertical";
  return "pending";
}

export function resolveSwipeDirection(input: {
  axis: SwipeAxis;
  cancelled: boolean;
  dx: number;
  elapsedMs: number;
}): SwipeDirection {
  if (input.cancelled || input.axis !== "horizontal" || !Number.isFinite(input.dx)) return 0;
  const distance = Math.abs(input.dx);
  const elapsed = Math.max(1, input.elapsedMs);
  const isDistanceSwipe = distance >= SWIPE_DISTANCE_PX;
  const isFling = distance >= SWIPE_FLING_DISTANCE_PX && distance / elapsed >= SWIPE_VELOCITY_PX_MS;
  if (!isDistanceSwipe && !isFling) return 0;
  return input.dx < 0 ? 1 : -1;
}
