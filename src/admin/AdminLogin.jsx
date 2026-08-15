import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { api, auth } from '../lib/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await api.login(email, password);
      auth.saveToken(token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-2xl border border-ink-soft bg-ink-light p-8"
      >
        <p className="mb-1 font-mono text-xs uppercase tracking-[0.3em] text-gold">Staff Access</p>
        <h1 className="mb-6 font-display text-3xl text-cream">Pitstop Village</h1>

        <label className="mb-4 block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-sand/45">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-ink-soft bg-ink px-4 py-2.5 text-sand outline-none focus:border-gold"
          />
        </label>
        <label className="mb-6 block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-sand/45">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-ink-soft bg-ink px-4 py-2.5 text-sand outline-none focus:border-gold"
          />
        </label>

        {error && <p className="mb-4 font-body text-sm text-rust">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 font-body text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign in'}
        </button>
      </motion.form>
    </div>
  );
}
