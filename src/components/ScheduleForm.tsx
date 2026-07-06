import { useEffect, useState, type FormEvent } from "react";
import type { Building, Frequency, Schedule, ScheduleInput } from "../types";

const FREQUENCIES: Frequency[] = ["monthly", "six_monthly", "annual"];

interface FormState {
  building_id: string;
  frequency: Frequency;
  last_inspected_on: string;
  next_due_on: string;
}

function emptyForm(buildings: Building[]): FormState {
  return {
    building_id: buildings[0] ? String(buildings[0].id) : "",
    frequency: "monthly",
    last_inspected_on: "",
    next_due_on: "",
  };
}

function toFormState(schedule: Schedule | null, buildings: Building[]): FormState {
  if (!schedule) return emptyForm(buildings);

  return {
    building_id: String(schedule.building_id),
    frequency: schedule.frequency,
    last_inspected_on: schedule.last_inspected_on ?? "",
    next_due_on: schedule.next_due_on,
  };
}

interface ScheduleFormProps {
  buildings: Building[];
  editingSchedule: Schedule | null;
  onSubmit: (input: ScheduleInput) => Promise<void>;
  onCancel: () => void;
}

export function ScheduleForm({ buildings, editingSchedule, onSubmit, onCancel }: ScheduleFormProps) {
  const [form, setForm] = useState<FormState>(() => toFormState(editingSchedule, buildings));
  const [error, setError] = useState<string | null>(null);

  // Reset the form whenever we switch between "adding" and "editing a specific schedule".
  useEffect(() => {
    setForm(toFormState(editingSchedule, buildings));
    setError(null);
  }, [editingSchedule, buildings]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      await onSubmit({
        building_id: Number(form.building_id),
        frequency: form.frequency,
        last_inspected_on: form.last_inspected_on || null,
        next_due_on: form.next_due_on || null,
      });
      if (!editingSchedule) setForm(emptyForm(buildings));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingSchedule ? `Edit schedule #${editingSchedule.id}` : "Add a schedule"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>
          Building
          <select
            required
            value={form.building_id}
            onChange={(e) => setForm({ ...form, building_id: e.target.value })}
          >
            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name ? `${building.name} — ` : ""}
                {building.street_address}, {building.suburb}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Frequency
          <select
            value={form.frequency}
            onChange={(e) => setForm({ ...form, frequency: e.target.value as Frequency })}
          >
            {FREQUENCIES.map((frequency) => (
              <option key={frequency} value={frequency}>
                {frequency}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Last inspected on (optional)
          <input
            type="date"
            value={form.last_inspected_on}
            onChange={(e) => setForm({ ...form, last_inspected_on: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label>
          Next due on (leave blank to auto-calculate from last inspected + frequency)
          <input
            type="date"
            value={form.next_due_on}
            onChange={(e) => setForm({ ...form, next_due_on: e.target.value })}
          />
        </label>
      </div>

      <button type="submit">{editingSchedule ? "Save changes" : "Add schedule"}</button>
      {editingSchedule && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
