import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

interface InforPresidente {
  id: number;
  dni: string;
  nombre: string;
  codigo_equipo: number;
}

interface SelectEquipo {
  codigo?: any;
  nombre?: string;
  anio_fundacion?: string;
}

interface SelectEquipo {
  value?: any;
  label?: string;
}

const CreatePresidente: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [codEquipo, setCodEquipo] = useState<number>(0);
  const [data, setData] = useState<SelectEquipo[]>([]);
  const [president, setPresident] = useState<InforPresidente[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`http://localhost:3333/listarequipo/SP`);
      const response = await res.json();
      setData(response.ms);
      if (params.id) {
        const { id } = params;
        try {
          const resp = await fetch(
            `http://localhost:3333/obtenerPresidente/${id}`
          );
          const respon = await resp.json();
          setPresident(respon.ms);
          setNombre(respon.ms[0].nombre);
          setDni(respon.ms[0].dni);
          setCodEquipo(respon.ms[0].codigo_equipo);
        } catch (e) {
          navigate(-1);
          toast.error("Por el momento no está disponible esta opción.");
        }
      }
    };
    loadData();
  }, []);

  const options: SelectEquipo[] = data.map((val) => ({
    value: val.codigo,
    label: val.nombre,
  }));

  const handleSave = async () => {
    if (nombre.length < 3 || dni.length < 4 || codEquipo === 0) {
      return toast.error("Datos incorrectos");
    }
    const datos = {
      dni: dni,
      nombre: nombre,
      codigo_equipo: codEquipo,
    };
    if (params.id) {
      await fetch(
        `http://localhost:3333/actualizarPresidenteId/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        }
      );
      navigate("/presidentes");

      return toast.success("Presidente editado");
    }
    await fetch("http://localhost:3333/insertarPresidente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    toast.success("Presidente guardado");
    navigate("/presidentes");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {params.id ? "Editar Presidente" : "Crear Presidente"}
        </h1>
        <p className="text-sm text-gray-500">
          {params.id
            ? `Modifica los campos necesarios de ${president[0]?.nombre}.`
            : "Completa la información para registrar un nuevo presidente."}
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
            DNI
          </label>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-900 shadow-sm placeholder-gray-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seleccionar Equipo
          </label>
          <Select
            options={options}
            onChange={(e) => setCodEquipo(parseInt(e?.value))}
          />
          {params.id && (
            <label className="block text-xs font-medium text-cyan-700 mb-1">
              Este campo es opcional
            </label>
          )}
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

export default CreatePresidente;
