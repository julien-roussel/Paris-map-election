import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"
import { useResponsive } from "../../context/ResponsiveContext.jsx"

// JS
import graphBarBlocLeft from "./graphBarBlocLeft.js"

// CSS
import styleStats from './stats.module.scss';

const ContainerGraphBarBlocLeft = () => {
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
            graphBarBlocLeft.generateGraphBarBlocLeft(bureauDataSelect, allNameElections, nuancePolitique, widthPage);
        
        return () => {
            if (window.graphBarBlocLeft) {
                window.graphBarBlocLeft.destroy();
            }
        };
    }, [bureauDataSelect]);

  return (
    <canvas id="graphBarBlocLeft" className={styleStats["graph-stats"]} aria-label="chart" role="img" height=""></canvas>
  )
}

export default ContainerGraphBarBlocLeft