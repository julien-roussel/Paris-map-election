import React from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"

const SelectMode = () => {
    const { chooseModeMap } = useElection();

  return (
    <div id="containerMode" className="container-select">
        <select id="modeMenu" onChange={(e) => chooseModeMap(e.target.value)}>
            <option value="first">Candidat·e arrivé·e en tête</option>
            <option value="abstention">Abstentions</option>
            <option value="gauche">Gauche</option>
        </select>
    </div>
  )
}

export default SelectMode