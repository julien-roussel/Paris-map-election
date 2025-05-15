import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"

// Component
import Button from '../../Components/button/Button' 

// CSS
import '../button/button.scss'

const ContainerPopUp = () => {
  const navigate = useNavigate();
  const { allNameElections, loadElectionMap, electionNameSelected } = useElection();
  
  const { allNameMap } = useMap();
  const [popDepartementSelected, setPopDepartementSelected] = useState();
  const [popElectSelected, setPopElectSelected] = useState();
  const [allNameArray, setAllNameArray] = useState('');
  const [etape, setEtape] = useState(false);

  useEffect(() => {
    if(allNameMap) setAllNameArray(Object.values(allNameMap))
  }, [allNameMap]);

  // 1 - Sélection des élections
  const popElectChange = async (event) => {
    const { value } = event.target
    setPopElectSelected(value);
  }
  
  const popElectSubmit = async (event) => { 
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
  
  function navigateToHome() {
    navigate('/')
  }

  return (
    <div className="container-pop-up">
        { !etape && (
        //electionNameSelected == '' && (
          <div id="pop-election" className="pop-up">
              <h3>Élections non chargées 1/2</h3>
              <p>La carte ne s'affiche pas, car aucune élection est sélectionnée.</p>
              <h5>Veuillez sélectionner une élection</h5>
              <form id="" className="container-select" 
                    onSubmit={popElectSubmit} onChange={popElectChange}>
                  <select id="electionMenu">
                      <option value={false}>{electionNameSelected[0] ? electionNameSelected[0]?.name : "Sélectionnez une élection"}</option>
                      {allNameElections.map((election, index) => (
                          <option key={index} value={election.idName}>{election.name}</option>
                      ))}
                  </select>
                  <hr></hr>
                  <div className='container-buttons'>
                    <button 
                        id="button-home" 
                        className="button"
                        name="popup-home" 
                        type="button"
                        onClick={navigateToHome}>    
                          Accueil
                    </button>
                    <button 
                        id="button-popup-elect" 
                        className={!popElectSelected ? "button dark-button button-desactive" : "button dark-button"}
                        name="popup-dept" 
                        type="submit">    
                          Suivant <span>▶︎</span>
                    </button>
                  </div>
              </form>
          </div>
        )}

        { etape && (
          //!departement && electionNameSelected != '' && (
          <div id="pop-departement" className="pop-up" >
              <h3>Carte non chargée 2/2</h3>
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
                  <hr></hr>
                  <div className='container-buttons'>
                    <button 
                        id="button-home" 
                        className="button"
                        name="popup-home" 
                        type="button"
                        onClick={() => setEtape(false)}>    
                          <span>◀︎</span> Précédent 
                    </button>
                    <button 
                        id="button-popup-dept" 
                        className={!popDepartementSelected ? "button dark-button button-desactive" : "button dark-button"}
                        name="popup-dept" 
                        type="submit">    
                          Afficher 
                    </button>
                  </div>
              </form>
          </div>
        )}
    </div>
  )
}

export default ContainerPopUp