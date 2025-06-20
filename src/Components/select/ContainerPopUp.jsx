import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"
import { useAuth } from "../../context/AuthContext"

// CSS
import stylesPopUp from './popup.module.scss';

// Component
import CustomSelect from './CustomSelect';

const ContainerPopUp = () => {
  const navigate = useNavigate();

  // Context
  const { allNameElections, 
          loadElectionMapMember, 
          loadElectionsMapConnected, 
          loadElectionMapNoConnected,
          electionNameSelected } = useElection();
  const { auth, session } = useAuth();
  const { allNameMap } = useMap();

  // State
  const [popDepartementSelected, setPopDepartementSelected] = useState();
  const [popElectSelected, setPopElectSelected] = useState();
  const [allNameArray, setAllNameArray] = useState('');
  const [etape, setEtape] = useState(false);

  useEffect(() => {
    if(allNameMap) setAllNameArray(Object.values(allNameMap))
  }, [allNameMap]);

  // 1 - Sélection des élections
  const handleElectionSelect = (value) => {
    setPopElectSelected(value);
  }
  
  const popElectSubmit = async (event) => { 
    event.preventDefault(); 
    if (!popElectSelected) return;
    setEtape(true)
  }
  
  // 2 - Sélection du département
  const popDeptChange = (value) => {
    setPopDepartementSelected(value);
  }
  
  const popDeptSubmit = (event) => { 
    event.preventDefault();     
    if (!popDepartementSelected || !popElectSelected || !etape) return;

    if(auth?.isSuscriber) loadElectionMapMember(popElectSelected, auth._id ,popDepartementSelected)
    if(session && !auth?.isSuscriber) loadElectionsMapConnected(auth?._id, popDepartementSelected)
    if(!session) loadElectionMapNoConnected(popDepartementSelected)
    navigate('/analyse-map/'+popDepartementSelected)
  }
  
  function navigateToHome() {
    navigate('/')
  }

  return (
    <div className={stylesPopUp.containerpopup}>
        { !etape && (
            <div id="pop-election" className={stylesPopUp.popup}>
              <div id={stylesPopUp["pop-informations"]}>
                <h3>Élections non chargées <span className={stylesPopUp.popupetape}>1/2</span></h3>
                <p>La carte ne s'affiche pas, car aucune élection est sélectionnée.</p>
                <h5>Veuillez sélectionner une élection</h5>
              </div>
              <form className={stylesPopUp.containerselect}
                    onSubmit={popElectSubmit}>
                  <CustomSelect
                    options={allNameElections
                      .filter(election => !(election.type === 'muni' && popDepartementSelected != 75))
                      .map(e => ({ value: e.idName, label: e.name }))}
                    selectedValue={popElectSelected}
                    onSelect={handleElectionSelect}
                    placeholder={electionNameSelected[0]?.name || "Sélectionnez une élection"}
                  />
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
          <div id="pop-departement" className={stylesPopUp.popup} >
              <div id={stylesPopUp["pop-informations"]}>
                <h3>Carte non chargée <span className={stylesPopUp.popupetape}>2/2</span></h3>
                <p>La carte ne s'affiche pas, car aucun département est sélectionné.</p>
                <h5>Veuillez sélectionner un département</h5>
              </div>
              <form id="" className={stylesPopUp.containerselect} 
                    onSubmit={popDeptSubmit} onChange={popDeptChange}>
                  <CustomSelect
                    options={allNameArray
                      .map(dept => ({ value: dept.numero, label: (dept.numero+' - '+dept.nom) }))}
                    selectedValue={popDepartementSelected}
                    onSelect={popDeptChange}
                    placeholder="Sélectionnez un département"
                  />
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