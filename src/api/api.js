// Centralised API service — all fetch calls live here so pages stay clean.
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch users`);
  return res.json();
}

export async function fetchUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: User not found`);
  return res.json();
}

// Simulates sending a contact form — resolves after a short delay.
export function submitContactForm(data) {
  return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1200));
}
