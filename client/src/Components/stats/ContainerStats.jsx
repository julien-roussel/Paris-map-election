import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useAuth } from "../../context/AuthContext"
import { useMap } from "../../context/MapContext"
import { useResponsive } from "../../context/ResponsiveContext"

// CSS
import styleStats from './stats.module.scss';

// Component
import ContainerGraphLineBlocs from './ContainerGraphLineBlocs';
import ContainerGraphBarBlocs from './ContainerGraphBarBlocs';
import PictoGraphLine from '../picto/PictoGraphLine';
import PictoGraphBloc from '../picto/PictoGraphBloc';

const ContainerStats = () => {
  // Context
  const { electionSelected, 
          electionNameSelected, 
          setBureauDataSelect } = useElection();
  const { auth, session } = useAuth();
  const { bureauSelected } = useMap();  
  const { containerGuiMap, widthPage, ratioGraph, handleResize } = useResponsive();  

  // State 
  const [isOpen, setIsOpen] = useState(false);
  const [graphVisible, setGraphVisible] = useState(1);

  const toggleVolet = () => {
    if(session && bureauSelected) {
      if(!isOpen) {
        setIsOpen(true) 
      } else {
        setIsOpen(false)
      }
    } 
  };

  useEffect(() => {
    handleResize(); 
  }, []);

  return (
    <section  id={styleStats["container-stats"]} 
              style={isOpen ? { height: `${containerGuiMap * ratioGraph}px` } : {}}>
      <div id={styleStats["marge-stats"]}>
        <div id={styleStats["header-stats"]} onClick={() => toggleVolet()}>
          <h2 id={styleStats["titre-stats"]} 
              className={session && bureauSelected ? styleStats["titre-animation"] : "no-select" }>
              ANALYSE EN GRAPHIQUE DES STATISTIQUES
          </h2>
          {!session && (<span>Pour profiter des analyses en graphiques, il faut être <a href="/login">connecté.</a></span>)}
          {(session && !bureauSelected) && (<span>Pour voir les graphiques, veuillez cliquer sur un bureau de vote.</span>)}
          {(session && bureauSelected && !isOpen) && (<span>Pour voir les graphiques, veuillez cliquer sur ce volet.</span>)}
          {(session && bureauSelected && isOpen) && (<span>Pour fermer le volet, cliquez sur le titre.</span>)}
        </div>
        {(session && bureauSelected && isOpen) && (
          <div id={styleStats["container-graph"]}>
            <div id={styleStats["container-nav-graph"]}>
              <h3 id={styleStats["titre-nav-graph"]}>Graphique :</h3>
              <div className={styleStats["picto-graph"]} 
                   onClick={() => setGraphVisible(1)}>
                <PictoGraphLine />
              </div>
              <div className={styleStats["picto-graph"]}
                   onClick={() => setGraphVisible(2)}>
                <PictoGraphBloc />
              </div>
            </div>
            <div className={styleStats["container-tab"]}>
              {graphVisible === 1 && <ContainerGraphLineBlocs/>}
            </div>
            <div className={styleStats["container-tab"]}>
              {graphVisible === 2 && <ContainerGraphBarBlocs/>}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ContainerStats