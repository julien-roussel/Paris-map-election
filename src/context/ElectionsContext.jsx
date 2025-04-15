import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase";
import axios from 'axios';

export const ElectionsContext = createContext();

export const ElectionsProvider = ({ children }) => {
  const [allNameElections, setAllNameElections] = useState([]);
  const [bureauSelect, setBureauSelect] = useState(undefined);
  const [bureauDataSelect, setBureauDataSelect] = useState(undefined);
  const [electionSelected, setElectionSelected] = useState([])

  // Pour charger toutes les résultats d'une élection d'un département 
  // pour la mapper sur une carte
  const loadElectionMap = async (election_name, departementSelected) => {
    if(!election_name) return
    try {
        const response = await axios.get(`http://localhost:3001/api/elections/${election_name}`, {
          params: {
            departement: departementSelected
          }
        })   

      const filteredResults = response.data;
      setElectionSelected(filteredResults);
      console.log('electionSelected : ', filteredResults);
    } catch (error) {
        console.error('Erreur de récupération des données :', error);
    }
  };

  // Pour charger les résultats de toutes les élections d'un bureau de vote
  const loadResultBv = async (election_name, bureauVote) => {
    if (!election_name || !bureauVote) return;
    console.log('📦 Requête pour :', election_name, bureauVote);

    try {
        const response = await axios.get(`http://localhost:3001/api/elections/${election_name}/${bureauVote}`)
        const filteredResults = response.data;
        const resultMeta = {
            ['departement'] : filteredResults.meta["Code du département"],
            ['circo'] : filteredResults.meta["Code de la circonscription"],
            ['arrondissement'] : filteredResults.meta["Bureau"].slice(0, 2),
            ['bureau'] : filteredResults.meta["Bureau"].slice(2),
        }

        setBureauDataSelect(prev => ({
          ...prev,
          ['meta']: resultMeta,
          [election_name]: filteredResults // ✅ fusionne avec les précédentes
        }));
        //console.log('✅ Données reçues :', filteredResults);
    } catch (error) {
        console.error('❌ Erreur lors de récupération des données :', error.message);
    }
  };

  useEffect(() => {
    const fetchAllNameElection = async () => {
    try {
      const {data, status, error} = await supabase.from("Names-elections").select("*");      
      if(status === 200) setAllNameElections(data)
    } catch(error) {
      console.log("Error fetching: ", error);
    }
  }
  fetchAllNameElection();
  }, []); 

  const selectBureau = (bureau_id) => {
    setBureauSelect(bureau_id)
  };

  return (
    <ElectionsContext.Provider value={{ 
          loadElectionMap,
          loadResultBv,
          selectBureau, 
          allNameElections, 
          electionSelected,
          bureauSelect,
          bureauDataSelect
    }}>
      {children}
    </ElectionsContext.Provider>
  )
}

export const useElection = () => useContext(ElectionsContext);
