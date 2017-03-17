import React from "react";

export function SearchWell({
  onChangeHandler,
  onClickHandler,
  searchResults,
  placeholder,
  q
}) {
  return (
    <div className="well">
      <h4>Search</h4>
      <div className="input-group">
        <input onKeyPress={e => e.key == "Enter" && onClickHandler(e, q.value)} ref={input => q = input} type="text" className="form-control" autoComplete={false} placeholder={placeholder} onChange={onChangeHandler} list="suggestions" />
        <datalist id="suggestions">
          {searchResults && searchResults.map(item => <option value={item} key={item} />)}
        </datalist>
        <span onClick={e => onClickHandler(e, q.value)} style={{ position: "initial" }} className="input-group-addon glyphicon glyphicon-search" />
      </div>
    </div>
  );
}

SearchWell.propTypes = {
  q: React.PropTypes.string,
  searchResults: React.PropTypes.array,
  onChangeHandler: React.PropTypes.func,
  onClickHandler: React.PropTypes.func,
  placeholder: React.PropTypes.string
};