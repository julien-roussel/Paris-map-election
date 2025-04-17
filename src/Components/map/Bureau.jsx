import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as d3 from 'd3';

// Context
import { useElection } from "../../context/ElectionsContext"

const Bureau = (props) => {
    const { electionSelected, selectBureau, bureauSelect, nuancePolitique, modeMap, electionNameSelected } = useElection();
    const [perAbstention, setPerAbstention] = useState();
    const [first, setFirst] = useState();
    const [perFirst, setPerFirst] = useState();
    const [nuance, setNuance] = useState();
    const [parti, setParti] = useState();

    useEffect(() => {
        setParti(undefined)
        setFirst(undefined)
        setPerFirst(undefined)
        setPerAbstention(undefined)

        if(!electionSelected[props.bureauSelect]) return
        const abstention = electionSelected[props.bureauSelect]?.meta.Abstentions
        const inscrits = electionSelected[props.bureauSelect]?.meta.Inscrits
        setPerAbstention(abstention/inscrits*2)

        const candidats = electionSelected[props.bureauSelect]?.candidats || [];
        const candidatsTri = [...candidats].sort((a, b) => b.voix - a.voix);
        setFirst(candidatsTri)
        setPerFirst(candidatsTri[0].voix/inscrits*2)
     
        if (electionNameSelected[0].type == 'presi') {
            setNuance(nuancePolitique[candidatsTri[0].nom]?.nuance)
            setParti(nuancePolitique[candidatsTri[0].nom]?.parti)
        } else if (electionNameSelected[0].type == 'euro') {
            setParti(candidatsTri[0].parti)
        } 
            
    }, [electionSelected]);


    
return (
    <path 
        id={props.bureauSelect} 
        className={
            props.class + ' ' +
            (bureauSelect == props.bureauSelect ? 'active' : '') + ' ' +
            ((first && (electionNameSelected[0].type == 'presi')) ? 'nuance-' + nuance : '') + ' ' +
            ((first && (electionNameSelected[0].type == 'presi' || electionNameSelected[0].type == 'euro')) ? 'parti-' + parti : '') + ' ' +
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