import { motion } from 'framer-motion';

const dishes = [
  { img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80', label: 'Tiger Prawns' },
  { img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80', label: 'Ribeye Steak' },
  { img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=300&q=80', label: 'Signature Cocktail' },
  { img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=300&q=80', label: 'Deconstructed Tiramisu' },
  { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80', label: 'Smoked Catfish' },
  { img: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=300&q=80', label: 'Poolside Breakfast' },
];

export default function RollingDishes() {
  const loop = [...dishes, ...dishes]; // duplicated for a seamless infinite loop

  return (
    <section className="relative overflow-hidden border-y border-ink-soft bg-ink-light py-14">
      <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.35em] text-gold/70">
        A taste of the road ahead
      </p>

      <motion.div
        className="flex w-max gap-14"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((d, i) => (
          <div key={i} className="flex w-32 shrink-0 flex-col items-center gap-3">
            <motion.div
              className="h-28 w-28 overflow-hidden rounded-full border-2 border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.1, borderColor: 'var(--color-gold)' }}
            >
              <img src={d.img} alt={d.label} className="h-full w-full object-cover" draggable={false} />
            </motion.div>
            <p className="text-center font-mono text-[10px] uppercase tracking-wider text-sand/55">
              {d.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* fade edges so the loop feels endless, not cut off */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-light to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-light to-transparent" />
    </section>
  );
}
