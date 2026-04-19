import { FC, useState,useEffect } from "react";
import { CommonTab } from "./commom/CommomTab.tsx";
import api from "../../../../adapters/api.tsx";

export const ReferenciasTab:FC<{nomeDimensao:string | undefined, }> = ({nomeDimensao}) => {
    const [nomeReferencias, setNomeReferencias] = useState<Array<Record<string, string | number | null>>>([])
    const url = `/admin/dimensoes/${nomeDimensao}/referencias`

    useEffect(() => {
        const getReferencias = async () => {
            const response = await api.get(url)
            setNomeReferencias(response.data.referencias || []);
        }
        getReferencias()
    },[])

    return <CommonTab activeTabDict={nomeReferencias} activeTab="referencias" nomeDimensao={nomeDimensao}/>
}