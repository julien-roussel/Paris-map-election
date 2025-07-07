import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"
import { useResponsive } from "../../context/ResponsiveContext.jsx"

// JS
import graphBarBlocRight from "./graphBarBlocRight.js"

// CSS
import styleStats from './stats.module.scss';

const ContainerGraphBarBlocRight = () => {
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
            graphBarBlocRight.generateGraphBarBlocRight(bureauDataSelect, allNameElections, nuancePolitique, widthPage);
        
        return () => {
            if (window.graphBarBlocRight) {
                window.graphBarBlocRight.destroy();
            }
        };
    }, [bureauDataSelect]);

  return (
    <canvas id="graphBarBlocRight" className={styleStats["graph-stats"]} aria-label="chart" role="img" height=""></canvas>
  )
}

export default ContainerGraphBarBlocRight