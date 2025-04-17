import React from 'react'

// Context
import { useElection } from "../../context/ElectionsContext"

const OptionResultat = () => {
    const { afficherAllCandidats, allCandidats } = useElection();

  return (
    <div id="container-options">
        <input type="checkbox" id="allCandidats" name={allCandidats.toString()} value={allCandidats} onChange={(e) => afficherAllCandidats("allCandidats")} />
        <label htmlFor="allCandidats">Afficher tous les candidat·e·s</label>
    </div>
  )
}

export default OptionResultat