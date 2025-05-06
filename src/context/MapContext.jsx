import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [bureauVote, setBureauVote]  = useState(null);
    const [bureauSelected, setBureauSelected] = useState(undefined);

    // Pour charger les bureaux de la carte selon le département 
    const loadMapBureau = async (departementSelected) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/map?departement=${departementSelected}`);
            console.log(response.data);
            
            setBureauVote(response.data); 
        } catch (err) {
            console.error("Erreur de chargement GeoJSON :", err.message);
        }
    };

    // Fonction pour sélectionner un bureau
    const selectBureau = (bureau_id) => {
        setBureauSelected(bureau_id)
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

    return (
        <MapContext.Provider value={{ 
            loadMapBureau,
            bureauVote,
            afficherAllCandidats,
            allCandidats,
            chooseModeMap,
            modeMap,
            selectBureau,
            bureauSelected
        }}>
            {children}
        </MapContext.Provider>
    )
}

export const useMap = () => useContext(MapContext);
