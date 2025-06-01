import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useAuth } from "../../context/AuthContext"
import { useMap } from "../../context/MapContext"

// CSS
import styleStats from './stats.module.scss';

// Component
import ContainerGraphLineBlocs from './ContainerGraphLineBlocs';

const ContainerStats = () => {
  // Context
  const { electionSelected, 
          electionNameSelected, 
          setBureauDataSelect } = useElection();
  const { auth, session } = useAuth();
  const { bureauSelected } = useMap();  

  // State 
  const [isOpen, setIsOpen] = useState(false);

  const toggleVolet = () => {
    if(session && bureauSelected) {
      if(!isOpen) {
        setIsOpen(true) 
      } else {
        setIsOpen(false)
      }
    } 
  };

  return (
    <section id={styleStats["container-stats"]} className={isOpen && styleStats["volet-open"]}>
      <div id={styleStats["marge-stats"]}>
        <h2 id={styleStats["titre-stats"]} onClick={() => toggleVolet()}>ANALYSE EN GRAPHIQUE DES STATISTIQUES</h2>
        {!session && (
          <div id={styleStats["header-stats"]}>
            <span>Pour profiter des analyses en graphiques, il faut être <a href="/login">connecté.</a></span>
          </div>
        )}
        {(session && !bureauSelected) && (
          <div id={styleStats["header-stats"]}>
            <span>Pour voir les graphiques, veuillez cliquer sur un bureau de vote.</span>
          </div>
        )}
        {(session && bureauSelected) && (
          <div id={styleStats["header-stats"]}>
            {!isOpen && (
              <span>Pour voir les graphiques, veuillez cliquer sur ce volet.</span>
            )}
            {isOpen && (
              <>
                <span>Pour fermer le volet, cliquez sur le titre.</span>
                <ContainerGraphLineBlocs/>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default ContainerStats