import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useAuth } from "../../context/AuthContext"

// CSS
import stylesSelect from './select.module.scss';

const SelectElection = () => {
    // Params
    const { departement } = useParams();

    // Context
    const { allNameElections, 
            electionNameSelected, 
            loadElectionMapMember, 
            loadElectionsMapConnected,
            loadElectionMapNoConnected,
            electionSelected } = useElection();
    const { auth, session } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    
    const handleClick = () => {
        if(!isOpen) { 
            setIsOpen(true) 
        } else {
            setIsOpen(false) 
        }
    }
    const loadElectionMap = async (electioName, departement) => {
      if (!electioName || !departement) return;

      if(auth?.isSuscriber) loadElectionMapMember(electioName, auth._id ,departement)
      if(session && !auth?.isSuscriber) loadElectionsMapConnected(auth?._id, departement)
      if(!session) loadElectionMapNoConnected(departement)
    }

  return (
    <div className={stylesSelect["custom-container-select"]} onClick={handleClick}>
      <div id="electionMenu" className={stylesSelect["custom-select"]}>
          <div className={stylesSelect["custom-select-trigger"]}>
            {electionNameSelected[0] ? electionNameSelected[0]?.name : "Sélectionnez une élection"}
          </div>
          <ul className={isOpen ? (stylesSelect["custom-options"] + ' select-animation activate') : stylesSelect["custom-options"] + ' select-animation'}>
            {Array.isArray(allNameElections) && allNameElections.map((election, index) => {
              if(election.type == 'muni' &&  departement != 75) return;
              return (
                  <li className={stylesSelect["custom-option"]} key={index} 
                      value={election.idName} onClick={() => loadElectionMap(election.idName, departement)}>
                        {election.name}
                  </li>
            )})}
          </ul>
      </div>
  </div>
  )
}

export default SelectElection

