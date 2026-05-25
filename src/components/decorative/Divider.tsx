import { motion } from "motion/react";

export function Divider({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-3 ${className}`}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-base/50" />
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-gold-base"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-base/50" />
    </motion.div>
  );
}
