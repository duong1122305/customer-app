import PropTypes from "prop-types";
import "./SearchResult.css";

const SearchResult = ({ results }) => {
  return (
    <div
      className="search-result"
      onClick={() => alert(`Click on ${results.name}`)}
    >
      {results.name}
    </div>
  );
};

SearchResult.propTypes = {
    results: PropTypes.object,
}

export default SearchResult;
