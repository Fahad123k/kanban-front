import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BoardPage from "./pages/BoardPage";
import SearchResults from "./pages/SearchResult";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error("Invalid user data in localStorage:", err);
        localStorage.removeItem("user"); // cleanup if it's broken
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <SearchBar />
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700 font-medium">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <a
                href="/login"
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Login
              </a>
              <a
                href="/register"
                className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Register
              </a>
            </div>
          )}
        </div>

        <Routes>
          <Route path="/" element={user ? <Navigate to="/board" /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/board"
            element={user ? <BoardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={user ? <SearchResults /> : <Navigate to="/login" />}
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
