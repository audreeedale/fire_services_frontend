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
