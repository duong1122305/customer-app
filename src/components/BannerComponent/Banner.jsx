import { Carousel, CarouselItem } from "react-bootstrap";

const bannerArr = [
  "/src/assets/image/banner1.jpg",
  "/src/assets/image/banner2.jpg",
  "/src/assets/image/banner3.jpg",
];

const Banner = () => {
  return (
    <div>
      <Carousel interval={5000}>
        {bannerArr.map((image, index) => (
          <CarouselItem key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Banner ${index + 1}`}
              style={{
                height: "500px",
              }}
            />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
