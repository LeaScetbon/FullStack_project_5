import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
            path='home'
            element={
              <ProtectedRoute user={user}>
                <Home user={user} />
              </ProtectedRoute>
            }
          />
           <Route
            path="home/todo"
            element={
              <ProtectedRoute user={user}>
                <TodoPage user={user} />
              </ProtectedRoute>
            }
          />
      </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;
