import { FC, useState, useEffect } from "react";
import api from "../../../../adapters/api.tsx";
import { CommonTab } from "./commom/CommomTab.tsx";

export const EstudosComplementaresTab: FC<{ nomeDimensao: string | undefined, }> = ({nomeDimensao}) => {
    const [nomeEstudosComplementares, setNomeEstudosComplementares] = useState<Array<Record<string, string | number | null>>>([])
    const url = `/admin/dimensoes/${nomeDimensao}/estudos_complementares`

    useEffect(() =>{
        const getEstudosComplementares = async () => {
            const response = await api.get(url)
            setNomeEstudosComplementares(response.data.estudos_complementares || [])
        }
        getEstudosComplementares()
    },[])

    return <CommonTab activeTabDict={nomeEstudosComplementares} activeTab="" />
}