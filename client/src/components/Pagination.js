import React from "react";
import { Link } from "react-router";

export function Pagination({ location, currentPage = 1, pageCount = 1 }) {
  Pagination.propTypes = {
    location: React.PropTypes.object,
    currentPage: React.PropTypes.number,
    pageCount: React.PropTypes.number
  };
  
  return (
    <div className="pagination">
      <ul className="pagination">
        {
          currentPage !== 1 ?
            <li><Link to={{ ...location, query: { page: currentPage - 1 } }}>← Previous</Link></li> :
            <li className="disabled"><Link>← Previous</Link></li>
        }

        {
          [...Array(pageCount).keys()].map(index => (
            <li key={index + 1} className={currentPage === index + 1 ? "active" : ""}>
              <Link to={{ ...location, query: { page: index + 1 } }}>{index + 1}</Link>
            </li>
          ))
        }

        {
          currentPage !== pageCount ?
            <li><Link to={{ ...location, query: { page: currentPage + 1 } }}>Next →</Link></li> :
            <li className="disabled"><Link>Next →</Link></li>
        }
      </ul>
    </div>
  );
}