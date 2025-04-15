import React from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"

const SelectElection = () => {
    const { allNameElections, loadElectionMap } = useElection();

  return (
    <div id="containerMenu">
        <select id="electionMenu" onChange={(e) => loadElectionMap(e.target.value, 75)}>
            {allNameElections.map((election, index) => (
                <option key={index} value={election.idName}>{election.name}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectElection