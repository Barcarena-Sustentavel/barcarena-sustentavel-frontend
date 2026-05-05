import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "@assets/styles/index.css";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import {DimensoesSection} from "./components/dimensoesSection/dimensoesSection.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import Banner from "./components/banner/banner.tsx";
import "./components/conhecaProjetoSection/style.css"
import ConhecaProjetoSection from "./components/conhecaProjetoSection/conhecaProjetoSection.tsx";
import BarraParceiros from "../../components/layout/barraParceiros/BarraParceiros.tsx";
import "./style.css"
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
      <BarraParceiros/>
      <Footer />
    </>
  );
};

export default Home;
