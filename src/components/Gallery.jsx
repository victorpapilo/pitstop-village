import { motion } from 'framer-motion';

const images = [
  { src: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80', alt: 'Poolside terrace seating' },
  { src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=900&q=80', alt: 'Plated dish' },
  { src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80', alt: 'Cocktail on the bar' },
  { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80', alt: 'Restaurant interior at dusk' },
  { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80', alt: 'Fresh grilled seafood plate' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80', alt: 'Evening ambience by the water' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-ink px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-gold">Gallery</p>
          <h2 className="font-display text-5xl text-cream sm:text-6xl">
            A feel for <span className="italic text-gold">the place.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className={`overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 row-span-2 md:col-span-2' : ''}`}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full min-h-[160px] w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
