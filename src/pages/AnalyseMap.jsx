import React from 'react'
import { useParams } from 'react-router'

import Map from '../Components/map/Map'
import SelectElection from '../Components/parameters/SelectElection';
import SelectMode from '../Components/parameters/SelectMode';
import OptionResultat from '../Components/parameters/OptionResultat';
import ResultatsLateral from '../Components/parameters/ResultatsLateral';

// Context
import { useElection } from "../context/ElectionsContext"

const MapParis = () => {
    const params = useParams()
    const { departement } = params; 
    
   const { bureauDataSelect } = useElection();

   var dep; var circo; var bureau;
   if (bureauDataSelect && bureauDataSelect.meta) {
    dep = bureauDataSelect.meta.departement;
    circo = bureauDataSelect.meta.circo;
    bureau = bureauDataSelect.meta.bureau;
   }
  return (
    <div id="map-paris">
        <div id="container" className="map">
            <div id="map-container" className="map-image"> 
                <Map departement={departement} />
                <div id="container-france">
                    <h2>Résultat pour la France</h2>
                    <div id="container-barre-france" className="container-resultat-france"></div>
                </div>
            </div>
            <div id="container-resultat">
                <div id="marge-resultat">
                    <h1>résultats élections</h1>
                    <SelectElection/>
                    <SelectMode/>
                    <OptionResultat/>
                    <h3>PARIS {departement ? departement : '__'}</h3>
                    <h5>Circonscription {bureauDataSelect ? circo : '__'}</h5>
                    <h5>Bureau de vote {bureauDataSelect ? bureau : '__'}</h5>
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