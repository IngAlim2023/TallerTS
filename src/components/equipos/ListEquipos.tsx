import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

interface InforEquipo {
  codigo: string;
  nombre: string;
  anio_fundacion: number;
}

const ListEquipos: React.FC = () => {
  const [equipos, setEquipos] = useState<InforEquipo[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [codigo, setCodigo] = useState<number>(0);
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {

    await fetch(`http://localhost:3333/listarequipo`)
      .then((res) => {
        if (!res.ok) throw new Error(`No se pueden mostrar los equipos`)
        return res.json();
      })
      .then((data) => {
        setEquipos(data.ms);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.mensaje || `falla al cargar`)
        setLoading(false)
      })
    }
    loadData();
  },[])

  const eliminarEquipo = async (codigo: number) => {
    try {
      const res = await fetch(`http://localhost:3333/eliminarEquipoId/${codigo}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("No se pudo eliminar el equipo");
      setEquipos(equipos.filter((eq) => Number(eq.codigo) !== codigo));
    } catch (error) {
      setError("Error al eliminar el equipo");
    }
  };

  return <div>
    {error && (
      <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-2">
        {error}
      </div>
    )}
    {equipos.map((val: InforEquipo) => (
      <div
        key={val.codigo}
        className="flex justify-between items-center border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
      >
        <div>
          <p className="text-lg font-semibold text-gray-800">{val.nombre}</p>
          <p className="text-xs text-gray-400">ID: {val.codigo}</p>
        </div>

        <div className="flex space-x-2">
          <button
            className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            onClick={() => navigate(`/formularioEquipos/${val.codigo}`)}
          >
            Editar
          </button>
          <button
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={() => eliminarEquipo(Number(val.codigo))}
          >
            Eliminar
          </button>
        </div>
      </div>
    ))}
  </div>;
};

export default ListEquipos;
