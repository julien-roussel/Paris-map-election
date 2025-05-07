import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";

// Context
import { useMap } from "../../context/MapContext"

const SelectElection = () => {
    const { allNameMap, loadMapBureau } = useMap();
    const params = useParams()
    const { departement } = params; 
    const [allNameArray, setAllNameArray] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      if(allNameMap) {
        setAllNameArray(Object.values(allNameMap))
      }
    }, [allNameMap]); 
  
    function navigateToMap(value) {
      navigate('/analyse-map/'+value)
    }
    
  return (
    <div id="containerMenu" className="container-select">
        <select id="electionMenu"
                onChange={(e) => navigateToMap(e.target.value)}>
            <option value="">Sélectionnez une élection</option>
            {allNameArray && allNameArray.map((dept, index) => (
                <option key={index} value={dept.numero}>{dept.numero} - {dept.nom}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectElection