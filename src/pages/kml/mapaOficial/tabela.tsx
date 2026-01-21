import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export const Tabela: FC<{
  botaoConectividade: string;
  dadosTabela: Array<any>;
  colunasTabela: string[];
  setFitBounds: (fitBound: L.LatLngBoundsExpression) => void;
  //refsMarcador: React.MutableRefObject<any>;
}> = ({ botaoConectividade, dadosTabela, colunasTabela, setFitBounds, /*refsMarcador*/ }) => {
  // Renderiza a tabela com botão em cada linha que centraliza o mapa
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 600, margin: "20px auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {colunasTabela.map((coluna) => (
              <TableCell key={coluna} sx={{ fontWeight: "bold" }}>
                {coluna}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {dadosTabela.map((dado, index) => (
            <TableRow key={index}>
              <TableCell>
                <button
                  type="button"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "left",
                  }}
                  onClick={() => {
                    // Ao clicar, ajusta bounds do mapa e abre o popup do marcador
                    const novoFitBound: L.LatLngBoundsExpression = [
                      [-1.5113, -48.61914],
                      [dado.Latitude, dado.Longitude],
                    ];
                    setFitBounds(novoFitBound);
                    // Guarda referência para abrir o popup do marcador
                    //refsMarcador.current = dado;
                    //console.log(refsMarcador.current);
                    //refsMarcador.current.openPopup();
                  }}
                  value={
                    dado
                    /*
                    dado["Nome Escola"]
                      ? dado["Nome Escola"]
                      : dado["Tipo Unidade"] */
                  }
                >
                  {dado/*botaoConectividade === "Escola"
                    ? dado["Nome Escola"]
                    : dado["Tipo Unidade"]*/}
                </button>
              </TableCell>
              <TableCell>
                {botaoConectividade === "Escola"
                  ? dado.Dependência
                  : dado["Tipo Unidade"]}
              </TableCell>
              <TableCell>{dado.Internet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};