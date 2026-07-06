import { NavLink } from "react-router-dom";

function linkStyle({ isActive }: { isActive: boolean }) {
  return { fontWeight: isActive ? "bold" : "normal", marginRight: "1rem" };
}

export function Nav() {
  return (
    <nav style={{ marginBottom: "1.5rem" }}>
      <NavLink to="/" end style={linkStyle}>
        Buildings
      </NavLink>
      <NavLink to="/schedule" style={linkStyle}>
        Schedule
      </NavLink>
      <span style={{ color: "gray" }}>Reports (coming soon)</span>
    </nav>
  );
}
