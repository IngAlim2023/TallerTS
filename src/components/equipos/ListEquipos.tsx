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
  const [showModal, setShowModal] = useState(false);
  const [codigoEliminar, setCodigoEliminar] = useState<string | null>(null);
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

  const handleEliminarClick = (codigo: string) => {
    setCodigoEliminar(codigo);
    setShowModal(true);
  };

  const handleConfirmarEliminar = () => {
    if (codigoEliminar) {
      eliminarEquipo(Number(codigoEliminar));
    }
    setShowModal(false);
    setCodigoEliminar(null);
  };

  const handleCancelarEliminar = () => {
    setShowModal(false);
    setCodigoEliminar(null);
  };

  return (
    <div>
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
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-yellow-600 transition"
              onClick={() => navigate(`/formularioEquipos/${val.codigo}`)}
            >
              Editar
            </button>
            <button
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
              onClick={() => handleEliminarClick(val.codigo)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {/* Modal confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">¿Seguro que desea eliminar?</h2>
            <div className="flex justify-between space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={handleCancelarEliminar}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={handleConfirmarEliminar}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEquipos;
