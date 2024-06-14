import React from 'react'
import './SelectDatasource.css'

export function SelectDatasource() {
  return (
    <div className="select-datasource">
      <select id="datasource" name="datasource">
        <option value="source1">Source 1</option>
        <option value="source2">Source 2</option>
        <option value="source3">Source 3</option>
      </select>
    </div>
  )
}
