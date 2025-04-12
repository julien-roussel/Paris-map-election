import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase";

export const ElectionsContext = createContext();

export const ElectionsProvider = ({ children }) => {
  const [allNameElections, setAllNameElections] = useState([]);
  const [electionMap, setElectionMap] = useState([]);
  const [bureauSelect, setBureauSelect] = useState([]);

  const loadElectionMap = async (election_name) => {
    try {
      const {data, status, error} = await supabase.from(election_name).select("*");
      if(status === 200) setElectionMap(data)
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
    if(allNameElections[0]) loadElectionMap(allNameElections[0].idName)
  }, [allNameElections]);

  const selectBureau = (bureau_id) => {
    setBureauSelect(bureau_id)
  };

  return (
    <ElectionsContext.Provider value={{ 
          allNameElections, 
          electionMap, 
          returnElection,
          loadElectionMap, 
          selectBureau, 
          bureauSelect 
    }}>
      {children}
    </ElectionsContext.Provider>
  )
}

export const useElection = () => useContext(ElectionsContext);
