import React from "react";
import { Link } from "react-router";

export function ButtonWell({
  buttons,
  title
}) {
  return (buttons === undefined || buttons.length === 0 ? null : (
    <div className="well">
      <h4>{title}</h4>
      {buttons.map(item => React.createElement(
        item.url.includes("http") ? "a" : Link,
        {
          key: item.name,
          className: "btn btn-primary",
          to: item.url,
          href: item.url,
          children: item.name
        }
      ))}
    </div>
  ));
}

ButtonWell.propTypes = {
  buttons: React.PropTypes.array.isRequired,
  title: React.PropTypes.string
};