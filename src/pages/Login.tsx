import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface LoginProps {
  setIsAuth: (value: boolean) => void;
  isAuth: boolean;
  setLog: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuth, setLog, isAuth }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLog = async () => {
    if (email === "" || password === "") {
      return toast.error("Faltan las credenciales");
    }
    try {
      const respuesta = await fetch(`http://localhost:3333/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const ms = await respuesta.json();
      if(ms.ms){
        localStorage.setItem('auth','true');
        setLog(true);
        setIsAuth(true);
        navigate('/home');
        return
      }
    } catch (e) {
      return toast.error("No se logro iniciar sesión intenta más tarde");
    }
  };

  return isAuth ? (<Navigate to="/home"/>) : (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Inicio de sesión
        </h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            onChange={(e)=> setEmail(e.target.value)}
            />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-900 shadow-sm placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 focus:outline-none transition"
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end text-blue-500 hover:text-blue-700 hover:underline">
          <Link to="/register">Registrarme</Link>
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
            onClick={handleLog}
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
