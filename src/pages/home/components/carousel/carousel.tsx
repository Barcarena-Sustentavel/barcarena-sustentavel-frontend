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
import DJI_0540 from "@assets/images/carousel/DJI_0540.jpg";
import DJI_0541 from "@assets/images/carousel/DJI_0541.jpg";
import DJI_0542 from "@assets/images/carousel/DJI_0542.jpg";
import DJI_0543 from "@assets/images/carousel/DJI_0543.jpg";
import DJI_0544 from "@assets/images/carousel/DJI_0544.jpg";
import DJI_0545 from "@assets/images/carousel/DJI_0545.jpg";
import DJI_0546 from "@assets/images/carousel/DJI_0546.jpg";
import DJI_0547 from "@assets/images/carousel/DJI_0547.jpg";
import DJI_0548 from "@assets/images/carousel/DJI_0548.jpg";
import DJI_0550 from "@assets/images/carousel/DJI_0550.jpg";
import DJI_0551 from "@assets/images/carousel/DJI_0551.jpg";
import DJI_0552 from "@assets/images/carousel/DJI_0552.jpg";
import DJI_0553 from "@assets/images/carousel/DJI_0553.jpg";
import DJI_0554 from "@assets/images/carousel/DJI_0554.jpg";
import DJI_0555 from "@assets/images/carousel/DJI_0555.jpg";
import DJI_0556 from "@assets/images/carousel/DJI_0556.jpg";
import DJI_0557 from "@assets/images/carousel/DJI_0557.jpg";
import DJI_0559 from "@assets/images/carousel/DJI_0559.jpg";
import DJI_0560 from "@assets/images/carousel/DJI_0560.jpg";
import DJI_0561 from "@assets/images/carousel/DJI_0561.jpg";
import DJI_0562 from "@assets/images/carousel/DJI_0562.jpg";
import DJI_0563 from "@assets/images/carousel/DJI_0563.jpg";
import DJI_0564 from "@assets/images/carousel/DJI_0564.jpg";
import DJI_0565 from "@assets/images/carousel/DJI_0565.jpg";
import DJI_0566 from "@assets/images/carousel/DJI_0566.jpg";
import DJI_0567 from "@assets/images/carousel/DJI_0567.jpg";
import DJI_0568 from "@assets/images/carousel/DJI_0568.jpg";
import DJI_0569 from "@assets/images/carousel/DJI_0569.jpg";
import DJI_0570 from "@assets/images/carousel/DJI_0570.jpg";
import DJI_0571 from "@assets/images/carousel/DJI_0571.jpg";
import DJI_0572 from "@assets/images/carousel/DJI_0572.jpg";
import DJI_0573 from "@assets/images/carousel/DJI_0573.jpg";

const ImageCarousel: FC = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const images = [
    DJI_0540,
    DJI_0541,
    DJI_0542,
    DJI_0543,
    DJI_0544,
    DJI_0545,
    DJI_0546,
    DJI_0547,
    DJI_0548,
    DJI_0550,
    DJI_0551,
    DJI_0552,
    DJI_0553,
    DJI_0554,
    DJI_0555,
    DJI_0556,
    DJI_0557,
    DJI_0559,
    DJI_0560,
    DJI_0561,
    DJI_0562,
    DJI_0563,
    DJI_0564,
    DJI_0565,
    DJI_0566,
    DJI_0567,
    DJI_0568,
    DJI_0569,
    DJI_0570,
    DJI_0571,
    DJI_0572,
    DJI_0573,
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
