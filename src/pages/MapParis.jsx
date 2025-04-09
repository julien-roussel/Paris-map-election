import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Map from '../Components/Map'

const MapParis = () => {

  return (
    <div id="map-paris">
        <div id="containerMenu">
            <select id="electionMenu">
                <option value="Legislatives-2024">Législatives 2024</option>
                <option value="Europeennes-2024">Européennes 2024</option>
                <option value="Legislatives-2022">Législatives 2022</option>
                <option value="Presidentielles-2022">Présidentielles 2022</option>
                <option value="Municipales-2020">Municipales 2020</option>
                <option value="Europeennes-2019">Européennes 2019</option>
                <option value="Presidentielles-2017">Présidentielles 2017</option>   
            </select>
        </div>
        <div id="container" className="map">
            <div id="map-container" className="map-image"> 
                <Map/>

                <div id="container-france">
                    <h2>Résultat pour la France</h2>
                    <div id="container-barre-france" className="container-resultat-france"></div>
                </div>
            </div>
            <div id="container-resultat">
                <header>
                    <h1>résultats élections Paris</h1>
                    <h3>PARIS <span id="resultat-numeroCirco"></span> - Bureau de vote <span id="resultat-numeroBureau"></span></h3>
                </header>
                <div id="div-resultat">

                </div>
            </div>
        </div>
    </div>
  )
}

export default MapParis