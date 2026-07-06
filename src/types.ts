export interface Building {
  id: number;
  name: string | null;
  street_address: string;
  suburb: string;
  state: string;
  postcode: string;
  created_at: string;
  updated_at: string;
}

export type BuildingInput = Omit<Building, "id" | "created_at" | "updated_at">;

export type Frequency = "monthly" | "six_monthly" | "annual";

export type ScheduleStatus = "overdue" | "due_soon" | "upcoming";

export interface Schedule {
  id: number;
  building_id: number;
  frequency: Frequency;
  last_inspected_on: string | null;
  next_due_on: string;
  status: ScheduleStatus;
  building: Building;
}

export interface ScheduleInput {
  building_id: number;
  frequency: Frequency;
  last_inspected_on: string | null;
  next_due_on: string | null;
}
