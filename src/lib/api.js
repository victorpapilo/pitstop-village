const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

if (!import.meta.env.VITE_API_URL) {
  console.warn(
    '[Pitstop Village] VITE_API_URL is not set. Falling back to http://localhost:4000 — set it in your .env once the backend is deployed.'
  );
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('pv_admin_token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }
  return data;
}

export const api = {
  // Public
  createBooking: (payload) => request('/api/bookings', { method: 'POST', body: payload }),
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: { email, password } }),

  // Staff-only (JWT required)
  listBookings: () => request('/api/bookings', { auth: true }),
  updateBookingStatus: (id, status) =>
    request(`/api/bookings/${id}`, { method: 'PATCH', body: { status }, auth: true }),
};

export const auth = {
  saveToken: (token) => localStorage.setItem('pv_admin_token', token),
  getToken: () => localStorage.getItem('pv_admin_token'),
  clearToken: () => localStorage.removeItem('pv_admin_token'),
  isLoggedIn: () => Boolean(localStorage.getItem('pv_admin_token')),
};
