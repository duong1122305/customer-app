import { useEffect, useState } from "react";
import {
  Modal,
  InputGroup,
  Spinner,
  CloseButton,
  Form
} from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import "./Search.css";
import SearchResult from "./SearchResult";

const Search = (props) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input.length === 0) {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://localhost:7019/api/SinhViens/get-by-name/${input}`
        );

        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        setResults([]);
        console.log(error);
      }
      setLoading(false);
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  const handleClear = () => {
    setInput("");
    setResults([]);
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
          <div>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <InputGroup.Text>
                {loading ? (
                  <Spinner animation="border" size="sm" variant="primary"/>
                ) : (
                  input && (
                    <CloseButton onClick={handleClear}/>
                  )
                )}
              </InputGroup.Text>
            </InputGroup>
            <div className="results-list">
              {results.map((result, id) => {
                return <SearchResult result={result} key={id} />;
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

Search.propTypes = {
  setResult: PropTypes.func,
  results: PropTypes.array,
};

export default Search;
