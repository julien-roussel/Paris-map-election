import React from 'react'

import Map from '../Components/map/Map'
import SelectElection from '../Components/parameters/SelectElection';
import ResultatsLateral from '../Components/parameters/ResultatsLateral';

// Context
import { useElection } from "../context/ElectionsContext"

const MapParis = () => {
   const {bureauDataSelect } = useElection();
    
  return (
    <div id="map-paris">
        <div id="container" className="map">
            <div id="map-container" className="map-image"> 
                <Map/>
                <div id="container-france">
                    <h2>Résultat pour la France</h2>
                    <div id="container-barre-france" className="container-resultat-france"></div>
                </div>
            </div>
            <div id="container-resultat">
                <div id="marge-resultat">
                    <h1>résultats élections</h1>
                    <SelectElection/>
                    <h3>PARIS {bureauDataSelect && bureauDataSelect.meta.departement}</h3>
                    <h4>Circonscription {bureauDataSelect && bureauDataSelect.meta.circo}</h4>
                    <h4>Bureau de vote {bureauDataSelect && bureauDataSelect.meta.bureau}</h4>
                    <div id="div-resultat">
                        <ResultatsLateral/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MapParis