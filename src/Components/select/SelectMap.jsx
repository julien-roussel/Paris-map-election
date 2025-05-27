import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";

// Context
import { useMap } from "../../context/MapContext"
import { useElection } from "../../context/ElectionsContext"
import { useAuth } from "../../context/AuthContext"

const SelectElection = () => {
    const { departement } = useParams();
    const { allNameMap } = useMap();
    const navigate = useNavigate();

    // Context
    const { loadElectionMapMember, 
            loadElectionsMapConnected,
            loadElectionMapNoConnected, 
            electionNameSelected } = useElection();
    const { auth, session } = useAuth();  

    // State
    const [allNameArray, setAllNameArray] = useState('');
    const [departementInfo, setDepartementInfo] = useState();

    useEffect(() => {
      if(allNameMap) setAllNameArray(Object.values(allNameMap))
    }, [allNameMap]); 

    useEffect(() => {
        setDepartementInfo(allNameMap?.find(dept => dept.numero === departement))
    }, [departement, allNameMap]);

    useEffect(() => {
      if(auth?.isSuscriber) loadElectionMapMember(electionNameSelected[0]?.idName, auth._id ,departement)
      if(session && !auth?.isSuscriber) loadElectionsMapConnected(auth?._id, departement)
      if(!session) loadElectionMapNoConnected(departement)  
    }, [departement]);
    
    function navigateToMap(value) {
      navigate('/analyse-map/'+value)
    }
    
  return (
    <div id="" className="container-select">
        <select id="electionMenu"
                onChange={(e) => navigateToMap(e.target.value)}>
            <option value="">{departement ? `${departement} - ${departementInfo?.nom}` : "Sélectionnez un département"}</option>
            {allNameArray && allNameArray.map((dept, index) => (
                <option key={index} value={dept.numero}>{dept.numero} - {dept.nom}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectElection