import PropTypes from "prop-types";
import "./ButtonCustom.css";

const ButtonCustome = ({ content, type, style }) => {
  return (
    <>
      <button className="custom-btn" type={type} style={style}>
        {content}
      </button>
    </>
  );
};

ButtonCustome.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default ButtonCustome;
