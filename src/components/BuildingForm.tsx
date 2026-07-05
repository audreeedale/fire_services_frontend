import { useEffect, useState, type FormEvent } from "react";
import type { Building, BuildingInput } from "../types";

const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

interface FormState {
  name: string;
  street_address: string;
  suburb: string;
  state: string;
  postcode: string;
}

const emptyForm: FormState = {
  name: "",
  street_address: "",
  suburb: "",
  state: "NSW",
  postcode: "",
};

function toFormState(building: Building | null): FormState {
  if (!building) return emptyForm;

  return {
    name: building.name ?? "",
    street_address: building.street_address,
    suburb: building.suburb,
    state: building.state,
    postcode: building.postcode,
  };
}

interface BuildingFormProps {
  editingBuilding: Building | null;
  onSubmit: (input: BuildingInput) => Promise<void>;
  onCancel: () => void;
}

export function BuildingForm({ editingBuilding, onSubmit, onCancel }: BuildingFormProps) {
  const [form, setForm] = useState<FormState>(() => toFormState(editingBuilding));
  const [error, setError] = useState<string | null>(null);

  // Reset the form whenever we switch between "adding" and "editing a specific building".
  useEffect(() => {
    setForm(toFormState(editingBuilding));
    setError(null);
  }, [editingBuilding]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      await onSubmit({ ...form, name: form.name.trim() === "" ? null : form.name });
      if (!editingBuilding) setForm(emptyForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingBuilding ? `Edit building #${editingBuilding.id}` : "Add a building"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>
          Name (optional)
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
      </div>

      <div>
        <label>
          Street address
          <input
            required
            value={form.street_address}
            onChange={(e) => setForm({ ...form, street_address: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label>
          Suburb
          <input
            required
            value={form.suburb}
            onChange={(e) => setForm({ ...form, suburb: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label>
          State
          <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}>
            {AU_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Postcode
          <input
            required
            pattern="\d{4}"
            title="4 digits"
            value={form.postcode}
            onChange={(e) => setForm({ ...form, postcode: e.target.value })}
          />
        </label>
      </div>

      <button type="submit">{editingBuilding ? "Save changes" : "Add building"}</button>
      {editingBuilding && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
