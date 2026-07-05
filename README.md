# Fire Services Frontend

React + TypeScript UI for the [fire_services_prototype](../fire_services_prototype) Rails API.
Learning-focused, functional-only prototype (no styling investment): list, add, edit, and
delete building/client addresses against the backend's `/api/v1/buildings` endpoints.

## Prerequisites

The Rails backend must be running first:

```bash
cd ../fire_services_prototype
bin/rails server
```

## Running

```bash
npm install
npm run dev
```

Open the URL Vite prints (defaults to `http://localhost:5173`).

## Structure

- `src/types.ts` — `Building` shape matching the API's JSON response
- `src/api/buildings.ts` — fetch wrappers for the four CRUD endpoints
- `src/components/BuildingForm.tsx` — one form, reused for both create and edit
- `src/components/BuildingList.tsx` — renders the building list with edit/delete actions
- `src/App.tsx` — holds the building list + "currently editing" state, re-fetches after each mutation

## Roadmap

Next step (not built yet): attaching documents (PDF/Word inspection reports, certificates)
to each building, via the backend's planned Active Storage integration.
