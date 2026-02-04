export const API_BASE = 'http://localhost:5000/api';

export const getJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Request failed');
  }
  return response.json() as Promise<T>;
};

export const postJson = async <T>(path: string, body: unknown): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Request failed');
  }

  return response.json() as Promise<T>;
};

export const deleteJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, { method: 'DELETE' });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Request failed');
  }
  return response.json() as Promise<T>;
};