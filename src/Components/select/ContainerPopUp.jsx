import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"

// CSS
import '../button/button.scss'

const ContainerPopUp = () => {
  const navigate = useNavigate();
  const { allNameElections, loadElectionMap } = useElection();
  
  const { allNameMap } = useMap();
  const [popDepartementSelected, setPopDepartementSelected] = useState();
  const [popElectSelected, setPopElectSelected] = useState();
  const [allNameArray, setAllNameArray] = useState('');
  const [etape, setEtape] = useState(false);

  useEffect(() => {
    if(allNameMap) setAllNameArray(Object.values(allNameMap))
  }, [allNameMap]);

  // 1 - Sélection des élections
  const popElectChange = (event) => {
    const { value } = event.target
    console.log(value);
    
    setPopElectSelected(value);
  }
  
  const popElectSubmit = (event) => { 
    event.preventDefault(); 
    if (!popElectSelected) return;
    
    setEtape(true)
  }
  
  
  // 2 - Sélection du département
  const popDeptChange = (event) => {
    const { value } = event.target
    console.log(value);
    setPopDepartementSelected(value);
  }
  
  const popDeptSubmit = (event) => { 
    event.preventDefault();     
    if (!popDepartementSelected || !popElectSelected || !etape) return;
    
    loadElectionMap(popElectSelected, popDepartementSelected)
    navigate('/analyse-map/'+popDepartementSelected)
  }
  

  return (
    <div className="container-pop-up">
        { !etape && (
        //electionNameSelected == '' && (
          <div id="pop-election" className="pop-up">
              <h3>Élections non chargées</h3>
              <p>La carte ne s'affiche pas, car aucune élection est sélectionnée.</p>
              <h5>Veuillez sélectionner une élection</h5>
              <form id="" className="container-select" 
                    onSubmit={popElectSubmit} onChange={popElectChange}>
                  <select id="electionMenu">
                      <option value={false}>Sélectionnez une élection</option>
                      {allNameElections.map((election, index) => (
                          <option key={index} value={election.idName}>{election.name}</option>
                      ))}
                  </select>
                  <button 
                      id="button-popup-dept" 
                      name="popup-dept" 
                      type="submit">    
                        Suivant
                  </button>
              </form>
          </div>
        )}

        { etape && (
          //!departement && electionNameSelected != '' && (
          <div id="pop-departement" className="pop-up" >
              <h3>Carte non chargée</h3>
              <p>La carte ne s'affiche pas, car aucun département est sélectionné.</p>
              <h5>Veuillez sélectionner un département</h5>
              <form id="" className="container-select" 
                    onSubmit={popDeptSubmit} onChange={popDeptChange}>
                  <select id="electionMenu">
                      <option value={false}>Sélectionnez un département</option>
                      {allNameArray && allNameArray.map((dept, index) => (
                          <option key={index} value={dept.numero}>{dept.numero} - {dept.nom}</option>
                      ))}
                  </select>
                  <button 
                      id="button-popup-dept" 
                      name="popup-dept" 
                      type="submit">    
                        Suivant
                  </button>
              </form>
          </div>
        )}
    </div>
  )
}

export default ContainerPopUp