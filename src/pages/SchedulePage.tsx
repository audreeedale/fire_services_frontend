import { useEffect, useState } from "react";
import { listBuildings } from "../api/buildings";
import { createSchedule, deleteSchedule, listSchedules, updateSchedule } from "../api/schedules";
import { ScheduleForm } from "../components/ScheduleForm";
import { ScheduleList } from "../components/ScheduleList";
import type { Building, Schedule, ScheduleInput } from "../types";

export function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  async function refresh() {
    try {
      const [scheduleData, buildingData] = await Promise.all([listSchedules(), listBuildings()]);
      setSchedules(scheduleData);
      setBuildings(buildingData);
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load schedules");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit(input: ScheduleInput) {
    if (editingSchedule) {
      await updateSchedule(editingSchedule.id, input);
      setEditingSchedule(null);
    } else {
      await createSchedule(input);
    }
    await refresh();
  }

  async function handleDelete(id: number) {
    await deleteSchedule(id);
    await refresh();
  }

  return (
    <div>
      <h1>Inspection Schedule</h1>

      {loadError && <p style={{ color: "red" }}>{loadError}</p>}

      {buildings.length === 0 ? (
        <p>Add a building first before creating a schedule.</p>
      ) : (
        <ScheduleForm
          buildings={buildings}
          editingSchedule={editingSchedule}
          onSubmit={handleSubmit}
          onCancel={() => setEditingSchedule(null)}
        />
      )}

      <ScheduleList schedules={schedules} onEdit={setEditingSchedule} onDelete={handleDelete} />
    </div>
  );
}
