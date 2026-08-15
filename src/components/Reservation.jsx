import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MessageCircle, Loader2 } from 'lucide-react';
import { api } from '../lib/api';
import { whatsappLink } from '../data/siteConfig';

const emptyForm = { name: '', phone: '', partySize: 2, date: '', time: '', notes: '' };

export default function Reservation() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const booking = await api.createBooking({
        guestName: form.name,
        phone: form.phone,
        partySize: Number(form.partySize),
        bookingDate: form.date,
        bookingTime: form.time,
        notes: form.notes,
      });
      setCode(booking.code);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  const waMessage = `Hi Pitstop Village! I'd like to book a table.\nName: ${form.name}\nParty size: ${form.partySize}\nDate: ${form.date}\nTime: ${form.time}${form.notes ? `\nNotes: ${form.notes}` : ''}`;

  return (
    <section id="reserve" className="relative bg-ink-light px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-gold">Reserve</p>
          <h2 className="font-display text-5xl text-cream sm:text-6xl">
            Get your <span className="italic text-gold">boarding pass.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-sand/65">
            No deposit required. We'll confirm by phone or WhatsApp within the hour.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex max-w-2xl flex-col overflow-visible rounded-2xl bg-cream text-ink shadow-[0_30px_60px_rgba(0,0,0,0.45)] sm:flex-row"
        >
          {/* Stub */}
          <div className="relative flex shrink-0 flex-row items-center justify-between gap-4 border-b border-dashed border-ink/20 bg-gold/15 p-6 sm:w-40 sm:flex-col sm:justify-center sm:border-b-0 sm:border-r sm:p-5 ticket-notch">
            <p className="font-display text-2xl leading-none text-ink sm:[writing-mode:vertical-rl] sm:rotate-180">
              Pitstop
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink/60">
              Village · Ikoyi
            </p>
          </div>

          {/* Main */}
          <div className="flex-1 p-7 sm:p-9">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: -8 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-rust text-rust"
                >
                  <Check className="h-9 w-9" strokeWidth={3} />
                </motion.div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/50">Request sent</p>
                <p className="mt-2 font-display text-3xl">{code}</p>
                <p className="mt-3 max-w-xs font-body text-sm text-ink/60">
                  We've received your request for {form.partySize} on {form.date} at {form.time}.
                  For instant confirmation, tap below.
                </p>
                <a
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-body text-sm font-semibold text-white transition-transform hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
                </a>
                <button
                  onClick={() => { setForm(emptyForm); setStatus('idle'); }}
                  className="mt-4 font-mono text-xs uppercase tracking-widest text-ink/40 hover:text-ink"
                >
                  Book another table
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Guest name">
                    <input required value={form.name} onChange={update('name')} placeholder="Ada Okafor"
                      className="ticket-input" />
                  </Field>
                  <Field label="Phone">
                    <input required value={form.phone} onChange={update('phone')} placeholder="080..."
                      className="ticket-input" />
                  </Field>
                  <Field label="Party size">
                    <input required type="number" min={1} max={20} value={form.partySize} onChange={update('partySize')}
                      className="ticket-input" />
                  </Field>
                  <Field label="Date">
                    <input required type="date" value={form.date} onChange={update('date')}
                      className="ticket-input" />
                  </Field>
                  <Field label="Time" full>
                    <input required type="time" value={form.time} onChange={update('time')}
                      className="ticket-input" />
                  </Field>
                </div>
                <Field label="Notes (optional)">
                  <input value={form.notes} onChange={update('notes')} placeholder="Birthday, allergies, window seat..."
                    className="ticket-input" />
                </Field>

                {status === 'error' && (
                  <p className="font-body text-sm text-rust">
                    {errorMsg || 'Something went wrong.'} You can also book directly on WhatsApp below.
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-body text-sm font-semibold text-cream transition-transform hover:scale-105 disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>Confirm request <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>
                  <a
                    href={whatsappLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 font-body text-sm text-ink/70 hover:border-ink/50"
                  >
                    <MessageCircle className="h-4 w-4" /> Or book via WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, children, full }) {
  return (
    <label className={`block ${full ? 'col-span-2' : ''}`}>
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-ink/45">
        {label}
      </span>
      {children}
    </label>
  );
}
