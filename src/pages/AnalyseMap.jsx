import React from 'react'

import Map from '../Components/Map'
import SelectElection from '../Components/parameters/SelectElection';
import ResultatsLateral from '../Components/parameters/ResultatsLateral';

const MapParis = () => {
   
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
                    <h3>PARIS <span id="resultat-numeroCirco"></span> - Bureau de vote <span id="resultat-numeroBureau"></span></h3>
                    <SelectElection/>
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