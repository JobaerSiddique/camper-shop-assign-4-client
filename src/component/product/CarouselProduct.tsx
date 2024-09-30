// src/components/CarouselProduct.tsx
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


interface CarouselProductProps {
  images: string[]; 
}

const CarouselProduct: React.FC<CarouselProductProps> = ({ images }) => {
  return (
    <div>
      <Carousel>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Product image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselProduct;
