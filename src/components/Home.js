import React from "react";
import { Link } from "react-router";

import { Social } from "./Social";

export function Home({
  name,
  pic,
  social
}) {
  return (
    <div className="middle center" style={{ alignContent: "center" }}>
      <h3> {name} </h3>
      <img src={pic} alt={name} className="pic" />
      <div className="navbar nav-pills">
        {[
          "Projects",
          "Blog",
          "About",
          "Contact"
        ].map(menu => <Link className="btn btn-default" key={menu} to={menu.toLowerCase()}>{menu}</Link>)}
      </div>
      <Social items={social} />
    </div>
  );
}

Home.propTypes = {
  name: React.PropTypes.string,
  pic: React.PropTypes.string,
  social: React.PropTypes.array
};