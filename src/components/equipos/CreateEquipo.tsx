import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CreateEquipo: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [nombre, setNombre] = useState<string>("");
  const [anio, setAnio] = useState<number>(0);
  const [mensaje, setMensaje] = useState(``);
  const [error, setError] = useState('');

  // Cargar datos si hay codigo
  useEffect(() => {
    if (params.codigo) {
      fetch(`http://localhost:3333/listarequipoid/${params.codigo}`)
        .then(res => {
          if (!res.ok) throw new Error("No se pudo cargar el equipo");
          return res.json();
        })
        .then(data => {
          setNombre(data.ms.nombre);
          setAnio(data.ms.anio_fundacion);
        })
        .catch(() => setError("Error al cargar el equipo"));
    }
  }, [params.codigo]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.length < 3 || anio === 0) {
      return toast.error("Datos incorrectos");
    }
    toast.success(params.codigo ? "Actualizando..." : "Vamos a guardar");
    setError("");
    try {
      let respuesta;
      if (params.codigo) {
        // Actualizar equipo existente
        respuesta = await fetch(`http://localhost:3333/actualizarEquipoId/${params.codigo}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ nombre: nombre, anio_fundacion: anio })
        });
      } else {
        // Crear nuevo equipo
        respuesta = await fetch(`http://localhost:3333/insertarEquipo`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ nombre: nombre, anio_fundacion: anio })
        });
      }
      const ms = await respuesta.json();
      setMensaje(ms.mensaje);
    } catch (err) {
      setError(params.codigo ? "Error al actualizar el equipo" : "Error al guardar el equipo");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {params.codigo ? "Editar Equipo" : "Crear Equipo"}
        </h1>
        <p className="text-sm text-gray-500">
          {params.codigo
            ? "Modifica los campos necesarios."
            : "Completa la información para registrar un nuevo equipo."}
        </p>
      </div>

      {mensaje && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-2">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-2">
          {error}
        </div>
      )}

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
            value={anio === 0 ? "" : anio}
            onChange={(e) => setAnio(parseInt(e.target.value) || 0)}
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
            {params.codigo ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEquipo;
