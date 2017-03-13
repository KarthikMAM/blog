import React from 'react';

export function About({
  name,
  pic,
  social
}) {
  return (
    <div className="center" style={{ alignContent: 'center' }}>
      <h3> {name} </h3>
      <br />
      <img src={pic} alt={name} className="pic" />
      <br /> <br /> <br />
      <div className="nav nav-pills">
        {['Proects', 'Blog', 'About', 'Contact'].map(menu => <a className="btn btn-default add-margin" key={menu} href="#">{menu}</a>)}
      </div>
      <br />
      <div className="nav-pills">
        {
          social.map(socialItem => (
            <a className="add-margin" key={socialItem.name} href={socialItem.url}>
              <img width="30" src={socialItem.logo} alt={socialItem.name} />
            </a>
          ))
        }
      </div>
    </div>
  );
}