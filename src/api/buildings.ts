import type { Building, BuildingInput } from "../types";

const API_BASE = "http://localhost:3000/api/v1";

async function handleResponse<T>(response: Response): Promise<T> {
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

export function listBuildings(): Promise<Building[]> {
  return fetch(`${API_BASE}/buildings`).then((res) => handleResponse<Building[]>(res));
}

export function createBuilding(input: BuildingInput): Promise<Building> {
  return fetch(`${API_BASE}/buildings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ building: input }),
  }).then((res) => handleResponse<Building>(res));
}

export function updateBuilding(id: number, input: BuildingInput): Promise<Building> {
  return fetch(`${API_BASE}/buildings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ building: input }),
  }).then((res) => handleResponse<Building>(res));
}

export function deleteBuilding(id: number): Promise<void> {
  return fetch(`${API_BASE}/buildings/${id}`, { method: "DELETE" }).then((res) =>
    handleResponse<void>(res)
  );
}
