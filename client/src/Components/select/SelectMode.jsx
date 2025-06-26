import React from 'react'

// Context
import { useMap } from "../../context/MapContext"

const SelectMode = () => {
    const { chooseModeMap } = useMap();

  return (
    <div id="container-select" className="">
        <select id="modeMenu" onChange={(e) => chooseModeMap(e.target.value)}>
            <option value="first">Candidat·e arrivé·e en tête</option>
            <option value="abstention">Abstentions</option>
            <option value="gauche">Gauche</option>
        </select>
    </div>
  )
}

export default SelectMode