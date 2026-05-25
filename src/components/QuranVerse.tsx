import { motion } from "motion/react";
import { CONTENT } from "../constants/content";
import { ArabesqueBorder } from "./decorative/ArabesqueBorder";

export function QuranVerse() {
  return (
    <section className="relative py-20 md:py-28 px-6">
      {/* Subtle background variation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(20,61,51,0.4) 30%, rgba(20,61,51,0.4) 70%, transparent 100%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto">
        <ArabesqueBorder>
          <motion.blockquote
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Decorative Quran symbol */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <svg
                viewBox="0 0 40 40"
                className="w-8 h-8 mx-auto text-gold-base/50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <polygon points="20,2 24,14 37,14 27,22 30,35 20,27 10,35 13,22 3,14 16,14" />
              </svg>
            </motion.div>

            <p className="font-heading text-xl md:text-2xl lg:text-3xl text-cream-light leading-[2]">
              {CONTENT.quranVerse}
            </p>

            <motion.div
              className="mx-auto mt-6 mb-4 h-px w-24 bg-gradient-to-r from-transparent via-gold-base/40 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.footer
              className="text-gold-base/60 font-body text-sm md:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {CONTENT.quranReference}
            </motion.footer>
          </motion.blockquote>
        </ArabesqueBorder>
      </div>
    </section>
  );
}
