import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Context
import { useElection } from "../../context/ElectionsContext"

const Map = (props) => {
    const { electionSelected, electionNameSelected, selectBureau, bureauSelect, modeMap } = useElection();
    const [bureauVote, setBureauVote]  = useState(null);
    const [onEachFeature, setOnEachFeature] = useState(() => () => {});

    
    function getOpacityFromScore(inscrits, score) {
        if (!inscrits || !score || inscrits === 0) return 0.3;
        
        const taux = score / inscrits;
        
        // On mappe de 0%–80% d'abstention ➜ 0.5–1 d’opacité
        const minOpacity = 0.2;
        const maxOpacity = 1;
        const maxTaux = 0.5;
        
        const normalized = Math.min(taux / maxTaux, 1); // max à 1
        const opacity = minOpacity + normalized * (maxOpacity - minOpacity);
        
        return Math.round(opacity * 100) / 100; // arrondi à 2 décimales
    }
    
    const  getOpacityFromAbstention = (inscrits, abstentions) => {
        if (!inscrits || !abstentions) return 0;
        const taux = abstentions / inscrits;
        return Math.min(Math.max(taux, 0), 1); // clamp entre 0 et 1
      };

    const getNuanceColor = (parti) => {
        if (!parti) return 'gray';
          switch (parti) {
            case 'LO': return '#892b16';
            case 'PCF': return '#892b16';
            case 'NFP': return '#ff5d5d';
            case 'NUPES': return '#ff5d5d';
            case 'LFI': return '#cd3256';
            case 'DVG': return '#a82162';
            case 'PS': return '#ea4693';
            case 'EELV': return '#2dc380';
            case 'DVC': return '#f58c58';
            case 'LDIV': return '#f58c58';
            case 'LREM': return '#ffb847';
            case 'ENS': return '#ffb847';
            case 'EM': return '#ffb847';
            case 'CEN': return '#ffb847';
            case 'REN': return '#ffb847';
            case 'LR': return '#0622ac';
            case 'UXD': return '#32066f';
            case 'RN': return '#74574b';
            case 'REC': return '#4d403b';
            default:
                console.warn("❓ Parti inconnu:", parti);
                return 'gray';
          }
    };

    const getVoixGauche = (candidats) => {
        const nuancesGauche = ['RDG', 'UG', 'NUP', 'ECO', 'DVG', 'DXG'];
        return candidats
          .filter(c => nuancesGauche.includes(c.nuance?.toUpperCase()))
          .reduce((total, c) => total + (c.voix || 0), 0);
      };

    useEffect(() => {
        const fetchGeoJSON = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/map?departement=${props.departement}`);
                console.log(response.data);
                
                setBureauVote(response.data); 
            } catch (err) {
                console.error("Erreur de chargement GeoJSON :", err.message);
            }
        };
        fetchGeoJSON();
    }, []);

    const dynamicStyle = useMemo(() => {
        return (feature) => {
            const features = feature.properties;
            const bureauId = features.codeDepartement+'-'+features.numeroBureauVote;
            const result = electionSelected[bureauId]; 
            const abstention = result?.meta?.Abstentions;
            const inscrits = result?.meta?.Inscrits;
            const candidats = electionSelected[bureauId]?.candidats || [];
            
            var fillColor;
            var fillOpacity;

            if (modeMap === 'abstention') {
                fillColor = 'black';
                fillOpacity = getOpacityFromAbstention(inscrits, abstention);
            } else if (modeMap === 'first') {
                const candidatsTri = [...candidats].sort((a, b) => b.voix - a.voix);
                fillColor = getNuanceColor(candidatsTri[0]?.parti_code);
                fillOpacity = getOpacityFromScore(inscrits, candidatsTri[0]?.voix);
            } else if (modeMap === 'gauche') {
                fillOpacity = getOpacityFromScore(inscrits, getVoixGauche(candidats));
                fillColor = '#ff5d5d';
            }
                        
            return {
                fillColor,
                color: 'white',
                weight: 0.5,
                fillOpacity,
            }
        };
    }, [electionSelected, modeMap]);

    useEffect(() => {
        const dynamicOnEachFeature = (feature, layer) => {
            const features = feature.properties;
            var arrondissement = features.codeCirconscription
            arrondissement = arrondissement.slice(2)
            var bureau = features.numeroBureauVote;
            bureau = bureau.slice(2)
            
            const bureauId = features.codeDepartement+'-'+features.numeroBureauVote;
            
            layer.on({
                click: () => {
                selectBureau && selectBureau(bureauId);
                console.log(features);
                
                },
            });

            layer.bindTooltip(`Bureau ${bureauId}`, {
                permanent: false,
                direction: "top"
            });
        }

        setOnEachFeature(() => dynamicOnEachFeature);
    }, [electionNameSelected, electionSelected]);

  return (
    <MapContainer center={[48.85, 2.35]} minZoom={11} zoom={13} maxZoom={15} scrollWheelZoom={true} style={{ height: "90vh", width: "100%" }}>
        <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='© OpenStreetMap, © CartoDB'
        />
        {bureauVote && (
        <GeoJSON
          key={props.departement}
          data={bureauVote}
          style={dynamicStyle}
          onEachFeature={onEachFeature}
          scrollWheelZoom={false}
          doubleClickZoom={false}  
        />
      )}
    </MapContainer>        
  )
}

export default Map