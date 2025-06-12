import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

interface propsRegister{
  isAuth: boolean;
  setLog: (value:boolean)=> void;
  setIsAuth: (value:boolean) => void;
}

const Register: React.FC<propsRegister> = ({isAuth, setLog, setIsAuth}) => {

  const navigate = useNavigate();

  //Datos del usuario a registrar:

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordT, setPasswordT] = useState<string>("");
  //Vefificador si existe el correo:
  const [mailExist, setMailExist] = useState<boolean>(false);

  //Validación para saber si el correo ya se encuentra registrado:
  useEffect(()=>{
    const correoExist = async ( ) =>{
      const respuesta = await fetch(`http://localhost:3333/userByEmail`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({email}),
      });
      const res = await respuesta.json()
      setMailExist(res.ms);
    }
    correoExist();
  },[email])

  //Manejamos el Save del usuariio:

  const handleSave = async () => {
    if(mailExist){
      return toast.error("No puedes resgistrarte, el correo ya esta es uso.")
    }
    if (password.length < 8 || email.length < 9) {
      return toast.error("La longitud de los campos debe ser mayor");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Ingresa un correo válido");
    }

    if (password != passwordT) {
      return toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Ey los passwords!!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Intentalo de nuevo.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
    try {
      const respuesta = await fetch(`http://localhost:3333/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const ms = await respuesta.json();
      if(ms.ms === "agregado"){
        localStorage.setItem('auth','true');
        setLog(true);
        setIsAuth(true);
        navigate('/home');
        return
      }
    } catch (e) {
      return toast.error("El registro no fue posible, intenta más tarde");
    }
  };

  return isAuth ? (<Navigate to="/home"/>):( 
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Registrarme</h1>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className={`w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus: ${mailExist ? 'ring-red-600' : 'ring-indigo-500'} focus:outline-none transition`}

            onChange={(e) => {setEmail(e.target.value)}}
          />
          {mailExist && (<div className="text-red-600 font-semibold">
            El email ya esta en uso, intenta con otro.
          </div>)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-900 shadow-sm placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 focus:outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirma tu Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-900 shadow-sm placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 focus:outline-none transition"
            onChange={(e) => setPasswordT(e.target.value)}
          />
        </div>

        <div className="flex justify-between pt-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-red-300 text-white hover:bg-red-700 transition"
            onClick={() => navigate(-1)}
          >
            regresar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
