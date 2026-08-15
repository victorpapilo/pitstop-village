import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = {
  Breakfast: [
    { name: 'Poolside Continental', price: '₦12,500', desc: 'Eggs your way, grilled tomato, sourdough, whipped butter.' },
    { name: 'Akara & Pap Stack', price: '₦8,000', desc: 'Bean fritters, spiced pepper sauce, warm corn pap.' },
    { name: 'Shakshuka Terrace', price: '₦11,000', desc: 'Baked eggs, smoked pepper stew, feta, flatbread.' },
  ],
  Mains: [
    { name: 'Grilled Tiger Prawns', price: '₦21,000', desc: 'Chargrilled prawns, chilli-lime butter, jollof risotto.' },
    { name: 'Pepper-Crusted Ribeye', price: '₦28,500', desc: '300g ribeye, plantain mash, red wine jus.' },
    { name: 'Village Smoked Catfish', price: '₦17,000', desc: 'Slow-smoked catfish, ata din-din, herbed rice.' },
  ],
  'Cocktails & Mocktails': [
    { name: 'Banana Island Sour', price: '₦9,500', desc: 'Whiskey, lime, egg white, bitters.' },
    { name: 'Zobo Spritz', price: '₦7,000', desc: 'Hibiscus, ginger, soda, orange peel — alcohol-free.' },
    { name: 'Pitstop Old Fashioned', price: '₦10,500', desc: 'Bourbon, bitters, orange oil, smoked ice.' },
  ],
  Desserts: [
    { name: 'Deconstructed Tiramisu', price: '₦8,500', desc: 'Espresso-soaked sponge, mascarpone cloud, cocoa dust.' },
    { name: 'Chin Chin Sundae', price: '₦7,000', desc: 'Vanilla ice cream, crushed chin chin, caramel.' },
  ],
};

export default function Menu() {
  const tabs = Object.keys(categories);
  const [active, setActive] = useState(tabs[0]);

  return (
    <section id="menu" className="relative bg-ink px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-gold">The Menu</p>
            <h2 className="font-display text-5xl text-cream sm:text-6xl">
              Made to be <span className="italic text-gold">lingered over.</span>
            </h2>
          </div>
        </motion.div>

        <div className="mb-10 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative rounded-full px-5 py-2.5 font-body text-sm transition-colors ${
                active === tab ? 'text-ink' : 'text-sand/70 hover:text-sand'
              }`}
            >
              {active === tab && (
                <motion.span
                  layoutId="menu-tab-bg"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid gap-x-10 gap-y-8 sm:grid-cols-2"
          >
            {categories[active].map((item) => (
              <div key={item.name} className="group border-b border-ink-soft pb-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl text-cream transition-colors group-hover:text-gold">
                    {item.name}
                  </h3>
                  <span className="shrink-0 font-mono text-sm text-gold">{item.price}</span>
                </div>
                <p className="mt-2 font-body text-sm text-sand/65">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
