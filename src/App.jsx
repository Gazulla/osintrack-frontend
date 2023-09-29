import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import useLogin from "./hooks/useLogin";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { user, handleLogin, handleLogout } = useLogin();
  return (
    <main className={darkMode ? "dark" : ""}>
      <Router>
        <Header setDarkMode={setDarkMode} user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="login" element={<Login isLoggedIn={!!user} />} />
          <Route path="*" element={<div>404 - Resource not found</div>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
