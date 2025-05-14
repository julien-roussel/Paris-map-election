import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";

// Context
import { useMap } from "../../context/MapContext"
import { useElection } from "../../context/ElectionsContext"

const SelectElection = () => {
    const { departement } = useParams();
    const { allNameMap } = useMap();
    const { loadElectionMap, electionNameSelected } = useElection();
    const [allNameArray, setAllNameArray] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      if(allNameMap) setAllNameArray(Object.values(allNameMap))
    }, [allNameMap]); 

    useEffect(() => {
        loadElectionMap(electionNameSelected[0]?.idName ,departement)
    }, [departement]);
    
    function navigateToMap(value) {
      navigate('/analyse-map/'+value)
    }
    
  return (
    <div id="" className="container-select">
        <select id="electionMenu"
                onChange={(e) => navigateToMap(e.target.value)}>
            <option value="">Sélectionnez un département</option>
            {allNameArray && allNameArray.map((dept, index) => (
                <option key={index} value={dept.numero}>{dept.numero} - {dept.nom}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectElection