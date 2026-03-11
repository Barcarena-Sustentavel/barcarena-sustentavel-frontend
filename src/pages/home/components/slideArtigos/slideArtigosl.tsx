import { FC,useEffect, useState} from "react";
import { Carousel, Button } from 'react-bootstrap';
import bannerPublicacoes from '../../../../assets/images/carousel/bannerPublicacoes.jpg'
import "./slideArtigos.css";
import api from "../../../../api.tsx";
const SlideArtigos:FC<{dimensoesList: Record<string,any>}> = (dimensoesList) => {
const dimensoesArray = Object.keys(dimensoesList.dimensoesList);
//console.log('dimensoesArray',dimensoesArray)
const [slideArtigos,setSlideArtigos] = useState<any[]>([])

useEffect(() => {
if (slideArtigos.length > 0) {
  return
}
const novoSlideArtigos:any[] = []
let umSlide:any[] = []
for (let i = 0; i < dimensoesArray.length; i+=3) {
  umSlide.push({
    categoria: dimensoesArray[i],
    nome: `Relatório sobre ${dimensoesArray[i]}`
  })
  umSlide.push({
    categoria: dimensoesArray[i+1],
    nome: `Relatório sobre ${dimensoesArray[i+1]}`
  })
  umSlide.push({
    categoria: dimensoesArray[i+2],
    nome: `Relatório sobre ${dimensoesArray[i+2]}`
  })
  novoSlideArtigos.push(umSlide)
  umSlide = []
}
setSlideArtigos(novoSlideArtigos)
},[dimensoesArray])
//console.log('slideArtigos', slideArtigos)
return (<div id="publicacoes">
  <div  className="text-center mb-4">
        <h3>PUBLICAÇÕES RECENTES</h3>
        <h1>Relatórios & Pesquisas</h1>
        <p>Baixe um artigo curto sobre uma das dimensões</p>
      </div>
    <div id='publicacoesBackGround' style={{
        backgroundImage: `url(${bannerPublicacoes})`
      }}>
        <div style={{zIndex: 1, width: '100%'}}>
        <Carousel fade interval={5000} className="shadow-sm">
              {slideArtigos.map((artigos,index) => (
                <Carousel.Item>
                  <div style={{display:'flex', justifyContent:'center', gap:'20px', padding:'20px'}}>
                    <div className="publicacoes-carousel">
                    <p>{artigos[0].categoria}</p>
                    <h3>{artigos[0].nome}</h3>
                    <Button variant="primary" size="sm">Baixar pdf</Button>
                    </div>
                   <div className="publicacoes-carousel">
                    <p>{artigos[1].categoria}</p>
                    <h3>{artigos[1].nome}</h3>
                    <Button variant="primary" size="sm">Baixar pdf</Button>
                    </div>
                   <div className="publicacoes-carousel">
                    <p>{artigos[2].categoria}</p>
                    <h3>{artigos[2].nome}</h3>
                    <Button variant="primary" size="sm">Baixar pdf</Button>
                    </div>
                  </div>
                </Carousel.Item>
                
              ))}
            </Carousel>
        </div>
    </div>
    </div>
  );}
export default SlideArtigos;