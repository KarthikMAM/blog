import React from "react";

export function PayloadListItem({
  name,
  createdAt,
  desc,
  showPath,
  editPath
}) {
  return (
    <tr className="payload-item">
      <td>
        <h3><a href={showPath}>{name}</a></h3>
        <h5><span className="glyphicon glyphicon-time" />{` ${createdAt}`}</h5>
        <p>{desc}</p>
      </td>
      {
        editPath === null ? null : (
          <td className="admin-actions">
            <a className="btn btn-danger" href={editPath}>Edit</a>
          </td>
        )
      }
    </tr>
  );
}

PayloadListItem.propTypes = {
  name: React.PropTypes.string,
  createdAt: React.PropTypes.string,
  desc: React.PropTypes.string,
  showPath: React.PropTypes.string,
  editPath: React.PropTypes.string
};