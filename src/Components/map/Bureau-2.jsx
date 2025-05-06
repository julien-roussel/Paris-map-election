import React, { useEffect, useState } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"

const Bureau = (props) => {
    const { electionSelected, electionNameSelected } = useElection();
    const { chooseModeMap, modeMap, selectBureau, bureauSelected, } = useMap();
    
    const [perAbstention, setPerAbstention] = useState();
    const [first, setFirst] = useState();
    const [perFirst, setPerFirst] = useState();
    const [nuance, setNuance] = useState();
    const [parti, setParti] = useState();
    const [voix, setVoix] = useState();

    function getOpacityFromScore(inscrits, score) {
        if (!inscrits || !score || inscrits === 0) return 0.3;
        
        const taux = score / inscrits;
        
        // On mappe de 0%–80% d'abstention ➜ 0.5–1 d’opacité
        const minOpacity = 0.2;
        const maxOpacity = 1;
        const maxTaux = 0.5;
        
        const normalized = Math.min(taux / maxTaux, 1); // max à 1
        const opacity = minOpacity + normalized * (maxOpacity - minOpacity);
        
        return Math.round(opacity * 100) / 100; // arrondi à 2 décimales
    }
      

    useEffect(() => {
        setParti('')
        setFirst('')
        setPerFirst('')
        setPerAbstention('')
        
        if(!electionSelected[props.bureauSelect]) return
        const abstention = electionSelected[props.bureauSelect]?.meta.Abstentions
        const inscrits = electionSelected[props.bureauSelect]?.meta.Inscrits
        setPerAbstention(getOpacityFromScore(inscrits, abstention))

        const candidats = electionSelected[props.bureauSelect]?.candidats || [];
        const candidatsTri = [...candidats].sort((a, b) => b.voix - a.voix);
        setVoix(candidatsTri)
        setFirst(candidatsTri)
        setPerFirst(getOpacityFromScore(inscrits, candidatsTri[0].voix))
     
        setParti(candidatsTri[0]?.parti_code)
        if (electionNameSelected[0].type == 'euro') setNuance(candidatsTri[0]?.nuance)
            
    }, [electionSelected]);


    
return (
    <path 
        id={props.bureauSelect} 
        className={
            props.class + ' ' +
            (bureauSelect == props.bureauSelect ? 'active' : '') + ' ' +
            ((first && (electionNameSelected[0].type == 'presi')) ? 'nuance-' + nuance : '') + ' ' +
            (first ? 'parti-' + parti : '') + ' ' +
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