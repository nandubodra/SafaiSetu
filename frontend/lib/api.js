const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

function headers(json = true) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('safaisetu-token') : null;
  return {
    ...(json ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { ...headers(!options.body || typeof options.body === 'string'), ...(options.headers || {}) } });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || `Request failed (${response.status})`);
  return data;
}

export const sendOtp = (email, role) => request('/auth/send-otp', { method: 'POST', body: JSON.stringify({ email, role }) });
export const verifyOtp = (email, otp, role, name) => request('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, otp, role, name }) });
export const getComplaints = () => request('/complaints');
export const getComplaint = (id) => request(`/complaints/${id}`);
export const createComplaint = (payload) => request('/complaints', { method: 'POST', body: JSON.stringify(payload) });
export const updateComplaintStatus = (id, status) => request(`/complaints/${id}/status?status=${encodeURIComponent(status)}`, { method: 'PUT' });
export const updateResolution = (id, resolutionNote, afterImageUrl) => request(`/complaints/${id}/resolution?resolutionNote=${encodeURIComponent(resolutionNote)}&afterImageUrl=${encodeURIComponent(afterImageUrl)}`, { method: 'PUT' });
export const submitVerificationVote = (payload) => request('/complaints/verify', { method: 'POST', body: JSON.stringify(payload) });
export const getNotifications = (userId) => request(`/notifications/${userId}`);
export const markNotificationRead = (id) => request(`/notifications/${id}/read`, { method: 'PUT' });
export const getHotspots = () => request('/hotspots');
export const getAnalytics = () => request('/analytics/summary');
export const getSlaMetrics = () => request('/sla');
