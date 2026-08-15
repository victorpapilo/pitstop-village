import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  return (
    <footer className="border-t border-ink-soft bg-ink px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-display text-lg text-cream">
          Pitstop <span className="italic text-gold">Village</span>
        </p>
        <p className="font-body text-xs text-sand/45">
          © {new Date().getFullYear()} Pitstop Village, Ikoyi, Lagos. All rights reserved.
        </p>
        <a href="/admin" className="font-mono text-[10px] uppercase tracking-widest text-sand/25 hover:text-sand/50">
          Staff login
        </a>
      </div>
    </footer>
  );
}
