import type { Schedule } from "../types";

interface ScheduleListProps {
  schedules: Schedule[];
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: number) => void;
}

const STATUS_LABELS: Record<Schedule["status"], string> = {
  overdue: "Overdue",
  due_soon: "Due soon",
  upcoming: "Upcoming",
};

export function ScheduleList({ schedules, onEdit, onDelete }: ScheduleListProps) {
  if (schedules.length === 0) {
    return <p>No schedules yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Building</th>
          <th>Frequency</th>
          <th>Last inspected</th>
          <th>Next due</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule) => (
          <tr key={schedule.id}>
            <td>
              {schedule.building.street_address}, {schedule.building.suburb}
            </td>
            <td>{schedule.frequency}</td>
            <td>{schedule.last_inspected_on ?? "—"}</td>
            <td>{schedule.next_due_on}</td>
            <td>{STATUS_LABELS[schedule.status]}</td>
            <td>
              <button onClick={() => onEdit(schedule)}>Edit</button>
              <button onClick={() => onDelete(schedule.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
