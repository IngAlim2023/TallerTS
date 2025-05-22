import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import ListEquipos from "./components/equipos/ListEquipos";
import CreateEquipo from "./components/equipos/CreateEquipo";
import ListPresidentes from "./components/presidentes/ListPresidentes";
import CreatePresidente from "./components/presidentes/CreatePresidente";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipos" element={<ListEquipos />} />
        <Route path="/formularioEquipos" element={<CreateEquipo />} />
        <Route path="/formularioEquipos/:id" element={<CreateEquipo />} />
        <Route path="/presidentes" element={<ListPresidentes />} />
        <Route path="/formularioPresidentes" element={<CreatePresidente />} />
        <Route path="/formularioPresidentes/:id" element={<CreatePresidente />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
