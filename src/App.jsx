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
  const handleDarkMode = (bool) => {
    setDarkMode(bool);
  };
  const { user, handleLogout } = useLogin();
  return (
    <main className={`${darkMode ? "dark" : ""} text-foreground bg-background`}>
      <Router>
        <Header user={user} handleLogout={handleLogout} darkMode={darkMode} handleDarkMode={handleDarkMode} />
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="login" element={<Login isLoggedIn={!!user} darkMode={darkMode} />} />
          <Route path="*" element={<div>404 - Resource not found</div>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
