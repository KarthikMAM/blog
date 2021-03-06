import React from 'react'

export function Social ({ items }) {
  Social.propTypes = {
    items: React.PropTypes.array
  }

  return (
    <div className="nav-pills">
      {
        items.map(item => (
          <a className="img-btn" key={item.name} href={item.url}>
            <img src={item.logo} alt={item.name} />
          </a>
        ))
      }
    </div>
  )
}
