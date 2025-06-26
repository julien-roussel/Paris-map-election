import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"

// CSS
import stylesParam from './parameters.module.scss';

const ContainerResultat = (props) => {
    const params = useParams()
    const { departement } = params; 

    const { loadResultBv, bureauDataSelect } = useElection();
    const { allCandidats, bureauSelected } = useMap();

    const [electionSelectedResults, setElectionSelectedResults] = useState([]);
    const [resultCandidat, setResultCandidat] = useState([]);
    const [perAbstentions, setPerAbstentions] = useState('');
    const [inscrits, setInscrits] = useState();

    useEffect(() => {
        if (!props.electionIdName || !bureauSelected) return;
        loadResultBv(props.electionIdName, bureauSelected, departement);
    }, [bureauSelected]);

    useEffect(() => {
        const electionIdName = props.electionIdName;
      
        if (
            !electionIdName ||
            !bureauDataSelect ||
            !bureauDataSelect[electionIdName]
          ) {
            return;
          }
          
        const resultCandidats = bureauDataSelect[props.electionIdName].candidats;
        setResultCandidat(resultCandidats)
        const resultCandidatsFirsts = resultCandidats.sort((a, b) => b.voix - a.voix).slice(0, 6)
        if(allCandidats == true) setResultCandidat(resultCandidatsFirsts)
        
        const meta = bureauDataSelect[electionIdName].meta;
        const abst = parseInt(meta.Abstentions, 10);
        setInscrits(parseInt(meta.Inscrits, 10))
      
        if (abst && inscrits) {
          setPerAbstentions(Math.round((abst / inscrits * 100) * 100) / 100);
        } else {
          setPerAbstentions('');
        }
    }, [bureauDataSelect, props.electionIdName, allCandidats]);

  return (
        <div id={stylesParam["container-resultat-candidats"]}>
            <div className={stylesParam["container-abstention"]}>
                <span>Abstention : {perAbstentions}%</span>
                <div className={stylesParam["progressbar"]}>
                    <div className={stylesParam["barre-abstention"]+' '+stylesParam["barre-resultat"]} 
                        role="progressbar" style={{width: perAbstentions+'%'}} >   
                    </div>
                </div> 
            </div>
            <h5 className={stylesParam["h5-resultat"]}>Parmi les votes exprimés :</h5>
            {Array.isArray(resultCandidat) && resultCandidat.map((candidat, index) => {
                var nuance;
                var parti;
                var parti_code;
                if(candidat.parti) {
                    nuance = candidat.nuance
                    parti = candidat.parti    
                    parti_code = candidat.parti_code    
                }

                return (
                    <div key={index} className={stylesParam["container-resultat-candidat"]}
                            id={candidat.parti_code && "container-"+candidat.parti_code}>
                        <span><span className="capitalize">{candidat.tete_de_liste && candidat.tete_de_liste}</span> : {Math.round(candidat.voix/inscrits*100)}%</span>
                        <div className={stylesParam["progressbar"]}>
                            <div
                                id={stylesParam["barre-abstention"]} role="progressbar" 
                                className={stylesParam["barre-resultat"] + ' ' + 
                                            (nuance && stylesParam["nuance-"+nuance]) + ' ' + 
                                            (parti_code && stylesParam["parti-"+parti_code])} 
                                style={{width: (Math.round(candidat.voix/inscrits*100))+'%'}} >   
                                <div
                                     className={stylesParam["bandeau-hover"] + ' ' + 
                                                (nuance && stylesParam["nuance-"+nuance]) + ' ' + 
                                                (parti_code && stylesParam["parti-"+parti_code])} >
                                    <span>
                                        <span className='texte-bold texte-white'>Candidat·e : </span> 
                                        <span className="capitalize">{candidat.tete_de_liste && candidat.tete_de_liste}</span>
                                    </span>
                                    <span>
                                        <span className='texte-bold texte-white'>Parti : </span> 
                                        {parti_code && parti_code} - {parti && parti}
                                    </span>
                                    <span>
                                        <span className='texte-bold texte-white'>Nuance : </span> 
                                        {candidat.tendance && candidat.tendance}
                                    </span>
                                    <span>
                                        <span className='texte-bold texte-white'>Nombre de voix : </span>
                                            {candidat.voix && candidat.voix}
                                    </span>
                                </div>
                            </div>
                        </div> 
                    </div>
                )
            })}
        </div>
    )
}

export default ContainerResultat