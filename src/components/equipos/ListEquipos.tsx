import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

interface InforEquipo {
  codigo: string;
  nombre: string;
  anio_fundacion: number;
}

const ListEquipos:React.FC = () => {
    const navigate = useNavigate();
    const [recargar, setRecargar] = useState<boolean>(false);

    //Pasos para implementación de la API:
  // const [data, setData] = useState<InforEquipo[]>([]);

  /**
   * 
   useEffect(()=>{
    try{
      loadData();
    }catch (e){
    }
   },[recargar])

   const loadData = async () =>{
    const res =await fetch(`http://localhost:3000/api/v1/presidente`);
    response = await res.json();
    setData(response) 
   }
   */
  const data = [
    {
      codigo: "1",
      nombre: "Number 1",
      anio_fundacion: 2005,
    },
    {
      codigo: "2",
      nombre: "Number 2",
      anio_fundacion: 2002,
    },
  ];

  const handleDelete = async (cod:string) =>{
    try{}catch(e){}
  }
  return <div>
    {data.map(val =>(
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
              onClick={()=> navigate(`/formularioEquipos/${val.codigo}`)}
            >
              Editar
            </button>
            <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={()=>handleDelete(val.codigo)}
            >
              Eliminar
            </button>
          </div>
        </div>
    ))}
  </div>;
};

export default ListEquipos;
