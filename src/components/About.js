import React from 'react';

import { Social } from './Social';

export function About({
  name,
  pic,
  desc,
  portfolio,
  skills,
  projects,
  social
}) {
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="center">
          <img src={pic} alt={name} className="pic" />

          {desc.map((item, index) => <p dangerouslySetInnerHTML={{ __html: item }} key={index} />)}

          <div className="list-group">
            <h4 className="list-group-heading">Projects</h4>
            {projects.map(item => <a href={item.url} className="list-group-item">{item.name}</a>)}
          </div>
        </div>
      </div>

      <div className="col-md-4">

        <div className="well">
          <h4>Portfolio:</h4>
          {portfolio.map(item => <a key={item.name} className="btn btn-primary" href={item.url}>{item.name}</a>)}
        </div>

        <div className="well">
          <h4>Skills:</h4>
          {skills.map(item => <a key={item.name} className="btn btn-primary" href={item.url}>{item.name}</a>)}
        </div>

        <div className="well center">
          <Social items={social} />
        </div>
      </div>
    </div>
  );
}