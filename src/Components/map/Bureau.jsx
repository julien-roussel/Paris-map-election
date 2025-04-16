import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as d3 from 'd3';

// Context
import { useElection } from "../../context/ElectionsContext"

const Bureau = (props) => {
    const { electionSelected, selectBureau, bureauSelect, nuancePolitique, modeMap } = useElection();
    const [perAbstention, setPerAbstention] = useState();
    const [first, setFirst] = useState();
    const [perFirst, setPerFirst] = useState();

    useEffect(() => {
        if(!electionSelected[props.bureauSelect]) return
        const abstention = electionSelected[props.bureauSelect]?.meta.Abstentions
        const inscrits = electionSelected[props.bureauSelect]?.meta.Inscrits
        setPerAbstention(abstention/inscrits*2)
        const candidats = electionSelected[props.bureauSelect]?.candidats || [];
        const candidatsTri = [...candidats].sort((a, b) => b.voix - a.voix);
        setFirst(candidatsTri)
        setPerFirst(candidatsTri[0].voix/inscrits*2)
    }, [electionSelected]);

  return (
    <path 
        id={props.bureauSelect} 
        className={
            props.class + ' ' +
            (bureauSelect == props.bureauSelect ? 'active' : '') + ' ' +
            ((first && nuancePolitique[first[0].nom]) ? ' nuance-' + nuancePolitique[first[0].nom].nuance : '') + ' ' +
            ((first && nuancePolitique[first[0].nom]) ? ' parti-' + nuancePolitique[first[0].nom].parti : '') + ' ' +
            (modeMap === 'abstention' ? 'abstention' : '')
        } 
        d={props.coordonne}
        fill="black"
        stroke="white"
        fillOpacity={
            modeMap === 'abstention' ? perAbstention
                : modeMap === 'first' ? perFirst
                : " "}
        strokeWidth={0.5}
        onClick={() => selectBureau(props.bureauSelect)}
    />
  )
}

// {electionSelected[bureauSelect] && electionSelected[bureauSelect].meta.abstentions}

export default Bureau