import type { Building } from "../types";

interface BuildingListProps {
  buildings: Building[];
  onEdit: (building: Building) => void;
  onDelete: (id: number) => void;
}

export function BuildingList({ buildings, onEdit, onDelete }: BuildingListProps) {
  if (buildings.length === 0) {
    return <p>No buildings yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Street address</th>
          <th>Suburb</th>
          <th>State</th>
          <th>Postcode</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {buildings.map((building) => (
          <tr key={building.id}>
            <td>{building.name ?? "—"}</td>
            <td>{building.street_address}</td>
            <td>{building.suburb}</td>
            <td>{building.state}</td>
            <td>{building.postcode}</td>
            <td>
              <button onClick={() => onEdit(building)}>Edit</button>
              <button onClick={() => onDelete(building.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
