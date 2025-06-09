import React, { useEffect, useState } from 'react'

// Component
import Button from '../Components/button/Button' 

const Home = () => {
    
  return (
    <div id="homepage" className='container-scroll'>
        <section id="" className="container-display">
          <div id="container-home-video" className="container-home">
            <video className="image-fade hidden visible animated fadeInUp" playsInline="" autoPlay loop muted="" src="../../../public/video/map-video_01.mp4">
            </video>
          </div>
          <div id="container-home-intro" className="">
            <h1>SUFFRAMAP</h1>
            <hr></hr>
            <section className='container-paragraphe'>
              <h2>Présentation</h2>
              <p>
                <span className='texte-logo'>SuffraMap</span> est un outil d’exploration et de visualisation des résultats électoraux français, basé sur le <span className='texte-bold'>niveau le plus granulaire disponible : les bureaux de vote.</span>
              </p>
              <p>
                En combinant <span className='texte-bold'>données en <span className='texte-italique'>Opendata</span> et cartographie interactive</span>, <span className='texte-logo'>Sufframap</span> permet de comparer les dynamiques électorales à une échelle ultra-locale, de visualiser les contrastes politiques quartier par quartier, et d’analyser l’évolution des comportements électoraux à travers le temps.
              </p>
              <h2>Sources des données</h2>
              <p>
                Les résultats sont issus des <span className='texte-bold'>données ouvertes mises à disposition par l'État français</span>, notamment via <a href="https://www.data.gouv.fr/fr/" alt="Site de données officielles en open source du gouvernement">data.gouv.fr</a>, la plateforme officielle d’ouverture des données publiques. Les contours géographiques des bureaux de vote sont fournis à titre expérimental par des projets contributifs ou institutionnels.
              </p>
              <Button 
                name="Commencer"
                link="./analyse-map"
              />
            </section>
          </div>
        </section>
        <hr></hr>
        <section className='container-paragraphe'>
          <h2>Analyser l'évolution des résultats</h2>
          <p> L'un des objectifs principaux de <span className='texte-logo'>Sufframap</span> est de permettre une lecture fine des évolutions électorales à travers le temps. Grâce à des graphiques interactifs, vous pouvez suivre la progression des partis, des tendances politiques et du comportement électoral dans chaque commune et bureau de vote. </p> 
          <p> Chaque série de données est issue des résultats officiels, parsés et organisés de manière à refléter le plus fidèlement possible la réalité électorale française. Cette approche vous permet de comparer plusieurs années d’élections, d’identifier les zones de basculement politique, ou encore de visualiser la montée en puissance (ou le déclin) de certains courants. </p> 
          <h3>Une exploration par bureau de vote</h3> 
          <p>L’analyse est menée à l’échelle la plus granulaire disponible : celle des bureaux de vote. Cela permet de dépasser les moyennes départementales ou nationales et de s’attacher aux dynamiques locales, souvent révélatrices de changements sociétaux profonds. </p> 
          <h3>Pour quoi faire ?</h3> 
          <ul> 
            <li>Observer les évolutions d’un parti dans une ville ou un département</li> 
            <li>Comparer plusieurs scrutins dans le temps</li> 
            <li>Repérer des bascules électorales entre deux tours ou deux années</li> 
            <li>Comprendre l’impact de l’abstention sur les résultats</li> 
          </ul> 
          <p> L’outil graphique est mis à jour régulièrement, avec l'intégration des nouveaux scrutins disponibles. Pour accéder à l’intégralité des fonctionnalités, il est nécessaire de <a href="/signup">créer un compte</a> et de <a href="/login">vous connecter</a>.</p>
          <Button 
            name="S'inscrire"
            link="/signup"
          />
          </section>
    </div>
  )
}

export default Home