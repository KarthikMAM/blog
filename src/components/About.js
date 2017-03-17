import React from "react";
import { Link } from "react-router";

import { Social } from "./Social";
import { ButtonWell } from "./ButtonWell";

export function About({ about }) {
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="center">
          {/*<img src={about.pic} alt={about.name} className="pic" />*/}

          {about.desc.map((item, index) => <p dangerouslySetInnerHTML={{ __html: item }} key={index} />)}

          <br />

          <div className="list-group">
            <h4 className="list-group-heading">Projects</h4>
            {about.projects.map(item => <Link key={item.name} to={item.url} className="list-group-item">{item.name}</Link>)}
          </div>
        </div>
      </div>

      <div className="col-md-4">

        <ButtonWell buttons={about.portfolio} title="Portfolio" />
        <ButtonWell buttons={about.skills} title="Skills" />

        <div className="well center">
          <Social items={about.social} />
        </div>
      </div>
    </div>
  );
}

About.propTypes = {
  about: React.PropTypes.shape({
    name: React.PropTypes.string,
    pic: React.PropTypes.string,
    desc: React.PropTypes.array,
    portfolio: React.PropTypes.array,
    skills: React.PropTypes.array,
    projects: React.PropTypes.array,
    social: React.PropTypes.array
  })
};