import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../data/siteConfig';

export default function WhatsAppButton() {
  const link = whatsappLink("Hi Pitstop Village! I'd like to ask about a table.");

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pitstop Village on WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-4 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:px-5"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <MessageCircle className="h-6 w-6 text-white" strokeWidth={2.2} fill="white" fillOpacity={0.15} />
      <span className="hidden font-body text-sm font-semibold text-white sm:inline">
        Book on WhatsApp
      </span>
    </motion.a>
  );
}
