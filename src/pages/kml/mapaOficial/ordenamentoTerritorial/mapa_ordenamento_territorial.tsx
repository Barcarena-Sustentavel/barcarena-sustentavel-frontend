// Importações React: hooks e tipos usados no componente
import {
  FC,
  MouseEvent,
  useEffect,
  useState,
  useRef,
} from "react";
// Componentes do react-leaflet para renderizar o mapa e camadas
import Papa from "papaparse";
// Estilos locais para o mapa
import "../../mapa.css";
// Biblioteca para converter KML (XML) em GeoJSON
import * as toGeoJSON from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { GeoJSON } from "react-leaflet";
// Parser CSV usado para transformar o conteúdo CSV em objetos
export interface ChavesBooleanas {
    [key: string]: boolean;
  }
// Componente auxiliar que aplica `fitBounds` no mapa quando a prop `bounds` muda

// Componente principal do mapa (Map2)
// Recebe `dimensao` para decidir se mostra opções de Conectividade
const MapaOrdenamento: FC<{ dimensao: string | undefined }> = ({ dimensao }) => {
  // Faixa de cores e tamanho para quantidade de domicílios
  const domSub:Record<string, any>[] = [
      { label: 'até 10',       min: 0,   max: 10,   color: '#fde0dd' },
      { label: '11 a 25',      min: 11,  max: 25,   color: '#fcc5c0' },
      { label: '26 a 50',      min: 26,  max: 50,   color: '#fa9fb5' },
      { label: '51 a 100',     min: 51,  max: 100,  color: '#f768a1' },
      { label: '101 a 250',    min: 101, max: 250,  color: '#dd3497' },
      { label: '251 a 500',    min: 251, max: 500,  color: '#ae017e' },
      { label: 'mais de 500',  min: 501, max: Infinity, color: '#7a0177' },
      { label: 'não há informação', min: null, max: null, color: '#d9d9d9' }
  ]
  //Faixa de cores e tamanho para outros indicadores
  const outrosIndicadoresFaixas = [
      { label: '0',        min: 0,          max: 0,         color: '#ffffff' },
      { label: '1 a 5%',   min: 0.000001,   max: 5,         color: '#ffffbb' },
      { label: 'até 10%',  min: 5.000001,   max: 10,        color: '#f6cd6f' },
      { label: 'até 20%',  min: 10.000001,  max: 20,        color: '#ed934f' },
      { label: 'até 30%',  min: 20.000001,  max: 30,        color: '#dd4c32' },
      { label: 'até 50%',  min: 30.000001,  max: 50,        color: '#ac232d' },
      { label: 'até 80%',  min: 50.000001,  max: 80,        color: '#7d1e2a' },
      { label: '100%',     min: 80.000001,  max: 100.000001,color: '#7d1e2a' },
      { label: 'sem informação', min: null, max: null,      color: '#cbcbcb' }
    ]
  
  // indicadores disponíveis para ordenamento territorial
  const indicadores:Record<string, any> = {
    qtDom:{
      nome:"Quantidade de Domicílios",
      opcoes:[
        { valor: '', nome: '— Todos —' },
        { valor: '1', nome: 'Área urbana de alta densidade de edificações de cidade ou vila' },
        { valor: '2', nome: 'Área urbana de baixa densidade de edificações de cidade ou vila' },
        { valor: '3', nome: 'Núcleo urbano' },
        { valor: '5', nome: 'Aglomerado rural - Povoado' },
        { valor: '6', nome: 'Aglomerado rural - Núcleo rural' },
        { valor: '7', nome: 'Aglomerado rural - Lugarejo' },
        { valor: '8', nome: 'Área rural (exclusive aglomerados)' }
      ]
    },
     abstcAgua:{
      nome:"Abastecimento de Água",
      opcoes:[
        { valor: 'rede geral',   nome: 'Abastecimento de água pela rede geral' },
        { valor: 'poço profundo', nome: 'Poço profundo' },
        { valor: 'poço raso',     nome: 'Poço raso' },
        { valor: 'rios',          nome: 'Rios' },
        { valor: 'outra forma',   nome: 'Outra forma' }
      ]
     },
     banhRes:{
      nome:"Banheiro e Destinação de resíduos",
      opcoes:[
        { valor: 'com banheiro exclusivo',                         nome: 'Banheiro de uso exclusivo' },
        { valor: 'sem banheiro',                                   nome: 'Sem banheiro' },
        { valor: 'fossa séptica ou fossa filtro não ligada à rede', nome: 'Fossa séptica ou fossa filtro não ligada à rede' },
        { valor: 'esgoto por fossa rudimentar ou buraco',          nome: 'Esgoto por fossa rudimentar ou buraco' },
        { valor: 'esgoto do banheiro, sanitário ou buraco é vala', nome: 'Esgoto do banheiro, sanitário ou buraco é vala' },
        { valor: 'rio, lago, córrego ou mar',                      nome: 'Rio, lago, córrego ou mar' },
        { valor: 'outra forma',                                    nome: 'Outra forma' }
      ]
     },
     destLixo:{
      nome: "Destinação do Lixo",
      opcoes:[{ valor: 'coletado',                 nome: 'Coleta de lixo' },
      { valor: 'depositado em caçamba',    nome: 'Depositado em caçamba' },
      { valor: 'queimado',                 nome: 'Queimado' },
      { valor: 'enterrado',                nome: 'Enterrado' },
      { valor: 'jogado em terreno baldio', nome: 'Jogado em terreno baldio' },
      { valor: 'outro destino',            nome: 'Outro destino' }]
     }

  }
  //Assume o valor do primeiro parâmetro do indicador de ordenamento
  const [botaoOrdenamentoIndicadorChave, setBotaoOrdenamentoIndicadorChave] = useState<string>("qtDom");
  //Assume o valor do segundo parâmetro do indicador de ordenamento
  const [botaoOrdenamentoOpcoao, setBotaoOrdenamentoOpcao] = useState<string>("");
  //guarda os dados dos setores, o setor do kml, a opacidade e a cor
  const [geoJsonOrdenamento, setGeoJsonOrdenamento] = useState<Record<string, any>[]>([]);
  //guarda os dados do csv
  const [csvOrdenamento, setCsvOrdenamento] = useState<Record<string, string>[]>([]);
  // Carrega o geoJson dos indicadores
  // Estados que guardam os dados lidos dos CSVs (escolas e unidades de saúde)
  //Carrega o geoJson dos setores censitários
  const [geoJsonListSetores, setGeojsonListSetores] = useState<any[]>([]);  
  // Checkbox para ativar/desativar camadas de setores no mapa
  const [checkboxSetores, setCheckboxSetores] = useState<ChavesBooleanas>({
    Todos: false,
    Barcarena: false,
    Estradas: false,
    Ilhas: false,
    Murucupi: false,
    "Vila do Conde": false,
  });

  // Arquivos KML locais correspondentes aos setores e suas cores
  const setores: Record<string, any> = {
    Todos: "",
    Barcarena: 
      {kml:"barcarena_dissolved_lines.kml",color:'#7c3aed'},
    Estradas: 
      {kml:"estradas_dissolved_lines.kml", color:'#f59e0b'},
    Ilhas: 
      {kml:"ilhas_dissolved_lines.kml", color: '#2563eb'},
    Murucupi: 
      {kml:"murucupi_dissolved_lines.kml", color: '#10b981'},
    "Vila do Conde": 
      {kml:"viladoconde_dissolved_lines.kml", color: '#ef4444'},
  };
  
  //Carrega os kmls relacionados aos domicílios conforme o tipo selecionado
  const carregarDomiciliosOrdenamento = (tipo: string) => {
    //Faz uma copia do array de setores para modificar as cores
    const setoresModificar: Record<string, any>[] = geoJsonOrdenamento
    //Carrega o tipo selecionado
    let newTipo:string = ""
    //Verifica se será feita a carregação de todos ou não
    if (tipo !== "") {
      newTipo = `Tipo ${tipo}`
    }
    for (let i = 0; i < setoresModificar.length; i++) {
      //procura no csv o setor correspondente a partir do tipo
      if (csvOrdenamento[i]['Tipo'] === newTipo || newTipo === "") {
        //quantidade de domicilios do setor
        const quantidade = parseInt(csvOrdenamento[i]['Domicílios'] || "0")
        for (let j = 0; j < domSub.length; j++) {
          //acha a cor baseada na quantidade e no intervalo e ajusta a opacidade
          if (quantidade >= domSub[j]['min'] && quantidade <= domSub[j]['max']) {
              const cor = domSub[j]['color'];
              const opacidade = quantidade / 500;
              setoresModificar[i]['cor'] = cor;
              setoresModificar[i]['opacidade'] = opacidade;
          }
        }
     }else{
        setoresModificar[i]['cor'] = '';
        setoresModificar[i]['opacidade'] = 0;
     }
    }
    setGeoJsonOrdenamento(setoresModificar);
  }

  const carregarOutrosIndicadores = (coluna: string) => {
    //Faz uma copia do array de setores para modificar as cores
    const setoresModificar: Record<string, any>[] = geoJsonOrdenamento
    //Verifica se o tipo é todos ou espcífico
    for (let i = 0; i < setoresModificar.length; i++) {
      //procura no csv o setor correspondente a partir do tipo
        //quantidade de domicilios do setor
        const quantidade = parseInt(csvOrdenamento[i][coluna] || "0")
        for (let j = 0; j < outrosIndicadoresFaixas.length; j++) {
          //acha a cor baseada na quantidade e no intervalo e ajusta a opacidade
          if (quantidade >= outrosIndicadoresFaixas[j]['min']! && quantidade <= outrosIndicadoresFaixas[j]['max']!) {
              const cor = outrosIndicadoresFaixas[j]['color'];
              const opacidade = quantidade / 500;
              setoresModificar[i]['cor'] = cor;
              setoresModificar[i]['opacidade'] = opacidade;
          }
        }
    }
    setGeoJsonOrdenamento(setoresModificar);
  }
  const CarregarCSVLocal = async () => {
    // O caminho "/" aponta para a pasta public do seu projeto
    //const setoresOrdenamento: Record<string, any>[] = [];
    const csv:Record<string, string>[] = []
    Papa.parse("/OrdenamentoTerritorial/dados_setores.csv", {
      download: true,
      header: true,
      complete: async (results) => {
        //console.log("Dados carregados do arquivo local:", results.data);
        results.data.forEach((element) => {
            const converElement = element as Record<string, string>;
            //const elementValue = converElement['setor'] 
            //setoresOrdenamento.push({'setor': elementValue, 'geoJson':null ,'opacidade': 0, "cor":""});
            csv.push(converElement);
        });
        //console.log(setoresOrdenamento);
        //setGeoJsonOrdenamento(setoresOrdenamento)
        //console.log(geoJsonOrdenamento)
        setCsvOrdenamento(csv);
      },
      error: (error) => {
        console.error("Erro ao acessar o arquivo:", error);
      }
    });
    console.log(geoJsonOrdenamento)
    await renderizarSetoresOrdenamento()
    carregarIndicadoresOrdenamento()
  }
  //Renderiza cada setor de ordenamento territorial a partir do kml
  const renderizarSetoresOrdenamento = async () => {
        const paths:any[] = [];
        geoJsonOrdenamento.forEach((obj: Record<string, string>) => {
          const kmlUrl = `/OrdenamentoTerritorial/distritos/${obj['setor']!}.kml`;
          paths.push(kmlUrl);
        })      
        try {
          const copiaGeoJsonOrdenamento = geoJsonOrdenamento // Cria uma cópia do array original
          const response = await Promise.all(
            paths.map(async (path, index) => {
              const fetched = await fetch(path);
               if (!fetched.ok) {
                  throw new Error(`HTTP error! status: ${fetched.status}`);
                }
                const kmlText = await fetched.text();
                const parser = new DOMParser();
                const kmlXml = parser.parseFromString(kmlText, "text/xml");
                const parseError = kmlXml.getElementsByTagName("parsererror");
                if (parseError.length > 0) {
                  console.error("XML Parse Error:", parseError[0].textContent);
                  throw new Error("Failed to parse KML as XML");
                }
                // Aqui você pode usar o kmlXml com toGeoJSON ou outro parser
                //console.log(kmlXml)
                const geojson = toGeoJSON.kml(kmlXml);
                copiaGeoJsonOrdenamento[index]['geoJson'] = geojson;
                //return geojson;
            }));
          // Converte o KML para GeoJSON e adiciona/remove da lista de camadas
          //setGeoJsonOrdenamento(response);
          setGeoJsonOrdenamento(copiaGeoJsonOrdenamento);

        } catch (error) {
          console.error("Erro ao carregar KML:", error);
        }
  }
  //Mudar o estado do mapa conforme o checkbox de setor selecionado
  const handleChangeSetores = (item: keyof ChavesBooleanas): void => {
    //Se o item for "Todos", marca/desmarca todos os setores
    if (item === "Todos") {
      const todos: boolean = !checkboxSetores.Todos;
      setCheckboxSetores((prevState) => ({
        ...prevState,
        Todos: todos,
        Barcarena: todos,
        Estradas: todos,
        Ilhas: todos,
        Murucupi: todos,
        "Vila do Conde": todos,
      }));
      // Ao marcar/desmarcar 'Todos', atualiza a camada de cada setor
      Object.entries(checkboxSetores).forEach(([key]) => {
        setGeoJsonToKmlSetores(key);
      });
    } else {
      setCheckboxSetores((prevState) => ({
        ...prevState,
        [item]: !prevState[item],
      }));
      for (const key in checkboxSetores) {
        if (checkboxSetores[key] === false) {
          setCheckboxSetores((prev) => ({
            ...prev,
            Todos: false,
          }));
          break;
        }
      }
      setGeoJsonToKmlSetores(item.toString());
    }
  };
  // Carrega o KML correspondente ao setor e atualiza a camada no mapa
  const setGeoJsonToKmlSetores = async (item: string) => {
    const kmlUrl = item === "Todos" ? "" : `/setoresBarcarena/${setores[item]['kml']}`;
    if (kmlUrl === "") {
      return;
    }
    try {
      const response = await fetch(kmlUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Converte o KML para GeoJSON e adiciona/remove da lista de camadas
      const kmlText = await response.text();
      const parser = new DOMParser();
      const kmlXml = parser.parseFromString(kmlText, "text/xml");
      const parseError = kmlXml.getElementsByTagName("parsererror");
      if (parseError.length > 0) {
        console.error("XML Parse Error:", parseError[0].textContent);
        throw new Error("Failed to parse KML as XML");
      }
      // Aqui você pode usar o kmlXml com toGeoJSON ou outro parser
      const geojson = toGeoJSON.kml(kmlXml);
      if (checkboxSetores[item.toString()] === false) {
        // Se estava desmarcado, adiciona a camada ao mapa
        setGeojsonListSetores((prev) => [...prev, {data: geojson, color:setores[item]['color']}]);
      } else {
        // Se estava marcado, remove a camada correspondente
        setGeojsonListSetores((prev) =>
          prev.filter(
            (g) =>
              g.features[0]?.properties?.name !==
              geojson.features[0]?.properties?.name,
          ),
        );
      }
    } catch (error) {
      console.error("Erro ao carregar KML:", error);
    }
  };
  const carregarIndicadoresOrdenamento = () => {
     if (botaoOrdenamentoIndicadorChave === "qtDom"){
        carregarDomiciliosOrdenamento(botaoOrdenamentoOpcoao);
        //console.log(geoJsonOrdenamento)
    }else{
      carregarOutrosIndicadores(botaoOrdenamentoOpcoao);
    }
  }
  // useEffect inicial: define valores padrão e carrega todos os setores
  useEffect(() => {
    handleChangeSetores("Todos");
  }, []);
  useEffect(() => {
    console.log("Carregando CSV local...");
    CarregarCSVLocal();
  }, []);
  useEffect(() => {
    console.log(csvOrdenamento)
    const setoresOrdenamento: Record<string, any>[] = [];
    csvOrdenamento.map((element) => {
      const converElement = element as Record<string, string>;
      const elementValue = converElement['setor'] 
      setoresOrdenamento.push({'setor': elementValue, 'geoJson':null ,'opacidade': 0, "cor":""});
    })
    setGeoJsonOrdenamento(setoresOrdenamento)
  },[csvOrdenamento])
  useEffect(() => {
    console.log(geoJsonOrdenamento)
    renderizarSetoresOrdenamento()
  },[])
  //useEffect(() =>{
  //  carregarIndicadoresOrdenamento()
  //},[])
  return (<div>
            <span className="tecnologiasEOperadoras">
              <div className="operadoras">
                {/*Lista as operadoras que podem ser mapeadas pela cobertura em formato de checkbox*/}
                <label>Setores:</label>
                {Object.entries(setores).map(([key]) => {
                  return (
                    <label>
                      <input
                        type="checkbox"
                        name="operadoras"
                        checked={checkboxSetores[key]}
                        onChange={(e) => handleChangeSetores(key)}
                      />
                      {key}
                    </label>
                  );
                })}
              </div>
            </span>
     <div> 
      <label>Indicador</label>
        <select name="indicador" onChange={(e) => {setBotaoOrdenamentoIndicadorChave(e.target.value)
                                                    setBotaoOrdenamentoOpcao(indicadores[botaoOrdenamentoIndicadorChave]['opcoes'][0]['valor'])
                                                    carregarIndicadoresOrdenamento()
                                                    renderizarSetoresOrdenamento()}}> 
      {Object.entries(indicadores).map(([key, _]) => {
        return( 
          <option value={key} >
            {indicadores[key]['nome']}
          </option>
          
        )})}
        </select>
      <select name="opcao" onChange={(e) => {setBotaoOrdenamentoOpcao(e.target.value)
                                              carregarIndicadoresOrdenamento()
                                              renderizarSetoresOrdenamento()}}>

      {Object.entries(indicadores[`${botaoOrdenamentoIndicadorChave}`]['opcoes']).map(([key,_]) => {
        const optionValor:string = indicadores[`${botaoOrdenamentoIndicadorChave}`]['opcoes'][key]['valor'] 
        const optionNome:string = indicadores[`${botaoOrdenamentoIndicadorChave}`]['opcoes'][key]['nome']
        return(
          <option value={optionValor} >
            {optionNome}
          </option>)
      })}
      </select>
          <MapContainer
              style={{ height: "500px", width: "800px", margin: "0 auto" }}
              center={[-1.5113, -48.61914]}
              zoom={10}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            {geoJsonListSetores.map((geojson, index) => (
              <GeoJSON key={index} data={geojson.data}  style={{color:geojson.color, weight: 1.5}}/>
            ))}
            {/* {geoJsonOrdenamento.map((geojson, index) => 
               <GeoJSON key={index} data={geojson.geoJson} style={{color:geojson[index]["cor"],
                                                                 fillColor:geojson[index]["cor"], 
                                                                 fillOpacity:geojson[index]["opacidade"],
                                                                 weight: 0.5}} />
            )} */}
            </MapContainer>
            
        </div>
        </div>);
}


export default MapaOrdenamento;
