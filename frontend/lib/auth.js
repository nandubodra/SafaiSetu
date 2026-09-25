export function getAuthToken() {
  return typeof window === 'undefined' ? null : localStorage.getItem('safaisetu-token');
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  try { return JSON.parse(localStorage.getItem('safaisetu-user') || 'null'); } catch { return null; }
}

export function logout() {
  localStorage.removeItem('safaisetu-token');
  localStorage.removeItem('safaisetu-user');
  window.location.href = '/login';
}
