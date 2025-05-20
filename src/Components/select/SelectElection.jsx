import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useAuth } from "../../context/AuthContext"

const SelectElection = () => {
    // Params
    const { departement } = useParams();

    // Context
    const { allNameElections, 
            electionNameSelected, 
            loadElectionMapMember, 
            loadElectionsMapConnected,
            loadElectionMapNoConnected,
            electionSelected } = useElection();
    const { auth, session } = useAuth();

    const loadElectionMap = async (electioName, departement) => {
      if (!electioName || !departement) return;

      if(auth?.isSuscriber) loadElectionMapMember(electioName, auth._id ,departement)
      if(session && !auth?.isSuscriber) loadElectionsMapConnected(auth?._id, departement)
      if(!session) loadElectionMapNoConnected(departement)
    }

  return (
    <div id="" className="container-select">
        <select id="electionMenu" className={electionSelected == '' ? 'noSelected' : ''}
                onChange={(e) => loadElectionMap(e.target.value, departement)}>
            <option value="">{electionNameSelected[0] ? electionNameSelected[0]?.name : "Sélectionnez une élection"}</option>
            {allNameElections.map((election, index) => {
            if(election.type == 'muni' &&  departement != 75) return;
            return (
                <option key={index} value={election.idName}>{election.name}</option>
            )})}
        </select>
    </div>
  )
}

export default SelectElection

//                onChange={(e) => loadElectionMap(e.target.value, departement)}>
