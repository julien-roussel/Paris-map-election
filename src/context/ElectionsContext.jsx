import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase";
import axios from 'axios';

export const ElectionsContext = createContext();

export const ElectionsProvider = ({ children }) => {
  const [allNameElections, setAllNameElections] = useState([]);
  const [electionSupabase, setElectionSupabase] = useState([]);
  const [bureauSelect, setBureauSelect] = useState(undefined);
  const [bureauDataSelect, setBureauDataSelect] = useState(undefined);
  const [electionSelected, setElectionSelected] = useState([])

  const loadElectionMap = async (election_name, departementSelected) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/elections/${election_name}`, {
          params: {
            departement: departementSelected
          }
        })   

      const filteredResults = response.data;
      setElectionSelected(filteredResults);
      console.log(filteredResults);
    } catch (error) {
        console.error('Erreur de récupération des données :', error);
    }
  };

  const loadResultBv = async (election_name, bureauVote) => {
    if (!election_name || !bureauVote) return;
    console.log('📦 Requête pour :', election_name, bureauVote);

    try {
        const response = await axios.get(`http://localhost:3001/api/elections/${election_name}/${bureauVote}`)
        const filteredResults = response.data;
        setBureauDataSelect(prev => ({
          ...prev,
          [election_name]: filteredResults // ✅ fusionne avec les précédentes
        }));
        //console.log('✅ Données reçues :', filteredResults);
    } catch (error) {
        console.error('❌ Erreur lors de récupération des données :', error.message);
    }
  };

  const loadElectionSupabase = async (election_name) => {
    try {
      const {data, status, error} = await supabase.from(election_name).select("*");
      if(status === 200) setElectionSupabase(data)
    } catch(error) {
      console.log("Error fetching: ", error);
    }
  }

  const returnElection = async (election_name) => {
    try {
      const {data, status, error} = await supabase.from(election_name).select("*");      
      if(status === 200) return data
    } catch(error) {
      console.log("Error fetching: ", error);
      return undefined
    }
  }

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

  useEffect(() => {
    if(allNameElections[0]) loadElectionSupabase(allNameElections[0].idName)
  }, [allNameElections]);

  const selectBureau = (bureau_id) => {
    setBureauSelect(bureau_id)
  };

  return (
    <ElectionsContext.Provider value={{ 
          loadElectionSupabase, 
          loadElectionMap,
          returnElection,
          loadResultBv,
          selectBureau, 
          allNameElections, 
          electionSupabase, 
          electionSelected,
          bureauSelect,
          bureauDataSelect
    }}>
      {children}
    </ElectionsContext.Provider>
  )
}

export const useElection = () => useContext(ElectionsContext);
