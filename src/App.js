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
              <ProtectedRoute user={user}>
                <Navbar user={user} />
              </ProtectedRoute>
            }
          >
            <Route
              path="home"
              element={
                <ProtectedRoute user={user}>
                  <Home user={user} />
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
