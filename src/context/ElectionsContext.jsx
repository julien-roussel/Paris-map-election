import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase";
import axios from 'axios';

export const ElectionsContext = createContext();

export const ElectionsProvider = ({ children }) => {
  const [allNameElections, setAllNameElections] = useState(
  [
    {
      idName: 'presi2017',
      name: 'Présidentielles 2017',
      type: 'presi',
      annee: 2017
    },
    {
      idName: 'euro2019',
      name: 'Européennes 2019',
      type: 'euro',
      annee: 2019
    },
    {
      idName: 'muni2020',
      name: 'Municipales 2020',
      type: 'muni',
      annee: 2020
    },
    {
      idName: 'presi2022',
      name: 'Présidentielles 2022',
      type: 'presi',
      annee: 2022
    },
    {
      idName: 'legi2022',
      name: 'Législatives 2022',
      type: 'legi',
      annee: 2022
    },
    {
      idName: 'euro2024',
      name: 'Européennes 2024',
      type: 'euro',
      annee: 2024
    },
    {
      idName: 'legi2024',
      name: 'Législatives 2024',
      type: 'legi',
      annee: 2024
    }
  ]);

  const [bureauSelected, setBureauSelected] = useState(undefined);
  const [bureauDataSelect, setBureauDataSelect] = useState(undefined);
  const [electionNameSelected, setElectionNameSelected] = useState([])
  const [electionSelected, setElectionSelected] = useState([])
  const [nuancePolitique, setNuancePolitique] = useState([])

  // Pour charger toutes les résultats d'une élection d'un département 
  // pour la mapper sur une carte
  const loadElectionMap = async (election_name, departementSelected) => {
    setElectionNameSelected(allNameElections.filter(election => election.idName === election_name))
    if(!election_name) return
    try {
        const response = await axios.get(`http://localhost:3001/api/elections/${election_name}`, {
          params: {
            departement: departementSelected
          }
        })   
      setElectionSelected(undefined)
      const filteredResults = response.data;
      setElectionSelected(filteredResults);
      console.log(election_name + ' ' + departementSelected);
      console.log('electionSelected : ', filteredResults);
    } catch (error) {
        console.error('Erreur de récupération des données :', error);
    }
  };

  // Fonction pour sélectionner un bureau
  const selectBureau = (bureau_id) => {
    setBureauSelected(bureau_id)
  };

  // Pour charger les résultats de toutes les élections d'un bureau de vote
  const loadResultBv = async (election_name, bureauVote, departementSelected) => {
    if (!election_name || !bureauVote) return;
    //console.log('📦 Requête pour :', election_name, bureauVote);

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
            ['bureau'] : filteredResults.meta["Bureau"].toString().slice(2),
            ['arrondissement'] : filteredResults.meta["Bureau"].toString().slice(0, 2),
        }

        setBureauDataSelect(prev => {
          const newData = {
            ...prev,
            [election_name]: filteredResults, // toujours mis à jour
          };
        
          // On ne met à jour 'meta' que si on a une circonscription valide
          if (resultMeta.circo) {
            newData.meta = resultMeta;
          }
        
          return newData;
        });
    } catch (error) {
        console.error('❌ Erreur lors de récupération des données :', error.message);
    }
  };
  
  // Charger les nuances des élections disponibles
  const loadNuancePolitique = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/elections/candidats')
      setNuancePolitique(response.data)
    } catch (error) {
      console.error('❌ Erreur lors de récupération des données :', error.message);
    }
  };


  // OPTIONS D'AFFICHAGE -------------------------------
  // ---------------------------------------------------

  const [modeMap, setModeMap] = useState('first')
  const [allCandidats, setAllCandidats] = useState(true)

  // Sélection du mode pour la map
  const chooseModeMap = async (mode) => {
    setModeMap(mode)
  }
  
  const afficherAllCandidats = async (value) => {
    if (value == "allCandidats") {
      if(allCandidats==true) {
        setAllCandidats(false)
      } else {
        setAllCandidats(true)
      }
    }
  }


  useEffect(() => {
    loadNuancePolitique();
  }, []); 
  
  return (
    <ElectionsContext.Provider value={{ 
          loadElectionMap,
          loadResultBv,
          selectBureau, 
          loadNuancePolitique,
          afficherAllCandidats,
          allCandidats,
          allNameElections, 
          electionNameSelected,
          electionSelected,
          bureauSelected,
          bureauDataSelect,
          nuancePolitique,
          chooseModeMap,
          modeMap
    }}>
      {children}
    </ElectionsContext.Provider>
  )
}

export const useElection = () => useContext(ElectionsContext);
