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

  return (
    <section id={styleStats["container-stats"]}>
      <div id={styleStats["marge-stats"]}>
        {!session && (
          <div id={styleStats["header-stats"]}>
            <h2 id={styleStats["titre-stats"]}>ANALYSE EN GRAPHIQUE DES STATISTIQUES</h2>
            <span>Pour profiter des analyses en graphiques, il faut être <a href="/login">connecté.</a></span>
          </div>
        )}
        {(session && !bureauSelected) && (
          <div id={styleStats["header-stats"]}>
            <h2 id={styleStats["titre-stats"]}>ANALYSE EN GRAPHIQUE DES STATISTIQUES</h2>
            <span>Pour ouvrir les graphiques, veuillez cliquer sur un bureau de vote.</span>
          </div>
        )}
        {(session && bureauSelected) && (
          <div id={styleStats["header-stats"]}>
            <h2 id={styleStats["titre-stats"]}>ANALYSE EN GRAPHIQUE DES STATISTIQUES</h2>
            <ContainerGraphLineBlocs/>
          </div>
        )}
      </div>
    </section>
  )
}

export default ContainerStats