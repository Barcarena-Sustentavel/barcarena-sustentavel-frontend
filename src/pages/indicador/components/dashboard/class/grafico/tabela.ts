import { Grafico } from "./grafico.ts";
import { DashboardProps } from "../../../../../../interfaces/indicador/dashboard_interface.tsx";
import React from "react";
import {MaterialReactTable} from "material-react-table";
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

export class Tabela extends Grafico {
    constructor(colunas: string[], dados: number[][]) {
        super(colunas, dados);
    }

    gerarDados() {
        //Mapeamento das colunas
        const cols = this.colunas.map((coluna) => ({
            header: coluna,
            accessorKey: coluna,
        }));
        const DadosTabela: Array<Record<string, string | number>> = [];

        for (let i = 0; i < this.dados[0].length; i++) {
            const row: Record<string, string | number> = {};
            for (const coluna of this.colunas) {
                row[coluna] = ""; // inicializa vazio
            }
            DadosTabela.push(row);
        }

        for (let index = 0; index < this.colunas.length; index++) {
            const name: string = this.colunas[index];
            for (
                let indexDentro = 0;
                indexDentro < this.dados.length;
                indexDentro++
            ) {
                const dado: string | number = this.dados[index][indexDentro];
                DadosTabela[indexDentro][name] = dado;
            }
        }
        return React.createElement(MaterialReactTable, {
            columns: cols,
            data: DadosTabela,
            enableColumnActions: false,
            enableColumnFilters: false,
            enablePagination: true,
            enableSorting: true,
            enableBottomToolbar: true,
            enableTopToolbar: true,
            enableFullScreenToggle: false,
            enableStickyHeader: true,
            localization: MRT_Localization_PT_BR,
            // Configuração visual padrão (sem a lógica complexa de tela cheia)
            muiTablePaperProps: {
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%', // Ocupa a altura da div pai
                    width: '100%',
                    boxShadow: 'none', // Opcional: remove sombra se preferir visual "flat"
                },
            },

            // Área de dados com rolagem
            muiTableContainerProps: {
                sx: {
                    flexGrow: 1,
                    height: '0px',     // Mantém o truque para respeitar o flexbox do pai
                    minHeight: '0px',
                    overflow: 'auto',  // Barra de rolagem apenas nos dados
                },
            },

            muiTableBodyRowProps: ({ row }) => ({
                sx: {
                    cursor: "pointer",
                    backgroundColor: row.index % 2 === 0 ? "#f5f5f5" : "white",
                },
            }),
        });
    }
}