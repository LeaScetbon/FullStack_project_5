import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Login.module.css";

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
      let url = `https://jsonplaceholder.typicode.com/users?username=${name}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Authentication failed");
      }
      const users = await response.json();
      const user = users.find(
        (user) => user.address.geo.lat.slice(-4) === password
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
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h5>LOGIN</h5>
        <div className={styles["form-row"]}>
          <input
            type="text"
            placeholder="Username"
            className={styles["form-input"]}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="password"
            placeholder="Password"
            className={styles["form-input"]}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.btn}>
          LOGIN
        </button>
      </form>
    </section>
  );
}

export default Login;
