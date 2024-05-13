import PropTypes from 'prop-types'
import "./SearchResultList.css";
import SearchResult from "./SearchResult";

const SearchResultList = ({ results, className }) => {
  return (
    <div className="results-list">
      {results.map((results, id) => {
        return <SearchResult results={results} key={id}/>;
      })}
    </div>
  );
};

SearchResultList.propTypes = {
    results: PropTypes.array
}

export default SearchResultList;
