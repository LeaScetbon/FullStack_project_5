import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Home
        </NavLink>
        <br/>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
           Logout
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
export default Navbar;
