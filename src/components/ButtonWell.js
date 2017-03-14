import React from "react";

export function ButtonWell({
  buttons,
  title
}) {
  return (buttons === undefined || buttons.length === 0 ? null : (
    <div className="well">
      <h4>{title}</h4>
      {buttons.map(item => <a key={item.name} className="btn btn-primary" href={item.url}>{item.name}</a>)}
    </div>
  ));
}

ButtonWell.propTypes = {
  buttons: React.PropTypes.array.isRequired,
  title: React.PropTypes.string
};