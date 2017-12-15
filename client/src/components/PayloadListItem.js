import React from 'react'
import { Link } from 'react-router'

export function PayloadListItem ({ name, createdAt, desc, showPath, editPath }) {
  PayloadListItem.propTypes = {
    name: React.PropTypes.string,
    createdAt: React.PropTypes.string,
    desc: React.PropTypes.string,
    showPath: React.PropTypes.string,
    editPath: React.PropTypes.string
  }

  return (
    <tr className="payload-item">
      <td>
        <h3><Link to={showPath}>{name}</Link></h3>
        <h5><span className="glyphicon glyphicon-time" />{` ${createdAt}`}</h5>
        <p>{desc}</p>
      </td>
      {
        editPath === null ? null : (
          <td className="admin-actions">
            <Link className="btn btn-danger" to={editPath}>Edit</Link>
          </td>
        )
      }
    </tr>
  )
}
