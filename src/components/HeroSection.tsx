import { motion } from "motion/react";
import { CONTENT } from "../constants/content";
import { useGuestName } from "../hooks/useGuestName";
import { GeometricPattern } from "./decorative/GeometricPattern";
import { GoldParticles } from "./decorative/GoldParticles";

export function HeroSection() {
  const guestName = useGuestName();

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,168,76,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Background geometric pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <GeometricPattern
          className="w-[700px] h-[700px] text-gold-base spin-slow"
          animate={false}
        />
      </div>

      <GoldParticles count={20} />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Top ornament */}
        <motion.svg
          viewBox="0 0 120 30"
          className="w-32 md:w-40 mx-auto mb-8 text-gold-base/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <path d="M10 15 Q30 5 60 15 Q90 25 110 15" />
          <path d="M10 15 Q30 25 60 15 Q90 5 110 15" />
          <circle cx="60" cy="15" r="3" fill="currentColor" opacity={0.3} />
        </motion.svg>

        {/* Bismillah */}
        <motion.h1
          className="font-display text-4xl md:text-5xl lg:text-6xl text-shimmer leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {CONTENT.bismillah}
        </motion.h1>

        {/* Divider line */}
        <motion.div
          className="mx-auto mt-8 mb-6 h-px w-40 bg-gradient-to-r from-transparent via-gold-base/60 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        />

        {/* Wedding invitation subtitle */}
        <motion.p
          className="font-display text-2xl md:text-3xl text-gold-base/80 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
        >
          {CONTENT.weddingInvitation}
        </motion.p>

        {/* Guest greeting */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: "easeOut" }}
        >
          <p className="font-body text-xl md:text-2xl text-cream font-light">
            {guestName
              ? CONTENT.greetingPersonal(guestName)
              : CONTENT.greetingGeneral}
          </p>
          {guestName && (
            <motion.div
              className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-gold-base/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            />
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-cream-muted text-sm font-light">
          {CONTENT.scrollHint}
        </span>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gold-base/60"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M7 10l5 5 5-5" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
