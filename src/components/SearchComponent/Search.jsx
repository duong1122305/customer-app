import { useState, useEffect } from "react";
import { Modal, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import "./Search.css";

const Search = (props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Hàm lấy dữ liệu từ API
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7019/api/SinhViens");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSuggestions(data); // Cập nhật danh sách gợi ý từ dữ liệu API
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Gọi hàm lấy dữ liệu khi component được mount

    // return cleanup function in case component unmounted
    return () => {};
  }, []);

  // Định nghĩa các lựa chọn cho auto suggest
  const getSuggestions = (inputValue) => {
    // Trong ví dụ này, bạn có thể thay đổi logic để lấy dữ liệu từ API hoặc từ một nguồn dữ liệu khác
    console.log(suggestions);
    return suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // Xử lý sự kiện thay đổi giá trị của ô input
  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setSuggestions(getSuggestions(newValue));
  };

  // Đề xuất các lựa chọn dựa trên giá trị nhập vào
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Xóa các lựa chọn khi ô input rỗng
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Render các lựa chọn của auto suggest
  const renderSuggestion = (suggestion) => (
    <div className="custom-suggestion">{suggestion.name}</div>
  );

  // Định dạng giá trị được chọn
  const getSuggestionValue = (suggestion) => suggestion.name;

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton className="search">
          <Modal.Title id="contained-modal-title-vcenter">Tìm kiếm</Modal.Title>
        </Modal.Header>
        <Modal.Body className="search">
          <Form>
            <InputGroup className="mb-3">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  placeholder: "Nhập tên dịch vụ bạn muốn tìm",
                  value,
                  onChange: onChange,
                  className: "input-search",
                  style: {
                    width: "760px",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    color: "#fff",
                  },
                  onFocus: () => {
                    onSuggestionsFetchRequested({ value });
                  }
                }}
                theme={{ suggestionsContainer: "suggestions-container" }}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

Search.propTypes = {
  onHide: PropTypes.func,
};

export default Search;
