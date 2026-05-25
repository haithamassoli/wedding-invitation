import { motion } from "motion/react";

export function GeometricPattern({
  className = "",
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={`${className}`}
      initial={animate ? { opacity: 0, rotate: -10 } : undefined}
      animate={animate ? { opacity: 1, rotate: 0 } : undefined}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* Eight-pointed star (two overlapping squares) */}
      <motion.rect
        x="50"
        y="50"
        width="100"
        height="100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
      <motion.rect
        x="50"
        y="50"
        width="100"
        height="100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        transform="rotate(45 100 100)"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
      />
      {/* Inner star */}
      <motion.rect
        x="70"
        y="70"
        width="60"
        height="60"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.rect
        x="70"
        y="70"
        width="60"
        height="60"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        transform="rotate(45 100 100)"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.9 }}
      />
      {/* Center circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
      />
      {/* Outer circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.3"
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
      />
    </motion.svg>
  );
}
