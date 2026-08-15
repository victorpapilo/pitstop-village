import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function LocationSection() {
  return (
    <section id="location" className="bg-ink px-6 py-28 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-gold">Find Us</p>
          <h2 className="font-display text-5xl text-cream sm:text-6xl">On the way to <span className="italic text-gold">everywhere.</span></h2>

          <div className="mt-10 space-y-6">
            <InfoRow icon={<MapPin className="h-5 w-5" />} label="Address" value={siteConfig.address} href={siteConfig.mapsUrl} />
            <InfoRow icon={<Phone className="h-5 w-5" />} label="Phone" value={siteConfig.phoneDisplay} href={`tel:${siteConfig.phoneDisplay.replace(/\s/g, '')}`} />
            <InfoRow icon={<Clock className="h-5 w-5" />} label="Hours" value={siteConfig.hours} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-2xl border border-ink-soft"
        >
          <iframe
            title="Pitstop Village location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapEmbedQuery)}&output=embed`}
            className="h-full min-h-[380px] w-full grayscale invert-[92%] contrast-[90%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
        {icon}
      </span>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-sand/45">{label}</p>
        <p className="mt-1 font-body text-base text-sand/90">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-75">
      {content}
    </a>
  ) : content;
}
