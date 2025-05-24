import React from 'react'

// Context
import { useMap } from "../../context/MapContext"

// CSS
import stylesParam from './parameters.module.scss';

const OptionResultat = () => {
    const { afficherAllCandidats, allCandidats } = useMap();

  return (
    <div id={stylesParam["container-options"]}>
        <input type="checkbox" id="allCandidats" name={allCandidats.toString()} value={allCandidats} onChange={(e) => afficherAllCandidats("allCandidats")} />
        <label htmlFor="allCandidats">Afficher tous les candidat·e·s</label>
    </div>
  )
}

export default OptionResultat