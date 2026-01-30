import {FC, useEffect, useState} from "react";
import api from "../../../../api.tsx";

const EstudoComplementar:FC = () => {
    const [listEstudos, setListEstudo] = useState<Array<any>>([])
    const url = "/admin/dimensoes/estudos_complementares/"
    useEffect(() =>{
     const fetchEstudos = async () => {
            try {
              const response = await api.get(url);
              setListEstudo(response.data); // Axios auto-parses JSON
            } catch (err) {
              console.log(err)
            } 
        };               
     fetchEstudos() 
    },[])

    return (
        <ul>
            {listEstudos.map(elemento =>{
                return(
                    <li>
                        {elemento}
                    </li>
                )
            })}
        </ul>
    )
}