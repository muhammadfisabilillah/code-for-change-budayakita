"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps the app in Framer Motion's `MotionConfig` with
 * `reducedMotion="user"`, which automatically disables transform/layout
 * animations for visitors who request reduced motion at the OS level.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}