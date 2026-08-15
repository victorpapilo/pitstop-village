import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-end overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-20 h-[120%] w-full">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1920&q=80"
          alt="Poolside dining terrace at dusk"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/40" />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="relative z-10 w-full px-6 pb-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-gold-light"
          >
            Ikoyi, Lagos — {siteConfig.hours}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl font-display text-6xl leading-[0.98] text-cream sm:text-7xl lg:text-8xl"
          >
            A poolside
            <br />
            <span className="italic text-gold">pitstop,</span>
            <br />
            worth the trip.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            <p className="max-w-md font-body text-base text-sand/85">
              Breakfast by the water, cocktails after dark, and a menu built for people who
              linger. Lagos's favourite stopover on Banana Island.
            </p>
            <div className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-ink/40 px-4 py-2 backdrop-blur-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
              <span className="ml-1.5 font-mono text-xs text-sand/80">
                {siteConfig.rating} · {siteConfig.ratingCount} reviews
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="h-9 w-5 rounded-full border border-sand/40 p-1"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
