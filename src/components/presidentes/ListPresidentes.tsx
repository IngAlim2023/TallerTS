import React, {useState, useEffect} from "react";
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

  
   useEffect(()=>{
    try{
      loadData();
    }catch (e){
    }
   },[recargar])

   const loadData = async () =>{
    const res =await fetch(`http://localhost:3333/listarPresidentes`);
    const response = await res.json();
    setData(response.ms) 
  }
  

  const handleDeletePresidente = async (cod: number) =>{
    try{
      await fetch(`http://localhost:3333/eliminarPresidenteId/${cod}`,{method:"DELETE"})
      setRecargar(!recargar);
    }catch(e){
      toast.error('No se ha logrado eliminar el presidente.')
    }
  }
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
          </div>

          <div className="flex space-x-2">
            <button
              className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              onClick={() => navigate(`/formularioPresidentes/${val.id}`)}
            >
              Editar
            </button>
            <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={()=>handleDeletePresidente(val.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPresidentes;
