import { motion, AnimatePresence } from "motion/react";
import { CONTENT } from "../constants/content";
import { useCountdown } from "../hooks/useCountdown";

export function CountdownTimer() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown();

  if (isExpired) {
    return (
      <section className="py-20 md:py-28 px-6">
        <motion.p
          className="text-center font-display text-3xl md:text-4xl text-gold-base text-glow"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {CONTENT.countdownExpired}
        </motion.p>
      </section>
    );
  }

  const units = [
    { value: days, label: CONTENT.countdownDays },
    { value: hours, label: CONTENT.countdownHours },
    { value: minutes, label: CONTENT.countdownMinutes },
    { value: seconds, label: CONTENT.countdownSeconds },
  ];

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-lg mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {units.map((unit, i) => (
          <motion.div
            key={unit.label}
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              delay: i * 0.1,
            }}
          >
            {/* Octagonal frame */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full text-gold-base/30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" />
              </svg>
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full text-gold-base/10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              >
                <polygon points="35,12 65,12 88,35 88,65 65,88 35,88 12,65 12,35" />
              </svg>

              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  className="font-body text-2xl md:text-3xl font-bold text-cream-light"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {unit.value}
                </motion.span>
              </AnimatePresence>
            </div>

            <span className="mt-2 text-sm text-cream-muted font-light">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
