export const API_BASE = "http://localhost:3000/api/v1";

export async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message = body?.errors?.join(", ") ?? body?.error ?? response.statusText;
    throw new Error(message);
  }

  return body as T;
}
