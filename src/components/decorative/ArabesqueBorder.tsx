import { motion } from "motion/react";

export function ArabesqueBorder({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative p-8 md:p-12 ${className}`}>
      {/* Corner ornaments */}
      <Corner className="top-0 right-0" />
      <Corner className="top-0 left-0 -scale-x-100" />
      <Corner className="bottom-0 right-0 -scale-y-100" />
      <Corner className="bottom-0 left-0 -scale-x-100 -scale-y-100" />

      {/* Border lines */}
      <motion.div
        className="absolute inset-4 border border-gold-base/20 rounded-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.div
        className="absolute inset-6 border border-gold-base/10 rounded-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.7 }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 60 60"
      className={`absolute w-12 h-12 md:w-16 md:h-16 text-gold-base ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
    >
      <motion.path
        d="M5 5 C5 5 5 30 5 30 C5 30 10 25 15 22 C20 19 25 18 30 15 C35 12 30 5 30 5 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.path
        d="M8 8 C8 8 8 22 12 18 C16 14 22 12 22 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity={0.6}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.8 }}
      />
      <circle cx="5" cy="5" r="2" fill="currentColor" opacity={0.4} />
    </motion.svg>
  );
}
