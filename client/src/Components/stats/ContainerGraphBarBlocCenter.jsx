import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext.jsx"
import { useMap } from "../../context/MapContext.jsx"
import { useResponsive } from "../../context/ResponsiveContext.jsx"

// JS
import graphBarBlocCenter from "./graphBarBlocCenter.js"

// CSS
import styleStats from './stats.module.scss';

const ContainerGraphBarBlocCenter = () => {
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
            graphBarBlocCenter.generateGraphBarBlocCenter(bureauDataSelect, allNameElections, nuancePolitique, widthPage);
        
        return () => {
            if (window.graphBarBlocCenter) {
                window.graphBarBlocCenter.destroy();
            }
        };
    }, [bureauDataSelect]);

  return (
    <canvas id="graphBarBlocCenter" className={styleStats["graph-stats"]} aria-label="chart" role="img" height=""></canvas>
  )
}

export default ContainerGraphBarBlocCenter