import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import { BuildingsPage } from "./pages/BuildingsPage";
import { SchedulePage } from "./pages/SchedulePage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1 style={{ marginBottom: 0 }}>Fire Services</h1>
        <Nav />
        <Routes>
          <Route path="/" element={<BuildingsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
