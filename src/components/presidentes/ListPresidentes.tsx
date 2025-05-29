import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface InforPresidente {
  id: number;
  dni: string;
  nombre: string;
  codigo_equipo: number;
}
const ListPresidentes: React.FC = () => {
  const navigate = useNavigate();
  const [recargar, setRecargar] = useState<boolean>(false);
  //Pasos para implementación de la API:
  const [data, setData] = useState<InforPresidente[]>([]);

  //Pre eliminación:
  const [showModal, setShowModal] = useState(false);
  const [presidenteAEliminar, setPresidenteAEliminar] = useState<number | null>(
    null
  );
  const confirmarEliminacion = (id: number) => {
    setPresidenteAEliminar(id);
    setShowModal(true);
  };

  useEffect(() => {
    try {
      loadData();
    } catch (e) {}
  }, [recargar]);

  const loadData = async () => {
    const res = await fetch(`http://localhost:3333/listarPresidentes`);
    const response = await res.json();
    setData(response.ms);
  };

  const handleDeletePresidente = async () => {
    if (presidenteAEliminar === null) return;
    try {
      await fetch(
        `http://localhost:3333/eliminarPresidenteId/${presidenteAEliminar}`,
        {
          method: "DELETE",
        }
      );
      setRecargar(!recargar);
      toast.success("Presidente eliminado");
    } catch (e) {
      toast.error("No se ha logrado eliminar el presidente.");
    } finally {
      setShowModal(false);
      setPresidenteAEliminar(null);
    }
  };
  return (
    <div>
      {data.map((val) => (
        <div
          key={val.id}
          className="flex justify-between items-center border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
        >
          <div>
            <p className="text-lg font-semibold text-gray-800">{val.nombre}</p>
            <p className="text-xs text-gray-400">Equipo: {val.codigo_equipo}</p>
            <p className="text-xs text-gray-400">ID: {val.id}</p>
            <p className="text-xs text-gray-400">DNI: {val.dni}</p>
          </div>

          <div className="flex space-x-2">
            <button
              className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              onClick={() => navigate(`/formularioPresidentes/${val.id}`)}
            >
              Editar
            </button>
            <button
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
              onClick={() => confirmarEliminacion(val.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-20 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirmar eliminación
            </h2>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar este presidente?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeletePresidente}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
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

export default ListPresidentes;
