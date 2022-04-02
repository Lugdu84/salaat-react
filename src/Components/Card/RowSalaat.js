import React from 'react'
import "./Salaat.scss"

export default function RowSalaat({name, times}) {
  return (
    <div className="row-salaat">
      <div>{name} :</div>
      <div className="times">{times}</div>
    </div>
  );
}
