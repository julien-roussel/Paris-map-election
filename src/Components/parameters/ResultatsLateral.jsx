import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"

// Component
import ContainerResultat from './ContainerResultat';

// CSS
import stylesParam from './parameters.module.scss';

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
    <section>
      {Array.isArray(allNameElections) && allNameElections.map((election, index) => {
        const isOpen = openVolets[election.idName];
        if(election.type == 'muni' &&  departement != 75) return;
        
        return (
          <div key={index} id={election.idName} className={stylesParam["panneaux-score-resultat"]}>
            <div  id={'volet-'+election.idName} 
                  onClick={() => toggleVolet(election.idName)}
                  className={stylesParam["panneaux-score-volet"] + ' ' + (isOpen && bureauSelected  ? '' : stylesParam["close"])}>
              <h3 
                className={stylesParam["panneaux-score-button"] + ' ' + (bureauSelected  ? '' : stylesParam["no-select"])}>
                {election.name}
              </h3>
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