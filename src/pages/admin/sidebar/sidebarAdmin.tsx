import { FC, useEffect, useState } from "react";
import "./sidebarAdmin.css"
import { useNavigate } from "react-router-dom";
import api from "../../../api.tsx";
import { getCor } from "../headers/getCor.tsx";
import { getIcone } from "../headers/getIcone.tsx";

interface SidebarAdminProps {
  selectedDimensao: string;
  dimensoes: string[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  navigateNovaDimensao: (value: string) => void;
}

const SidebarAdmin: FC<SidebarAdminProps> = ({
  selectedDimensao,
  dimensoes,
  activeTab,
  setActiveTab,
  navigateNovaDimensao
}) => {
  
    // botão para voltar página
    const navigate = useNavigate();

    function handleBack() {
        navigate("/admin/dimensao");
    };


    useEffect(() => {
        console.log(dimensoes);
    }, [])


    return (
        <aside className="admin-sidebar">
            {/* Título da dimensão */}
            <div className="text-center icon">{getIcone(selectedDimensao, getCor(selectedDimensao))}</div>
            <div className="d-flex justify-content-center">
            <h2 className="admin-sidebar__title" style={{color: getCor(selectedDimensao)}}>{selectedDimensao}</h2>
            </div>

            {/* Dropdown seletor de dimensão */}
            <select
                className="admin-sidebar__select"
                value={selectedDimensao}
                onChange={(e) => navigateNovaDimensao(e.target.value)}
            >
                {dimensoes.map((d, index) => (
                    <option key={index} value={d}>
                        {d}
                    </option>
                ))}
            </select>

            {/* Navegação vertical */}
            <nav className="admin-sidebar__nav">
                {[
                { label: "Dimensão", key: "Dimensão" },
                { label: "Indicadores", key: "Indicadores" },
                { label: "Referências", key: "Referências" },
                { label: "Estudos Complementares", key: "EstudosComplementares" },
                { label: "Artigo", key: "Artigo" },
                ].map(({ label, key }) => (
                <button
                    key={key}
                    className={`admin-sidebar__nav-item ${activeTab === key ? "active" : ""}`}
                    onClick={() => setActiveTab(key)}
                >
                    {label}
                </button>
                ))}
            </nav>

            {/* Botão voltar fixo no fundo */}
            <button className="admin-sidebar__voltar" onClick={handleBack}>
                Voltar
            </button>
        </aside>
    )
};


export default SidebarAdmin;