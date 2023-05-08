import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <NavLink
          to="/info"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Info
        </NavLink>
        <br />
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Logout
        </NavLink>
        <br />
        <NavLink
          to="/todos"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Todos
        </NavLink>
        <br />
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Posts
        </NavLink>
        <br />
        <NavLink
          to="/albums"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Albums
        </NavLink>
        <br />
      </nav>
      <Outlet />
    </>
  );
}
export default Navbar;
