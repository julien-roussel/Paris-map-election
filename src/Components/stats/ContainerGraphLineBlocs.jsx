import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"

// JS
import graphLineBlocs from "./graphLineBlocs.js"

// CSS
import styleStats from './stats.module.scss';

const ContainerGraphLineBlocs = () => {
  const { bureauSelected } = useMap();  
  const { allNameElections, bureauDataSelect } = useElection();

  useEffect(() => {
    graphLineBlocs.generateLineGraph(bureauDataSelect, allNameElections);
    
    return () => {
      // Nettoyer le graphique si nécessaire
      if (window.graphLineBlocs) {
        window.graphLineBlocs.destroy();
      }
    };
  }, []);
  
  return (
    <canvas id="graphLineBlocs" className={styleStats["graph-stats"]} aria-label="chart" role="img" height="400px"></canvas>
  )
}

export default ContainerGraphLineBlocs