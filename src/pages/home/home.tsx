import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "@assets/styles/index.css";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import ImageCarousel from "./components/carousel/carousel.tsx";
import {DimensoesSection} from "./components/dimensoesSection/dimensoesSection.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import Banner from "./components/banner/banner.tsx";

import SlideArtigos from "./components/slideArtigos/slideArtigosl.tsx";
import ConhecaProjetoSection from "./components/conhecaProjetoSection/conhecaProjetoSection.tsx";
import BarraParceiros from "../../components/layout/barraParceiros/BarraParceiros.tsx";
import { Carousel } from "react-bootstrap";
import RelatoriosCarousel from "./components/carrossel/RelatoriosCarousel.tsx";
import "./home.css"
const Home: FC = () => {
  const navigate = useNavigate();
  const handleClick = (dimensao: string) => {
    navigate(`/${dimensao}/`);
  };
  return (
    <>
      <NavbarComponent />
      <Banner/>
      <ConhecaProjetoSection/>
      <DimensoesSection />
      {/* <RelatoriosCarousel/> */}
      <BarraParceiros/>
      <Footer />
    </>
  );
};

export default Home;
