import React from "react";

import {Social} from "./Social";

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
        {["Proects", "Blog", "About", "Contact"].map(menu => <a className="btn btn-default" key={menu} href="#">{menu}</a>)}
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