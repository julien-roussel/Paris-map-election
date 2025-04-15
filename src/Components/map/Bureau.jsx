import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as d3 from 'd3';

// Context
import { useElection } from "../../context/ElectionsContext"

const Bureau = (props) => {
    const { electionSelected, selectBureau, bureauSelect, nuancePolitique } = useElection();
    const [perAbstention, setPerAbstention] = useState();
    const [first, setFirst] = useState();

    useEffect(() => {
        if(!electionSelected[props.bureauSelect]) return
        const abstention = electionSelected[props.bureauSelect]?.meta.Abstentions
        const inscrits = electionSelected[props.bureauSelect]?.meta.Inscrits
        setPerAbstention(abstention/inscrits*2)
        const candidats = electionSelected[props.bureauSelect]?.candidats || [];
        const candidatsTri = [...candidats].sort((a, b) => b.voix - a.voix);
        setFirst(candidatsTri)
    }, [electionSelected]);

  return (
    <path 
        id={props.bureauSelect} 
        className={
            props.class +
            (bureauSelect == props.bureauSelect ? 'active ' : '') +
            (first ? ' nuance-' + nuancePolitique[first[0].nom].nuance : '') +
            (first ? ' parti-' + nuancePolitique[first[0].nom].parti : '')
        } 
        d={props.coordonne}
        fill="black"
        stroke="white"
        fillOpacity={perAbstention}
        strokeWidth={0.5}
        onClick={() => selectBureau(props.bureauSelect)}
    />
  )
}

// {electionSelected[bureauSelect] && electionSelected[bureauSelect].meta.abstentions}

export default Bureau