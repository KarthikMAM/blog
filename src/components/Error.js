import React from 'react';

export function Error({content}) {
  return <h1 className="alert alert-danger"> {content} </h1>;
}