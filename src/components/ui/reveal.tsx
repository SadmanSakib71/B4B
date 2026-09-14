"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { motionDuration, motionEase } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: motionDuration.slow,
        delay,
        ease: motionEase,
      }}
    >
      {children}
    </motion.div>
  );
}
