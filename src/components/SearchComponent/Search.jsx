import { useState } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Search.css";
import SearchResult from "./SearchResult";

const Search = (props) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        props.setresult(results);
      });
  };


  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "transparent",
            backgroundImage: "linear-gradient(90deg, #015aad 0%, #05a955 100%)",
            color: "#fff",
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">Tìm kiếm</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "transparent",
            backgroundImage: "linear-gradient(90deg, #015aad 0%, #05a955 100%)",
            color: "#fff",
          }}
        >
          <div className="input-wrapper">
            <input
              autoFocus={true}
              placeholder="Tìm dịch vụ bạn cần ....."
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
            <div className="results-list">
              {props.results.map((results, id) => {
                return <SearchResult results={results} key={id} />;
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

Search.propTypes = {
  setresult: PropTypes.func,
  results: PropTypes.array,
};

export default Search;
