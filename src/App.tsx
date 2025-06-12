import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import ListEquipos from "./components/equipos/ListEquipos";
import CreateEquipo from "./components/equipos/CreateEquipo";
import ListPresidentes from "./components/presidentes/ListPresidentes";
import CreatePresidente from "./components/presidentes/CreatePresidente";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [log, setLog] = useState<boolean>(false)
  useEffect(()=>{
    const res: any = localStorage.getItem("auth");
    setIsAuth(res === "true");
  },[log])
  return (
    <Router>
      {isAuth && <Navbar setIsAuth={setIsAuth} setLog={setLog} />}
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth} setLog={setLog} isAuth={isAuth}/>} />
        <Route path="/register" element={<Register  isAuth={isAuth} setLog={setLog} setIsAuth={setIsAuth} />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/equipos" element={<ListEquipos />} />
        <Route path="/formularioEquipos" element={<CreateEquipo />} />
        <Route path="/formularioEquipos/:id" element={<CreateEquipo />} />
        <Route path="/presidentes" element={<ListPresidentes />} />
        <Route path="/formularioPresidentes" element={<CreatePresidente />} />
        <Route
          path="/formularioPresidentes/:id"
          element={<CreatePresidente />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
