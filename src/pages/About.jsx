import React from 'react'

// Component
import Button from '../Components/button/Button' 

const About = () => {
  return (
    <div id="aboutpage" className="container-scroll">
      <div>
        <section className='container-paragraphe'>
          <h1>Comment fonctionne SUFFRAMAP ?</h1>

          <p>
            <span className='texte-logo'>Sufframap</span> est un outil citoyen d'exploration des résultats électoraux français, construit autour du niveau le plus fin de lecture disponible : le <span className="texte-bold">bureau de vote</span>.
            Les données proviennent exclusivement de sources officielles (Ministère de l'Intérieur, data.gouv.fr, etc.). Elles sont préalablement <span className="texte-bold">parsées</span>, nettoyées, enrichies puis stockées dans une base de données sécurisée. Ce traitement permet de proposer une navigation fluide, sans appels externes lourds, et garantit une meilleure stabilité d’accès.
          </p>

          <h2>Profiter entièrement des outils</h2>
          <p>
            En tant que visiteur, vous pouvez visualiser certains résultats en carte sans inscription. Toutefois, pour accéder à l’ensemble des fonctionnalités du site — comme :
          </p>
          <ul>
            <li>les comparateurs d’élections,</li>
            <li>les filtres avancés,</li>
            <li>les statistiques détaillées,</li>
            <li>ou encore les graphiques d'évolution à l’échelle d’un bureau</li>
          </ul>
          <p>
            Il est nécessaire de <a href="/signup">créer un compte</a> et de <a href="/login">vous connecter</a>.
          </p>
          <Button 
            name="S'inscrire"
            link="/signup"
          />
        </section>
        <hr></hr>
        <section className='container-paragraphe'>
          <h2>Sources officielles des résultats électoraux</h2>
          <p>
            Cette application repose exclusivement sur des données publiques mises à disposition par les services de l’État français. 
            Toutes les élections traitées ici sont issues de fichiers publiés sur la plateforme <a href="https://www.data.gouv.fr/" target="_blank" rel="noopener noreferrer">data.gouv.fr</a>. 
            Les données concernent les résultats détaillés par bureau de vote, garantissant un niveau de granularité optimal pour l’analyse électorale.
          </p>

          <h3>Voici la liste complète des sources utilisées par élection :</h3>
          <ul>
            <li>
              <span className="texte-bold">Présidentielle 2012</span> : 
              <a href="https://www.data.gouv.fr/fr/datasets/election-presidentielle-2012-resultats-par-bureaux-de-vote-1/" target="_blank" rel="noopener noreferrer">
                Résultats par bureau de vote – 1er et 2d tour
              </a>
            </li>
            <li>
              <span className="texte-bold">Présidentielle 2017</span> : 
              <a href="https://www.data.gouv.fr/fr/datasets/election-presidentielle-2017-resultats-par-bureau-de-vote/" target="_blank" rel="noopener noreferrer">
                Résultats par bureau de vote – 1er et 2d tour
              </a>
            </li>
            <li>
              <span className="texte-bold">Européennes 2019</span> : 
              <a href="https://www.data.gouv.fr/fr/datasets/elections-europeennes-2019-resultats-par-bureau-de-vote/" target="_blank" rel="noopener noreferrer">
                Résultats par bureau de vote
              </a>
            </li>
            <li>
              <span className="texte-bold">Municipales 2020</span> : 
              <a href="https://www.data.gouv.fr/fr/datasets/elections-municipales-2020-resultats-par-bureau-de-vote-paris-lyon-marseille/" target="_blank" rel="noopener noreferrer">
                Résultats par bureau de vote (Paris, Lyon, Marseille)
              </a>
            </li>
            <li>
              <span className="texte-bold">Présidentielle 2022</span> : 
              <a href="https://www.data.gouv.fr/fr/datasets/election-presidentielle-2022-resultats-definitifs-par-bureau-de-vote/" target="_blank" rel="noopener noreferrer">
                Résultats par bureau de vote – 1er et 2d tour
              </a>
            </li>
            <li>
              <span className="texte-bold">Législatives 2022</span> : 
              <a href="https://www.data.gouv.fr/fr/datasets/elections-legislatives-2022-resultats-par-bureau-de-vote/" target="_blank" rel="noopener noreferrer">
                Résultats par bureau de vote – 1er et 2d tour
              </a>
            </li>
            <li>
              <span className="texte-bold">Européennes 2024</span> : 
              <a href="https://www.data.gouv.fr/fr/datasets/elections-europeennes-2024-resultats-par-bureaux-de-vote/" target="_blank" rel="noopener noreferrer">
                Résultats par bureau de vote – 1er et 2d tour
              </a>
            </li>
            <li>
              <span className="texte-bold">Législatives 2024</span> : 
              <a href="https://www.data.gouv.fr/fr/datasets/elections-legislatives-2024-1ertour/" target="_blank" rel="noopener noreferrer">
                Résultats par bureau de vote – 1er et 2d tour
              </a>
            </li>
          </ul>

          <p>
            Toutes les données sont exploitées dans un souci de <span className="texte-bold">transparence</span>, de <span className="texte-bold">rigueur méthodologique</span> et dans le respect du cadre légal de réutilisation des informations publiques.
          </p>
        </section>
        <hr></hr>
        <section className='container-paragraphe'>
          <h2>En toute transparence</h2>
          <p>
            Le code de l’application est <span className="texte-bold">entièrement open-source</span>. Vous pouvez le consulter, l’utiliser ou y contribuer librement sur GitHub : <br/>
            Scrutanalyse est conçu dans un esprit de transparence, de pédagogie et d’indépendance. Aucune donnée personnelle n’est revendue, et aucune publicité ne vient polluer l’expérience utilisateur.
          </p>
            <Button 
              name="Visiter le github"
              link="https://github.com/julien-roussel/Paris-map-election/"
              target="_blank"
            />
          <h3>Signaler une erreur ou un dysfonctionnement</h3>
          <p>
            Malgré le soin apporté à la collecte, au traitement et à la présentation des données, des erreurs peuvent exceptionnellement survenir — qu’il s’agisse d’un résultat incorrect, d’un bug d’affichage ou d’une incohérence dans les graphiques.
          </p>
          <p>
            Si vous repérez un problème, nous vous invitons à nous en faire part via le formulaire de contact ci-dessous. Merci de préciser si possible :
          </p>
          <ul>
            <li>Le département ou le bureau de vote concerné</li>
            <li>Le type d’élection et l’année</li>
            <li>La nature de l’erreur constatée (résultat erroné, blocage technique, affichage incorrect…)</li>
          </ul>
          <p>
            Votre signalement contribuera à améliorer la qualité de <span className='texte-logo'>Sufframap</span>. Merci pour votre vigilance et votre aide précieuse.
          </p>
          <Button 
            name="Signalez un problème"
            link="/"
          />
        </section>
      </div>
    </div>
  )
}

export default About