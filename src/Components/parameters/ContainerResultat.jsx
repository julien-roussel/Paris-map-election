import React, { useState, useEffect } from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"

const ContainerResultat = (props) => {
    const { returnElection, electionResults, bureauSelect } = useElection();
    const [electionSelectedResults, setElectionSelectedResults] = useState([]);
    const [bureauData, setBureauData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await returnElection(props.electionIdName);
            console.log(data);
            
            setElectionSelectedResults(data)            
            console.log(data.find(bureau => bureau.id === bureauSelect));
            console.log(bureauSelect);
            
            setBureauData(data.find(bureau => bureau.id === bureauSelect))
        };
        fetchData();
    }, []);    
    
    
  return (
    <div>
        {bureauData && bureauData.map((result, index) => (
            <div key={index} className="container-abstention">
                <span>Abstention : {result.abstentions}</span>
                <div className="progress">
                    <div id="barre-abstention" className="barre-resultat" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" >   
                    </div>
                </div> 
            </div>
        ))}
    </div>
  )
}

export default ContainerResultat