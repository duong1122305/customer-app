import { Carousel, CarouselItem } from "react-bootstrap";
import PropTypes from 'prop-types';

const bannerArr = [
  "/assets/image/banner5.png",
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
                height: "auto",
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
