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

// CSS
import stylesParam from '../Components/parameters/parameters.module.scss';
import stylesMap from '../Components/map/map.module.scss';

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
    <>
        <title>Application et carte d'analyse électorale</title>
        <meta name="description" content="En tant que visiteur, vous pouvez visualiser certains résultats en carte : comparateurs d’élections, statistiques détaillées et graphique d'évolution." />
        <meta name="author" content="Julien Roussel" />
        <meta name="viewport" content="width=device-width,initial-scale=1"></meta>

        <div id={stylesMap["container-map"]}>
            <div id={stylesMap["map-container"]} className="map-image"> 
                <SelectMode/>
                <Map departement={departement} />
            </div>
            <div id={stylesParam["container-resultat"]}>
                <div id={stylesParam["marge-resultat"]}>
                    <h1>résultats élections</h1>
                    <span>{(!bureauDataSelect && !bureauDataSelect?.meta) ? 'Sélectionnez un bureau :' : "Bureau sélectionné :"}</span>
                    <div id={stylesParam["container-information-bureau"]}
                        className={(!bureauDataSelect && !bureauDataSelect?.meta) ? 'no-select' : undefined}>
                        <h3>{departement ? departement + ' - ' : ''}{nomDep ? nomDep : 'Département sélectionné'} </h3>
                        <h4>{nomCommune ? nomCommune : 'Nom de la commune'}</h4>
                        <div id={stylesParam["meta-bureau"]}>
                            <h5>Circonscription {bureauDataSelect ? circo : '__'}</h5>
                            /
                            <h5>Bureau de vote {bureauDataSelect ? bureau : '__'}</h5>
                        </div>
                        <OptionResultat/>
                        <ResultatsLateral/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MapParis