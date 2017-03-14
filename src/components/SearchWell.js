import React from "react";

export function SearchWell({
  onChangeHandler,
  placeholder
}) {
  return (
    <div className="well">
      <h4>Search</h4>
      <div className="input-group">
        <input type="text" className="form-control" placeholder={placeholder} onChange={onChangeHandler} />
        <span style={{ position: "initial" }} className="input-group-addon glyphicon glyphicon-search" />
      </div>
    </div>
  );
}

SearchWell.propTypes = {
  onChangeHandler: React.PropTypes.func,
  placeholder: React.PropTypes.string
};