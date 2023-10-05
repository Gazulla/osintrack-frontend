import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import useLogin from "./hooks/useLogin";
import { useState } from "react";
import Narrative from "./pages/Narrative";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = (bool) => {
    const element = document.querySelector("body");
    if (bool) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
    setDarkMode(bool);
  };

  const { user, handleLogout } = useLogin();

  return (
    <main>
      <Router>
        <Header user={user} handleLogout={handleLogout} darkMode={darkMode} handleDarkMode={handleDarkMode} />
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="narratives/:narrativeId" element={<Narrative />} />
          </Route>
          <Route path="login" element={<Login isLoggedIn={!!user} darkMode={darkMode} />} />
          <Route path="*" element={<div>404 - Resource not found</div>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
