import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Navbar";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login setUser={setUser} />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar  />
              </ProtectedRoute>
            }
          >
            <Route
              path="home"
              element={
                <ProtectedRoute >
                  <Home  />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="todo"
              element={
                <ProtectedRoute user={user}>
                  <TodoPage user={user} />
                </ProtectedRoute>
              }
            /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
