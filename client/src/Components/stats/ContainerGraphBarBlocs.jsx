import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"
import { useResponsive } from "../../context/ResponsiveContext.jsx"

// JS
import graphBarBlocs from "./graphBarBlocs.js"

// CSS
import styleStats from './stats.module.scss';

const ContainerGraphBarBlocs = () => {
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
            graphBarBlocs.generateGraphBarBlocs(bureauDataSelect, allNameElections, nuancePolitique, widthPage);
        
        return () => {
            if (window.graphBarBlocs) {
                window.graphBarBlocs.destroy();
            }
        };
    }, [bureauDataSelect]);

  return (
    <canvas id="graphBarBlocs" className={styleStats["graph-stats"]} aria-label="chart" role="img" height=""></canvas>
  )
}

export default ContainerGraphBarBlocs