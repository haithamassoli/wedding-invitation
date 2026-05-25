import { motion } from "motion/react";
import { CONTENT } from "../constants/content";
import { GeometricPattern } from "./decorative/GeometricPattern";
import { GoldParticles } from "./decorative/GoldParticles";

export function NamesSection() {
  return (
    <section className="relative py-28 md:py-36 px-6 overflow-hidden">
      {/* Radial glow behind names */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Background rotating pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
        <GeometricPattern
          className="w-[600px] h-[600px] text-gold-base spin-slow"
          animate={false}
        />
      </div>

      <GoldParticles count={10} />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Mihrab arch */}
        <motion.svg
          viewBox="0 0 300 200"
          className="w-72 md:w-96 mx-auto mb-6 text-gold-base"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          <motion.path
            d="M20 200 L20 90 C20 90 20 15 150 15 C280 15 280 90 280 90 L280 200"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M40 200 L40 100 C40 100 40 35 150 35 C260 35 260 100 260 100 L260 200"
            strokeWidth="0.5"
            opacity={0.4}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
          />
          {/* Decorative arches inside */}
          <motion.path
            d="M80 200 L80 120 C80 120 80 70 150 70 C220 70 220 120 220 120 L220 200"
            strokeWidth="0.3"
            opacity={0.25}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Keystone ornament */}
          <motion.path
            d="M145 18 L150 10 L155 18"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.8 }}
          />
          <motion.circle
            cx="150"
            cy="8"
            r="3"
            fill="currentColor"
            opacity={0.4}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.5 }}
          />
        </motion.svg>

        {/* Groom name */}
        <motion.h2
          className="font-display text-6xl md:text-8xl lg:text-9xl text-shimmer leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {CONTENT.groomName}
        </motion.h2>

        {/* And - decorative medallion */}
        <motion.div
          className="relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 my-3"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <svg
            viewBox="0 0 60 60"
            className="absolute inset-0 w-full h-full text-gold-base/30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="30" cy="30" r="28" />
            <circle cx="30" cy="30" r="22" strokeWidth="0.5" opacity={0.5} />
          </svg>
          <span className="font-display text-2xl md:text-3xl text-gold-base">
            {CONTENT.andWord}
          </span>
        </motion.div>

        {/* Bride reference */}
        <motion.h2
          className="font-display text-5xl md:text-7xl lg:text-8xl text-shimmer leading-tight mt-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          {CONTENT.brideName}
        </motion.h2>
      </div>
    </section>
  );
}
