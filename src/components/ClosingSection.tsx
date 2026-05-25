import { motion } from "motion/react";
import { CONTENT } from "../constants/content";

export function ClosingSection() {
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="max-w-xl mx-auto text-center">
        <motion.p
          className="font-heading text-xl md:text-2xl lg:text-3xl text-cream-light leading-loose"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {CONTENT.closingPrayer}
        </motion.p>

        <motion.div
          className="mx-auto mt-8 mb-8 h-px w-24 bg-gradient-to-r from-transparent via-gold-base/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.p
          className="font-body text-base md:text-lg text-cream-muted font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {CONTENT.closingWish}
        </motion.p>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p className="text-cream-muted/40 text-xs">صُمّمت بحُب</p>
      </motion.footer>
    </section>
  );
}
