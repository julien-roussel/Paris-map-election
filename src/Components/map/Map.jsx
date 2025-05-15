import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { MapContainer, LayersControl, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// CSS
import './map.scss'

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"

// Component
import MapAutoCenter from './MapAutoCenter' 
import ContainerPopUp from '../select/ContainerPopUp' 

const Map = (props) => {
    const { departement } = useParams();
    const { electionSelected, electionNameSelected, loadElectionMap, bureauDataSelect, setBureauDataSelect } = useElection();
    const { modeMap, loadMapBureau, bureauVote, selectBureau, bureauSelected, allNameMap } = useMap();
    
    const { BaseLayer, Overlay } = LayersControl;

    // Charger les bureaux sur la map
    useEffect(() => {
        loadMapBureau(departement)
        loadElectionMap(electionNameSelected[0]?.idName ,departement)
    }, [departement]);

    function getOpacityFromScore(inscrits, score) {
        if (!inscrits || !score || inscrits === 0) return 0.3;
        
        const taux = score / inscrits;
        
        // On mappe de 0%–80% d'abstention ➜ 0.5–1 d’opacité
        const minOpacity = 0.2;
        const maxOpacity = 1;
        const maxTaux = 0.9;
        
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
            case 'PCF': return '#7d180d';
            case 'NFP': return '#ff5d5d';
            case 'NUPES': return '#ff5d5d';
            case 'FI': return '#cd3256';
            case 'LFI': return '#cd3256';
            case 'DVG': return '#a82162';
            case 'PS': return '#ea4693';
            case 'EELV': return '#2dc380';
            case 'DVC': return '#f58c58';
            case 'DIV': return '#f58c58';
            case 'LDIV': return '#f58c58';
            case 'LREM': return '#ffb847';
            case 'ENS': return '#ffb847';
            case 'EM': return '#ffb847';
            case 'UDI': return '#ffb847';
            case 'CEN': return '#ffb847';
            case 'REN': return '#ffb847';
            case 'HOR': return '#005dc7';
            case 'LR': return '#0622ac';
            case 'UXD': return '#32066f';
            case 'DSV': return '#32066f';
            case 'DLF': return '#32066f';
            case 'FN': return '#74574b';
            case 'RN': return '#74574b';
            case 'EXD': return '#74574b';
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

    const dynamicStyle = useMemo(() => {
        return (feature) => {
            const features = feature.properties;
            var commune = features.codeCommune;
            const bureauId = commune+'-'+features.numeroBureauVote;
            const result = electionSelected[bureauId]; 
            const abstention = result?.meta?.Abstentions;
            const inscrits = result?.meta?.Inscrits;
            const candidats = electionSelected[bureauId]?.candidats || [];
            
            var isSelected = false;
            if(bureauId === bureauSelected) isSelected = true;

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
           
            if(isSelected) fillColor = 'black';
            
            return {
                fillColor,
                color: 'white',
                weight: 0.5,
                fillOpacity,
            }
        };
    }, [electionSelected, modeMap, bureauSelected]);

    const dynamicOnEachFeature = useCallback((feature, layer) => {
        const features = feature.properties;
        var commune = features.codeCommune;
        var circonscription = features.codeCirconscription
        circonscription = circonscription.slice(2)
        var bureau = features.numeroBureauVote;
        bureau = bureau.slice(2)
        
        const bureauId = commune+'-'+features.numeroBureauVote;
        
        if (bureauId === bureauSelected) {            
            layer.getElement()?.classList.add("bureau-selected");
        } else {
            layer.getElement()?.classList.remove("bureau-selected");
        }

        layer.on({
            click: () => {  
                selectBureau(bureauId);

                setBureauDataSelect(prev => ({
                    ...(prev?.meta || {}),
                    meta: {
                        ...(prev?.meta || {}),
                        bureau: bureau,
                        nomDepartement: features.nomDepartement,
                        nomCommune: features.nomCommune,
                    }
                }));
            }
        })

        layer.bindTooltip(`
            <h4>${features.nomCommune}</h4>
            <span>${features.nomDepartement}</span></br>
            <span>Circonscription n°${circonscription} /</span>
            <span>Bureau n°${bureau}</span>
            `, 
        {
            permanent: false,
            direction: "top"
        });
    }, [electionNameSelected, electionSelected, bureauSelected]);

    const computedCenter = useMemo(() => {
        if (departement && allNameMap?.[departement]?.pos) {
            return allNameMap[departement].pos;
        }
        return null;
    }, [departement]);

    if (!departement || !allNameMap?.[departement]?.pos) {
        return  (
            <>
                <div id="container-nomap">
                    <ContainerPopUp/>
                </div>
                <MapContainer 
                    center={[48.8566, 2.3522]}
                    minZoom={7} zoom={10} maxZoom={15} 
                    scrollWheelZoom={true} 
                    style={{ height: "90vh", width: "100%" }}>

                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='© OpenStreetMap, © CartoDB' />  
                </MapContainer>
            </>
        )
    }
    
    return (
        <MapContainer 
            center={allNameMap[departement].pos}
            minZoom={7} zoom={10} maxZoom={15} 
            scrollWheelZoom={true} 
            style={{ height: "90vh", width: "100%" }}>
            <MapAutoCenter center={computedCenter} />

            <LayersControl position="topright">
                <Overlay checked name="Street map">
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='© OpenStreetMap, © CartoDB'
                    />  
                </Overlay>    

                {bureauVote?.features?.length > 0 && (
                    <Overlay checked name="Bureaux de vote">
                        <GeoJSON
                            key={departement + '-' + bureauVote.features.length}
                            data={bureauVote}
                            style={dynamicStyle}
                            onEachFeature={dynamicOnEachFeature}
                            scrollWheelZoom={false}
                            doubleClickZoom={false}  
                        />
                    </Overlay>
                )}
            </LayersControl>
        </MapContainer>        
    )
}

export default Map