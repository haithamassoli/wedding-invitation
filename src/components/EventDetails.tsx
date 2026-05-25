import { motion } from "motion/react";
import { CONTENT } from "../constants/content";

const details = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <circle cx="12" cy="16" r="2" fill="currentColor" opacity={0.4} />
      </svg>
    ),
    label: CONTENT.dateLabel,
    value: CONTENT.dateValue,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity={0.4} />
      </svg>
    ),
    label: CONTENT.timeLabel,
    value: CONTENT.timeValue,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2C7 7 4 10 4 14a8 8 0 0016 0c0-4-3-7-8-12z" />
        <path d="M9 21h6" strokeWidth="1.5" />
        <path d="M12 2l1.5 3-1.5 1.5L10.5 5z" fill="currentColor" opacity={0.3} />
      </svg>
    ),
    label: CONTENT.locationLabel,
    value: CONTENT.locationValue,
    href: CONTENT.locationMapUrl,
  },
];

const cardClassName =
  "relative flex items-center gap-5 p-6 md:p-7 rounded-xl border border-gold-base/20 bg-emerald-base/25 backdrop-blur-sm card-glow overflow-hidden";

export function EventDetails() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-xl mx-auto flex flex-col gap-5">
        {details.map((detail, i) => {
          const content = (
            <>
              {/* Subtle gradient accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-base/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />

              <motion.div
                className="relative shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gold-base/10 text-gold-base"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: i * 0.15 + 0.3,
                }}
              >
                {detail.icon}
              </motion.div>
              <div className="relative">
                <p className="text-cream-muted text-xs mb-1 font-light tracking-wide">
                  {detail.label}
                </p>
                <p className="font-body text-lg md:text-xl text-cream-light font-medium">
                  {detail.value}
                </p>
              </div>
            </>
          );

          if ("href" in detail) {
            return (
              <motion.a
                key={detail.label}
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${detail.label}: ${detail.value}`}
                className={`${cardClassName} transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-base`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: i * 0.15,
                }}
              >
                {content}
              </motion.a>
            );
          }

          return (
            <motion.div
              key={detail.label}
              className={cardClassName}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: i * 0.15,
              }}
            >
              {content}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
