import React from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"

const SelectElection = () => {
    const { allNameElections, loadElectionMap, electionSelected } = useElection();
    
  return (
    <div id="containerMenu" className="container-select">
        <select id="electionMenu" className={electionSelected == '' ? 'noSelected' : ''}
                onChange={(e) => loadElectionMap(e.target.value, 75)}>
            <option value="">Sélectionnez une élection</option>
            {allNameElections.map((election, index) => (
                <option key={index} value={election.idName}>{election.name}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectElection