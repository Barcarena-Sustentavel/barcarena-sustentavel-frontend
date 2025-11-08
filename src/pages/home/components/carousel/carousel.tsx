import { FC, useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carousel.css";
//import image1 from "@assets/images/carousel/Banner Barcarena/1.png";
//import image2 from "@assets/images/carousel/Banner Barcarena/2.png";
//import image3 from "@assets/images/carousel/Banner Barcarena/3.png";
//import image4 from "@assets/images/carousel/Banner Barcarena/4.png";
//import image5 from "@assets/images/carousel/Banner Barcarena/5.png";
//import image6 from "@assets/images/carousel/Banner Barcarena/6.png";
// import DJI_0547 from "@assets/images/carousel/DJI_0547.jpg";
// import DJI_0548 from "@assets/images/carousel/DJI_0548.jpg";
// import DJI_0550 from "@assets/images/carousel/DJI_0550.jpg";
// import DJI_0551 from "@assets/images/carousel/DJI_0551.jpg";
// import DJI_0552 from "@assets/images/carousel/DJI_0552.jpg";
// import DJI_0553 from "@assets/images/carousel/DJI_0553.jpg";
// import DJI_0554 from "@assets/images/carousel/DJI_0554.jpg";
// import DJI_0555 from "@assets/images/carousel/DJI_0555.jpg";
import image1 from "@assets/images/carousel/Novo Banner Barcarena/Banner Barcarena - 1.png";
import image2 from "@assets/images/carousel/Novo Banner Barcarena/Banner Barcarena - 2.png";
import image3 from "@assets/images/carousel/Novo Banner Barcarena/Banner Barcarena - 3.png";
import image4 from "@assets/images/carousel/Novo Banner Barcarena/Banner Barcarena - 4.png";
import image5 from "@assets/images/carousel/Novo Banner Barcarena/Banner Barcarena - 5.png";

const ImageCarousel: FC = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5
  ];
  return (
    <div id="carouselExampleControls">
      <div className="backgroundCarousel"></div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={5000}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img className="w-100" src={image} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
