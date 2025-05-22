import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CreateEquipo: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [nombre, setNombre] = useState<string>("");
  const [anio, setAnio] = useState<number>(0);

  const handleSave = async () => {
    if (nombre.length < 3 || anio<1000) {
      return toast.error("Datos incorrectos");
    }
    const datos = {
      nombre: nombre,
      anio_fundacion: anio  
    }
    if (params.id) {
      return toast.success("Vamos a editar el equipo");
    }
    toast.success("Equipo guardado");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {params.id ? "Editar Equipo" : "Crear Equipo"}
        </h1>
        <p className="text-sm text-gray-500">
          {params.id
            ? "Modifica los campos necesarios."
            : "Completa la información para registrar un nuevo equipo."}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Norma"
            className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Año de fundación
          </label>
          <input
            type="number"
            onChange={(e) => setAnio(parseInt(e.target.value))}
            placeholder="Ej: 2008"
            className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-900 shadow-sm placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 focus:outline-none transition"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Volver
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {params.id ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEquipo;
