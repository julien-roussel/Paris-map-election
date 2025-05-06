import React from 'react'
import { useParams } from 'react-router'

import Map from '../Components/map/Map'
import SelectElection from '../Components/parameters/SelectElection';
import SelectMode from '../Components/parameters/SelectMode';
import OptionResultat from '../Components/parameters/OptionResultat';
import ResultatsLateral from '../Components/parameters/ResultatsLateral';

// Context
import { useElection } from "../context/ElectionsContext"
import { useMap } from "../context/MapContext"

const MapParis = () => {
    const params = useParams()
    const { departement } = params; 
    
    const { bureauDataSelect } = useElection();
    const { selectBureau } = useMap();
    
   var dep; var circo; var bureau; var nomDep; var nomCommune;
   if (bureauDataSelect && bureauDataSelect.meta) {
        dep = bureauDataSelect.meta.departement;
        circo = bureauDataSelect.meta.circo;
        bureau = bureauDataSelect.meta.bureau;
        nomDep = bureauDataSelect.meta.nomDepartement;
        nomCommune = bureauDataSelect.meta.nomCommune;
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
                    <h3>{nomDep ? nomDep : 'Nom département'} {departement ? departement : '__'}</h3>
                    <h4>{nomCommune ? nomCommune : 'Nom de la commune'}</h4>
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