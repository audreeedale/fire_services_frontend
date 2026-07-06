import { API_BASE, handleResponse } from "./client";
import type { Building, BuildingInput } from "../types";

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
