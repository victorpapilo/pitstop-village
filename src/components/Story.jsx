import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';

// Paraphrased in our own words from real guest feedback — never quoted directly.
const notes = [
  { text: "Guests consistently praise the plating and depth of flavour, calling the kitchen's work a genuine highlight of their visit.", who: 'Google review' },
  { text: 'The poolside seating is a favourite for relaxed breakfasts, meetings, and catch-ups with friends.', who: 'Google review' },
  { text: 'Regulars single out the attentive, warm front-of-house team as a reason they keep returning.', who: 'Google review' },
];

export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden bg-ink-light px-6 py-28 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-gold">Our Story</p>
          <h2 className="font-display text-4xl leading-tight text-cream sm:text-5xl">
            Named for the journey, <span className="italic text-gold">built for staying a while.</span>
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-sand/75">
            Pitstop Village sits quietly on Alexander Avenue in Ikoyi — a poolside terrace, an
            all-day kitchen, and a bar that doesn't rush you. What started as a stop between
            errands on the island became a destination in its own right: breakfasts that run
            long, lunches that turn into evenings, and a rotating menu shaped by the people who
            keep walking back through the gate.
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-sand/75">
            {siteConfig.hours}. Every table, whether it's for two or twelve, gets the same
            attention.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink-soft pt-8">
            {[
              { n: siteConfig.rating.toFixed(1), l: 'Average rating' },
              { n: `${siteConfig.ratingCount}+`, l: 'Guest reviews' },
              { n: '19hr', l: 'Open daily' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-3xl text-gold">{s.n}</p>
                <p className="mt-1 font-body text-xs uppercase tracking-wide text-sand/55">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-5">
          {notes.map((n, i) => (
            <motion.blockquote
              key={n.who + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="rounded-2xl border border-ink-soft bg-ink/50 p-7"
            >
              <p className="font-display text-lg italic leading-snug text-sand">"{n.text}"</p>
              <cite className="mt-4 block font-mono text-xs not-italic uppercase tracking-widest text-gold/80">
                {n.who}
              </cite>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
