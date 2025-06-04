import React, { useState } from 'react'

type item ={
    codigo?:number;
    nombre?:string;
    anio_fundacion?:string;
}

const Buscador:React.FC = () => {
    const [busqueda, setBusqueda] = useState(``);

    //const listaOriginal: item[] 
    return (
    <div>Buscador</div>
  )
}

export default Buscador