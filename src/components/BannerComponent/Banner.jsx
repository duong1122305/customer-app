import { Carousel, CarouselItem } from "react-bootstrap";
import PropTypes from 'prop-types';

const bannerArr = [
  "/src/assets/image/banner1.jpg",
  "/src/assets/image/banner2.jpg",
  "/src/assets/image/banner3.jpg",
];

const Banner = (props) => {
  return (
    <div className={props.className}>
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

Banner.propTypes = {
  className: PropTypes.string
}

export default Banner;
