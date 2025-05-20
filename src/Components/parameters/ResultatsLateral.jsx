import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"

// Component
import ContainerResultat from './ContainerResultat';

const ResultatsLateral = () => {
    const params = useParams()
    const { departement } = params; 

    const { allNameElections, bureauDataSelect } = useElection();
    const { bureauSelected } = useMap();
    const [openVolets, setOpenVolets] = useState({});

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
        if(election.type == 'muni' &&  departement != 75) return;
        
        return (
          <div key={index} id={election.idName} className="panneaux-score-resultat resultat-legislatives">
            <div  id={'volet-'+election.idName} 
                  onClick={() => toggleVolet(election.idName)}
                  className={`panneaux-score-volet ${isOpen && bureauSelected  ? '' : 'close'}`}>
              <h3 className={(bureauSelected ? '' : 'no-select ') + "panneaux-score-button"}>{election.name}</h3>
              {bureauSelected && 
                  <ContainerResultat bureauSelected={bureauSelected} electionIdName={election.idName} />}
            </div>
          </div>
        )
    })}
    </section>
  )
}

export default ResultatsLateral