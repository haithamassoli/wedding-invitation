import { motion } from "motion/react";
import { CONTENT } from "../constants/content";

export function Instructions() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-md mx-auto">
        <motion.h3
          className="text-center font-display text-xl md:text-2xl text-gold-base/70 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          {CONTENT.instructionsTitle}
        </motion.h3>

        <div className="flex flex-col gap-4">
          <motion.div
            className="flex items-center gap-4 px-5 py-4 rounded-full border border-gold-base/15 bg-emerald-dark/50"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 shrink-0 text-gold-base/60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 3c-1.5 0-3 1-3 3v3c0 1 .5 2 1.5 3l-1 2h5l-1-2c1-1 1.5-2 1.5-3V6c0-2-1.5-3-3-3z" />
              <path d="M8 21h8M9 18h6" />
              <circle cx="12" cy="3" r="1" fill="currentColor" opacity={0.4} />
            </svg>
            <span className="text-cream/80 text-sm md:text-base">
              {CONTENT.noMusic}
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 px-5 py-4 rounded-full border border-gold-base/15 bg-emerald-dark/50"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 shrink-0 text-gold-base/60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="6" width="20" height="14" rx="2" />
              <circle cx="12" cy="13" r="4" />
              <circle cx="12" cy="13" r="1.5" fill="currentColor" opacity={0.3} />
              <path d="M3 3l18 18" strokeWidth="2" className="text-red-400" stroke="currentColor" />
            </svg>
            <span className="text-cream/80 text-sm md:text-base">
              {CONTENT.noPhotography}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
