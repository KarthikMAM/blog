import React from 'react';

export function ButtonWell({
  buttons,
  title
}) {
  return (
    <div className="well">
      <h4>{title}:</h4>
      {buttons.map(item => <a key={item.name} className="btn btn-primary" href={item.url}>{item.name}</a>)}
    </div>
  );
}