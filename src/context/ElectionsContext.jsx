import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

export const ElectionsContext = createContext();

export const ElectionsProvider = ({ children }) => {
  const [allNameElections, setAllNameElections] = useState([]);

  const [bureauDataSelect, setBureauDataSelect] = useState(undefined);
  const [electionNameSelected, setElectionNameSelected] = useState([])
  const [electionSelected, setElectionSelected] = useState([])
  const [nuancePolitique, setNuancePolitique] = useState([])

  // Pour charger toutes les résultats d'une élection d'un département 
  // afin de la mapper sur une carte
  const loadElectionMap = async (election_name, departementSelected) => {
    if(election_name === undefined) return
    setElectionNameSelected(allNameElections.filter(election => election.idName === election_name))
    if(departementSelected === undefined) return

    try {
        const response = await axios.get(`http://localhost:3001/api/elections/${election_name}`, {
          params: {
            departement: departementSelected
          }
        })   
      setElectionSelected(undefined)
      const filteredResults = response.data;
      setElectionSelected(filteredResults);
      console.log('electionSelected : ', filteredResults);
    } catch (error) {
        console.error('Erreur de récupération des données :', error);
    }
  };

  // Pour charger les résultats de toutes les élections d'un bureau de vote
  const loadResultBv = async (election_name, bureauVote, departementSelected) => {
    if (!election_name || !bureauVote) return;

    try {
        const response = await axios.get(`http://localhost:3001/api/elections/${election_name}/${bureauVote}`, {
            params: {
              departement: departementSelected
            }
        })
        const filteredResults = response.data;
        const resultMeta = {
            ['departement'] : filteredResults.meta["Code du département"],
            ['circo'] : filteredResults.meta["Code de la circonscription"],
            ['arrondissement'] : filteredResults.meta["Bureau"].toString().slice(0, 2),
        }

        setBureauDataSelect(prev => {
          const newData = {
            ...prev,
            [election_name]: filteredResults, // toujours mis à jour
          };
        
          // On ne met à jour 'meta' que si on a une circonscription valide
          if (resultMeta.circo) {
            newData.meta = {
              ...(prev.meta || {}), // garde les anciennes données
              ...resultMeta,         // ajoute ou écrase avec les nouvelles
            };
          }
        
          return newData;
        });
    } catch (error) {
        console.error('❌ Erreur lors de récupération des données :', error.message);
    }
  };

  // -------------- AU DEMARRAGE -------------- //
  // ------------------------------------------ //
  
  // Charger les nuances des élections disponibles
  const loadNuancePolitique = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/elections/candidats')
      setNuancePolitique(response.data)
    } catch (error) {
      console.error('❌ Erreur lors de récupération des données :', error.message);
    }
  };

  // Charger les nuances des élections disponibles
  const loadAllNameElections = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/elections/allname')
      setAllNameElections(response.data)
    } catch (error) {
      console.error('❌ Erreur lors de récupération des données :', error.message);
    }
  };

  useEffect(() => {
    loadNuancePolitique();
    loadAllNameElections();
  }, []); 
  
  return (
    <ElectionsContext.Provider value={{ 
          loadElectionMap,
          loadResultBv,
          loadNuancePolitique,
          allNameElections, 
          electionNameSelected,
          electionSelected,
          bureauDataSelect,
          setBureauDataSelect,
          nuancePolitique
    }}>
      {children}
    </ElectionsContext.Provider>
  )
}

export const useElection = () => useContext(ElectionsContext);
