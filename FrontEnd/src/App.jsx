import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./loginform/Login";
import RegisterForm from "./loginform/Register";
import Home from "./inicio/Home";
import ProtectedRoute from "./inicio/Protected";
import PlanetSearch from "./PlanetSearch/PlanetSearch";
import LocalTab from "./local/Localtab";
import AdminTab from "./local/AdminTab";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mundo"
          element={
            <ProtectedRoute>
              <PlanetSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/local"
          element={
            <ProtectedRoute>
              <LocalTab />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminTab />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
