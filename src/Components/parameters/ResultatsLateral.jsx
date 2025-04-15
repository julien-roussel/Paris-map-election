import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"

// Component
import ContainerResultat from './ContainerResultat';

const ResultatsLateral = () => {
    const { allNameElections, bureauSelect, bureauDataSelect } = useElection();

  useEffect(() => {
    console.log('✅ Bureau data récupéré :', bureauDataSelect);
  }, [bureauDataSelect])

  return (
    <section id="div-resultat">
      {allNameElections.map((election, index) => (
        <div key={index} id={election.idName} className="panneaux-score-resultat resultat-legislatives">
          <div className="panneaux-score-volet closed">
            <h3 className="panneaux-score-button">{election.name}</h3>
            {bureauSelect && <ContainerResultat bureauSelected={bureauSelect} electionIdName={election.idName} />}
          </div>
        </div>
      ))}
    </section>
  )
}

export default ResultatsLateral