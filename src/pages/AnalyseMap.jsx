import React from 'react'
import { useParams } from 'react-router'

// Component
import Map from '../Components/map/Map'
import SelectElection from '../Components/select/SelectElection';
import SelectMode from '../Components/select/SelectMode';
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
    <div id="container" className="map">
        <div id="map-container" className="map-image"> 
            <SelectMode/>
            <Map departement={departement} />
        </div>
        <div id="container-resultat">
            <div id="marge-resultat" className={(!bureauDataSelect && !bureauDataSelect?.meta) ? 'bv-no-select' : undefined}>
                <h1>résultats élections</h1>
                <span>{(!bureauDataSelect && !bureauDataSelect?.meta) ? 'Sélectionnez un bureau :' : "Bureau sélectionné :"}</span>
                <h3>{departement ? departement + ' - ' : ''}{nomDep ? nomDep : 'Département sélectionné'} </h3>
                <h4>{nomCommune ? nomCommune : 'Nom de la commune'}</h4>
                <div id="meta-bureau">
                    <h5>Circonscription {bureauDataSelect ? circo : '__'}</h5>
                    /
                    <h5>Bureau de vote {bureauDataSelect ? bureau : '__'}</h5>
                </div>
                <OptionResultat/>
                <div id="div-resultat">
                    <ResultatsLateral/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MapParis