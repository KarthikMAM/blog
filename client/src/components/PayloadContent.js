import React from "react";
import { Link } from "react-router";

export function PayloadContent({ title, createdAt, desc, content }) {
  PayloadContent.propTypes = {
    title: React.PropTypes.string,
    createdAt: React.PropTypes.string,
    desc: React.PropTypes.string,
    content: React.PropTypes.string
  };

  return (
    <div>
      <div className="page-header">
        <h1> {title} </h1>
        <p className="lead"> by <Link to="/">Karthik M A M</Link></p>
      </div>
      <p><span className="glyphicon glyphicon-time"></span>{" " + createdAt}</p>
      <hr />
      <div className="content">
        <div>
          <h4> Description </h4>
          <p> {desc} </p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}