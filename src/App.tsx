import { useEffect, useState } from "react";
import { createBuilding, deleteBuilding, listBuildings, updateBuilding } from "./api/buildings";
import { BuildingForm } from "./components/BuildingForm";
import { BuildingList } from "./components/BuildingList";
import type { Building, BuildingInput } from "./types";

function App() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  async function refresh() {
    try {
      const data = await listBuildings();
      setBuildings(data);
      setLoadError(null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load buildings");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit(input: BuildingInput) {
    if (editingBuilding) {
      await updateBuilding(editingBuilding.id, input);
      setEditingBuilding(null);
    } else {
      await createBuilding(input);
    }
    await refresh();
  }

  async function handleDelete(id: number) {
    await deleteBuilding(id);
    await refresh();
  }

  return (
    <div>
      <h1>Fire Services — Building Addresses</h1>

      {loadError && <p style={{ color: "red" }}>{loadError}</p>}

      <BuildingForm
        editingBuilding={editingBuilding}
        onSubmit={handleSubmit}
        onCancel={() => setEditingBuilding(null)}
      />

      <BuildingList buildings={buildings} onEdit={setEditingBuilding} onDelete={handleDelete} />
    </div>
  );
}

export default App;
