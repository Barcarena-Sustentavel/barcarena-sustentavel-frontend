import { FC, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/carousel.css';
import image1 from "../../../assets/images/carousel/Barcarena1.jpg";
import image2 from "../../../assets/images/carousel/Barcarena2.webp";
import image3 from "../../../assets/images/carousel/praiaDoCaripi.jpg";
import grafismo from "../../../assets/images/grafismos/grafismo4.png";
const ImageCarousel: FC = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const images = [image1, image2, image3];

  return (
    <div id="carouselExampleControls">
      <div className="backgroundCarousel"></div>
      <Carousel 
        activeIndex={index} 
        onSelect={handleSelect}
        interval={5000}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="w-100"
              src={image}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
