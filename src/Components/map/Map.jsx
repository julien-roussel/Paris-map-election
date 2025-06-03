import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { MapContainer, LayersControl, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// CSS
import stylesMap from './map.module.scss';

// Context
import { useElection } from "../../context/ElectionsContext"
import { useMap } from "../../context/MapContext"
import { useAuth } from "../../context/AuthContext"

// Component
import MapAutoCenter from './MapAutoCenter' 
import ContainerPopUp from '../select/ContainerPopUp' 
import ContainerStats from '../stats/ContainerStats';

const Map = () => {
    // Params
    const { departement } = useParams();

    // Context
    const { electionSelected, 
            electionNameSelected, 
            loadElectionMapMember, 
            loadElectionsMapConnected, 
            loadElectionMapNoConnected,
            nuancePolitique,
            setBureauDataSelect } = useElection();
    const { modeMap, loadMapBureau, bureauVote, selectBureau, bureauSelected, allNameMap } = useMap();
    const { auth, session } = useAuth();

    const { BaseLayer, Overlay } = LayersControl;
    
    // State 
    const [departementInfo, setDepartementInfo] = useState();

    // Charger les bureaux sur la map
    useEffect(() => {
        loadMapBureau(departement)
        if(auth?.isSuscriber) loadElectionMapMember(electionNameSelected[0]?.idName, auth._id ,departement)
        if(session && !auth?.isSuscriber) loadElectionsMapConnected(auth?._id, departement)
        if(!session) loadElectionMapNoConnected(departement)
        setDepartementInfo(allNameMap?.find(dept => dept.numero === departement))
    }, [departement]);

    useEffect(() => {
        setDepartementInfo(allNameMap?.find(dept => dept.numero === departement))
    }, [departement, allNameMap]);

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
        if (nuancePolitique[parti]) {            
            return nuancePolitique[parti].color;
        }
        return 'gray';
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
        return departementInfo?.pos || [48.8566, 2.3522];
    }, [departementInfo]);

    if (!departement || !departementInfo?.pos) {
        return  (
            <>
                <div id={stylesMap["container-popup"]}>
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
        <div>
            <MapContainer 
                center={departementInfo?.pos || [48.8566, 2.3522]}
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
            <ContainerStats/>               
        </div>  
    )
}

export default Map