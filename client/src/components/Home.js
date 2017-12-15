import React from 'react'
import { Link } from 'react-router'

import { Social } from './Social'

export function Home ({ about }) {
  Home.propTypes = {
    about: React.PropTypes.shape({
      name: React.PropTypes.string,
      pic: React.PropTypes.string,
      social: React.PropTypes.array
    })
  }

  return (
    <div className="middle center" style={{ alignContent: 'center' }}>
      <h3> {about.name} </h3>
      <img src={about.pic} alt={about.name} className="pic" />
      <div className="navbar nav-pills">
        {[
          'Projects',
          'Blog',
          'About',
          'Contact'
        ].map(menu => <Link className="btn btn-default" key={menu} to={menu.toLowerCase()}>{menu}</Link>)}
      </div>
      <Social items={about.social} />
    </div>
  )
}
