import PropTypes from "prop-types";
import "./SearchResult.css";

const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={() => alert(`Click on ${result.name}`)}
    >
      {result.name}
    </div>
  );
};

SearchResult.propTypes = {
    result: PropTypes.object,
}

export default SearchResult;
