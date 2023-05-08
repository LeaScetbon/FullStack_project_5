import { NavLink, Outlet } from "react-router-dom";

function Navbar({ user }) {
  return (
    <>
      <nav className="navbar">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Home
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
export default Navbar;
