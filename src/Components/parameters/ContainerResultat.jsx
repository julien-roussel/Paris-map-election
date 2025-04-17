import React, { useState, useEffect, useRef } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"

const ContainerResultat = (props) => {
    const [electionSelectedResults, setElectionSelectedResults] = useState([]);
    const {loadResultBv, bureauSelect, bureauDataSelect, nuancePolitique, allCandidats } = useElection();
    const [resultCandidat, setResultCandidat] = useState([]);
    const [perAbstentions, setPerAbstentions] = useState('');
    const [inscrits, setInscrits] = useState();

    useEffect(() => {
        if (!props.electionIdName || !bureauSelect) return;
        loadResultBv(props.electionIdName, bureauSelect);
    }, [bureauSelect]);

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
        <div id="container-resultat-election">
            <div className="container-abstention">
                <span>Abstention : {perAbstentions}%</span>
                <div className="progress">
                    <div id="barre-abstention" className="barre-resultat" role="progressbar" style={{width: perAbstentions+'%'}} >   
                    </div>
                </div> 
            </div>
            <h5>Parmi les votes exprimés :</h5>
            {resultCandidat && resultCandidat.map((candidat, index) => {
                var nuance;
                var parti;
                if(candidat.parti) parti = candidat.parti;
                if(nuancePolitique[candidat.nom]) {
                    nuance = nuancePolitique[candidat.nom].nuance
                    parti = nuancePolitique[candidat.nom].parti    
                }

                return (
                    <div key={index} className={"container-"+candidat.nom}>
                        <span>{candidat.nom && candidat.nom.slice(0, 20)} {candidat.prenom && candidat.prenom} : {Math.round(candidat.voix/inscrits*100)}%</span>
                        <div className="progress">
                            <div 
                                id="barre-abstention" role="progressbar" 
                                className={`barre-resultat ${nuance && 'nuance-'+nuance} ${parti && ' parti-'+parti}`} 
                                style={{width: (Math.round(candidat.voix/inscrits*100))+'%'}} >   
                            </div>
                        </div> 
                    </div>
                )
            })}
        </div>
    )
}

export default ContainerResultat