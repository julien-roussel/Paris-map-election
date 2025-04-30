import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Context
import { useElection } from "../../context/ElectionsContext"

// Component
import Bureau from './Bureau'

const Map = (props) => {
    const { electionSelected, electionNameSelected, selectBureau, bureauSelect } = useElection();
    const [bureauVote, setBureauVote]  = useState(null);
    
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

      const style = (feature) => {
        const features = feature.properties;
        const bureauId = features.codeDepartement+'-'+features.numeroBureauVote;
        const result = electionSelected[bureauId]; 
        const abstention = result?.meta?.Abstentions;
        const inscrits = result?.meta?.Inscrits;
        
        return {
            fillColor: 'black',
            color: 'white',
            weight: 0.5,
            fillOpacity: 0.6
        };
      };

      const onEachFeature = (feature, layer) => {
        const features = feature.properties;
        const bureauId = features.codeDepartement+'-'+features.numeroBureauVote;
    
        layer.on({
          click: () => {
            selectBureau && selectBureau(bureauId);
          },
        });
    
        layer.bindTooltip(`Bureau ${bureauId}`, {
            permanent: false,
            direction: "top"
          });
      };

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
          style={style}
          onEachFeature={onEachFeature}
          scrollWheelZoom={false}
          doubleClickZoom={false}  
        />
      )}
    </MapContainer>        
  )
}

export default Map