import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (localStorage.length !== 0) {
    localStorage.clear();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password) {
      return;
    }
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Authentication failed");
      }
      const users = await response.json();
      const user = users.find(
        (user) =>
          user.username === name && user.address.geo.lat.slice(-4) === password
      );
      if (!user) {
        throw new Error("Invalid username or password");
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      console.log(localStorage.getItem("currentUser"));

      navigate("/info");
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    }
  };

  return (
    <section className="section">
      <form className="form" onSubmit={handleSubmit}>
        <h5>login</h5>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-input"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-block">
          login
        </button>
      </form>
    </section>
  );
}

export default Login;
