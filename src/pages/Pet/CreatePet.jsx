import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const CreatePet = ({ show }) => {
  return (
    <div>
      <Modal show={show} centered>Pet</Modal>
    </div>
  );
};

CreatePet.propTypes = {
  show: PropTypes.bool,
};

export default CreatePet;
