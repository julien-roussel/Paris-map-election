import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import SelectElection from '../select/SelectElection';
import SelectMap from '../../Components/select/SelectMap'

// Context
import { useElection } from "../../context/ElectionsContext"

// CSS
import '../button/button.scss'

const ContainerPopUp = () => {
  const { departement } = useParams();
  const { electionNameSelected } = useElection();
    
  return (
    <div className="container-pop-up">
        {electionNameSelected == '' && (
          <div id="pop-election" className="pop-up">
              <h3>Élections non chargées</h3>
              <p>La carte ne s'affiche pas, car aucune élection est sélectionnée.</p>
              <h5>Veuillez sélectionner une élection</h5>
              <SelectElection />
          </div>
        )}

        {!departement && electionNameSelected != '' && (
          <div id="pop-departement" className="pop-up">
              <h3>Carte non chargée</h3>
              <p>La carte ne s'affiche pas, car aucun département est sélectionné.</p>
              <h5>Veuillez sélectionner un département</h5>
              <SelectMap />
          </div>
        )}
    </div>
  )
}

export default ContainerPopUp