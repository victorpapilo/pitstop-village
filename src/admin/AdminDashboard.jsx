import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Check, X, Clock, RefreshCw } from 'lucide-react';
import { api, auth } from '../lib/api';

const STATUS_STYLES = {
  pending: 'bg-gold/15 text-gold border-gold/30',
  confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  cancelled: 'bg-rust/15 text-rust border-rust/30',
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const loadBookings = useCallback(async () => {
    try {
      const data = await api.listBookings();
      setBookings(data);
    } catch (err) {
      if (err.message.includes('Session expired')) {
        auth.clearToken();
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadBookings();
    // MongoDB has no built-in realtime like Supabase, so we poll instead —
    // new bookings show up here within 15 seconds.
    const interval = setInterval(loadBookings, 15000);
    return () => clearInterval(interval);
  }, [loadBookings]);

  const updateStatus = async (id, status) => {
    setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    try {
      await api.updateBookingStatus(id, status);
    } catch (err) {
      console.error(err);
      loadBookings(); // revert on failure
    }
  };

  const handleLogout = () => {
    auth.clearToken();
    navigate('/admin');
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);
  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-ink px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Admin</p>
            <h1 className="font-display text-3xl text-cream">Bookings</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadBookings} className="rounded-full border border-ink-soft p-2.5 text-sand/60 hover:text-gold">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 rounded-full border border-ink-soft px-4 py-2.5 font-body text-sm text-sand/70 hover:text-rust">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                filter === f ? 'border-gold bg-gold text-ink' : 'border-ink-soft text-sand/60 hover:text-sand'
              }`}
            >
              {f} · {counts[f]}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="py-16 text-center font-body text-sand/50">Loading bookings…</p>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center font-body text-sand/50">No bookings here yet.</p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-ink-soft">
            {filtered.map((b, i) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex flex-col gap-3 border-b border-ink-soft bg-ink-light p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-display text-lg text-cream">{b.guestName}</p>
                    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${STATUS_STYLES[b.status] || ''}`}>
                      {b.status}
                    </span>
                  </div>
                  <p className="mt-1 font-body text-sm text-sand/55">
                    {b.partySize} guests · {b.bookingDate} at {b.bookingTime} · {b.phone}
                  </p>
                  {b.notes && <p className="mt-1 font-body text-xs italic text-sand/40">"{b.notes}"</p>}
                  <p className="mt-1 font-mono text-[10px] text-sand/30">{b.code}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(b._id, 'confirmed')}
                    className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 px-3 py-2 font-mono text-xs text-emerald-400 hover:bg-emerald-500/10"
                  >
                    <Check className="h-3.5 w-3.5" /> Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(b._id, 'pending')}
                    className="flex items-center gap-1.5 rounded-full border border-gold/30 px-3 py-2 font-mono text-xs text-gold hover:bg-gold/10"
                  >
                    <Clock className="h-3.5 w-3.5" /> Pending
                  </button>
                  <button
                    onClick={() => updateStatus(b._id, 'cancelled')}
                    className="flex items-center gap-1.5 rounded-full border border-rust/30 px-3 py-2 font-mono text-xs text-rust hover:bg-rust/10"
                  >
                    <X className="h-3.5 w-3.5" /> Cancel
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
