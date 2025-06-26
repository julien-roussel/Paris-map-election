import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"
import { useResponsive } from "../../context/ResponsiveContext.jsx"

// JS
import graphLineBlocs from "./graphLineBlocs.js"

// CSS
import styleStats from './stats.module.scss';

const ContainerGraphLineBlocs = () => {
  const { bureauSelected,  } = useMap(); 
  const { widthPage } = useResponsive(); 
  const { allNameElections, bureauDataSelect, nuancePolitique } = useElection();

  useEffect(() => {
    if (
      !bureauDataSelect || 
      typeof bureauDataSelect !== 'object' || 
      Object.keys(bureauDataSelect).length === 0 || 
      !nuancePolitique
    ) return;
    graphLineBlocs.generateLineGraph(bureauDataSelect, allNameElections, nuancePolitique, widthPage);
    
    return () => {
      if (window.graphLineBlocs) {
        window.graphLineBlocs.destroy();
      }
    };
  }, [bureauDataSelect]);
  
  return (
    <canvas id="graphLineBlocs" className={styleStats["graph-stats"]} aria-label="chart" role="img" height=""></canvas>
  )
}

export default ContainerGraphLineBlocs