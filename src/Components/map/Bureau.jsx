import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as d3 from 'd3';

// Context
import { useElection } from "../../context/ElectionsContext"

const Bureau = (props) => {
    const { electionSelected, selectBureau, bureauDataSelect } = useElection();
    const [perAbstention, setPerAbstention] = useState();
    const [bureauActif, setBureauActif] = useState();

    useEffect(() => {
        if(!electionSelected[props.bureauSelect]) return
        const abstention = electionSelected[props.bureauSelect].meta.Abstentions
        const inscrits = electionSelected[props.bureauSelect].meta.Inscrits
        setPerAbstention(abstention/inscrits*2)
    }, [electionSelected]);
    
    
    
  return (
    <path 
        id={props.bureauSelect} 
        className={bureauActif === props.bureauSelect ? 'active ' + props.class : props.class } 
        d={props.coordonne}
        fill="black"
        stroke="white"
        fillOpacity={perAbstention}
        strokeWidth={0.5}
        onClick={() => {
            props.click
            selectBureau(props.bureauSelect)
        }}
    />
  )
}

// {electionSelected[bureauSelect] && electionSelected[bureauSelect].meta.abstentions}

export default Bureau