import React, { useState, useEffect, useRef } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"

const ContainerResultat = (props) => {
    const [electionSelectedResults, setElectionSelectedResults] = useState([]);
    const {loadResultBv, bureauSelect, bureauDataSelect } = useElection();
    const [perAbstentions, setPerAbstentions] = useState('');

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
      
        console.log('Chargement dans le container : ' + electionIdName);
      
        const meta = bureauDataSelect[electionIdName].meta;
      
        const abst = parseInt(meta.Abstentions, 10);
        const inscrits = parseInt(meta.Inscrits, 10);
      
        if (abst && inscrits) {
          setPerAbstentions(Math.round((abst / inscrits * 100) * 100) / 100);
        } else {
          setPerAbstentions('');
        }
      
      }, [bureauDataSelect, props.electionIdName]);

  return (
        <div className="container-abstention">
            <span>Abstention : {perAbstentions}%</span>
            <div className="progress">
                <div id="barre-abstention" className="barre-resultat" role="progressbar" style={{width: perAbstentions+'%'}} aria-valuenow={perAbstentions/100} aria-valuemin="0" aria-valuemax="100" >   
                </div>
                <div>
                    
                </div>
            </div> 
        </div>
    )
}

export default ContainerResultat