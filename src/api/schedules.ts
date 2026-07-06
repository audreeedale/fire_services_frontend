import { API_BASE, handleResponse } from "./client";
import type { Schedule, ScheduleInput } from "../types";

export function listSchedules(): Promise<Schedule[]> {
  return fetch(`${API_BASE}/schedules`).then((res) => handleResponse<Schedule[]>(res));
}

export function createSchedule(input: ScheduleInput): Promise<Schedule> {
  return fetch(`${API_BASE}/schedules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ schedule: input }),
  }).then((res) => handleResponse<Schedule>(res));
}

export function updateSchedule(id: number, input: ScheduleInput): Promise<Schedule> {
  return fetch(`${API_BASE}/schedules/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ schedule: input }),
  }).then((res) => handleResponse<Schedule>(res));
}

export function deleteSchedule(id: number): Promise<void> {
  return fetch(`${API_BASE}/schedules/${id}`, { method: "DELETE" }).then((res) =>
    handleResponse<void>(res)
  );
}
