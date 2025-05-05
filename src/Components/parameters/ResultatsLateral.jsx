import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"

// Component
import ContainerResultat from './ContainerResultat';

const ResultatsLateral = () => {
    const { allNameElections, bureauSelect, bureauDataSelect } = useElection();
    const [openVolets, setOpenVolets] = useState({});

  useEffect(() => {
    //console.log('✅ Bureau data récupéré :', bureauDataSelect);
  }, [bureauDataSelect])

  const toggleVolet = (id) => {
    setOpenVolets((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="div-resultat">
      {allNameElections.map((election, index) => {
        const isOpen = openVolets[election.idName];

        return (
          <div key={index} id={election.idName} className="panneaux-score-resultat resultat-legislatives">
            <div  id={'volet-'+election.idName} 
                  onClick={() => toggleVolet(election.idName)}
                  className={`panneaux-score-volet ${isOpen && bureauSelect  ? '' : 'close'}`}
            >
              <h3 className={(bureauSelect ? '' : 'no-select ') + "panneaux-score-button"}>{election.name}</h3>
              {bureauSelect && <ContainerResultat bureauSelected={bureauSelect} electionIdName={election.idName} />}
            </div>
          </div>
        )
    })}
    </section>
  )
}

export default ResultatsLateral