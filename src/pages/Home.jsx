import React, { useEffect, useState } from 'react'

// Component
import Button from '../Components/button/Button' 

const Home = () => {
    
  return (
    <div id="homepage">
        <div id="container" className="">
          <div id="container-home-video" className="container-home">
            <video className="image-fade hidden visible animated fadeInUp" loop="" playsInline="" autoPlay loop muted="" src="../../../public/video/map-video_01.mp4">
            </video>
          </div>
          <div id="container-home-intro" className="container-home">
            <h1>SCRUTANALYSE</h1>
            <h2>Présentation</h2>
            <p>
              <span className='texte-bold'>Scrutanalyse</span> est un outil d’exploration et de visualisation des résultats électoraux français, basé sur le <span className='texte-bold'>niveau le plus granulaire disponible : les bureaux de vote.</span>
            </p>
            <p>
              En combinant <span className='texte-bold'>données en <span className='texte-italique'>Opendata</span> et cartographie interactive</span>, Scrutanalyse permet de comparer les dynamiques électorales à une échelle ultra-locale, de visualiser les contrastes politiques quartier par quartier, et d’analyser l’évolution des comportements électoraux à travers le temps.
            </p>
            <h2>Sources des données</h2>
            <p>
              Les résultats sont issus des <span className='texte-bold'>données ouvertes mises à disposition par l'État français</span>, notamment via <a href="https://www.data.gouv.fr/fr/" alt="Site de données officielles en open source du gouvernement">data.gouv.fr</a>, la plateforme officielle d’ouverture des données publiques. Les contours géographiques des bureaux de vote sont fournis à titre expérimental par des projets contributifs ou institutionnels.
            </p>
            <Button 
              name="Commencer"
              link="./analyse-map"
            />
          </div>
        </div>
    </div>
  )
}

export default Home