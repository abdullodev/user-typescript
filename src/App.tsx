import React, { FC, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import Login from "./pages/Login";

const ProtectedRoute: FC<{ children: any }> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token]);

  return (
    <div className="app">
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home setToken={setToken} />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-in" element={<Login setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
