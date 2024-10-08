import { useState } from "react";
import "./StarRating.css";
import PropTypes from "prop-types";

const StarRating = ({ getStar }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                getStar(ratingValue);
              }}
            />
            <span
              className={`star ${
                ratingValue <= (hover || rating) ? "on" : "off"
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  getStar: PropTypes.func,
};

export default StarRating;
