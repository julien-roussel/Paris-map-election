import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

export const MapContext = createContext();

const LOCALHOST = import.meta.env.VITE_LOCALHOST;

export const MapProvider = ({ children }) => {
    const [bureauVote, setBureauVote]  = useState(null);
    const [bureauSelected, setBureauSelected] = useState(undefined);
    const [allNameMap, setAllNameMap] = useState();

    // Pour charger les bureaux de la carte selon le département 
    const loadMapBureau = async (departementSelected) => {
        if(!departementSelected) return;

        try {
            const response = await axios.get(`${LOCALHOST}/api/map/getbydepartement?departement=${departementSelected}`);
            const data = response.data;
            console.log('bureauVote : ', data);
            setTimeout(() => {
                setBureauVote(data);
              }, 50);
        } catch (err) {
            console.error("Erreur de chargement GeoJSON :", err.message);
        }
    };

    // Fonction pour sélectionner un bureau
    const selectBureau = (bureau_id) => {
        setBureauSelected(bureau_id)
    };

    // Pour charger tous les noms de département
    const loadAllNameMap = async () => {
        try {
            const response = await axios.get(`${LOCALHOST}/api/map/alldepartement`);   
            setAllNameMap(response.data)
        } catch (error) {
            console.error("Erreur de chargement GeoJSON :", error.message);
        }
    }

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

    return (
        <MapContext.Provider value={{ 
            loadMapBureau,
            bureauVote,
            afficherAllCandidats,
            allCandidats,
            chooseModeMap,
            modeMap,
            selectBureau,
            bureauSelected,
            loadAllNameMap,
            allNameMap
        }}>
            {children}
        </MapContext.Provider>
    )
}

export const useMap = () => useContext(MapContext);
