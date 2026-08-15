import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const links = [
  { href: '#menu', label: 'Menu' },
  { href: '#story', label: 'Story' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reserve', label: 'Reserve' },
  { href: '#location', label: 'Location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-40 w-full transition-colors duration-500 ${
        scrolled ? 'bg-ink/90 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="font-display text-xl tracking-wide text-cream">
          Pitstop <span className="text-gold italic">Village</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-sm uppercase tracking-[0.14em] text-sand/80 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reserve"
          className="hidden rounded-full border border-gold/60 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink md:inline-block"
        >
          Reserve a table
        </a>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-sand md:hidden"
        >
          <Menu className="h-7 w-7" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-ink px-8 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl text-cream">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-sand">
                <X className="h-7 w-7" />
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-sand hover:text-gold"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={`tel:${siteConfig.phoneDisplay.replace(/\s/g, '')}`}
              className="mt-auto font-mono text-sm text-gold"
            >
              {siteConfig.phoneDisplay}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
