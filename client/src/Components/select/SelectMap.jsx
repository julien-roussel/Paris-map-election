import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";

// Context
import { useMap } from "../../context/MapContext"
import { useElection } from "../../context/ElectionsContext"
import { useAuth } from "../../context/AuthContext"
import { useResponsive } from "../../context/ResponsiveContext"

// CSS
import stylesSelect from './select.module.scss';

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
    const { messageDepartement } = useResponsive();

    // State
    const [allNameArray, setAllNameArray] = useState('');
    const [departementInfo, setDepartementInfo] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if(!isOpen) { 
            setIsOpen(true) 
        } else {
            setIsOpen(false) 
        }
    }

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
    <div className={stylesSelect["custom-container-select"]} onClick={handleClick} >
        <div id="mapMenu" className={stylesSelect["custom-select"]}>
            <div className={stylesSelect["custom-select-trigger"]}>
              {departement ? `${departement} - ${departementInfo?.nom}` : messageDepartement}
            </div>
            <ul className={isOpen ? (stylesSelect["custom-options"] + ' select-animation activate') : stylesSelect["custom-options"] + ' select-animation'}>
                {Array.isArray(allNameArray) && allNameArray.map((dept, index) => (
                    <li className={stylesSelect["custom-option"]} key={index} 
                        value={dept.numero}
                        onClick={() => navigateToMap(dept.numero)}>
                          {dept.numero} - {dept.nom}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default SelectElection