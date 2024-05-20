import "./ButtonCustom.css";
import PropTypes from 'prop-types';

const ButtonCustom = ({ content, type }) => {
  return (
    <>
      <button className="btn-custom" type={type}>{content}</button>
    </>
  );
};

ButtonCustom.propTypes = {
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default ButtonCustom;
