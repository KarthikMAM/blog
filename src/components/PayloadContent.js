import React from "react";

export function PayloadContent({
  title,
  createdAt,
  desc,
  content
}) {
  return (
    <div>
      <div className="page-header">
        <h1> {title} </h1>
        <p className="lead"> by <a href="/">Karthik M A M</a></p>
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

PayloadContent.propTypes = {
  title: React.PropTypes.string,
  createdAt: React.PropTypes.string,
  desc: React.PropTypes.string,
  content: React.PropTypes.string
};