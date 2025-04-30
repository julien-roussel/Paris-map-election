import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as d3 from 'd3';

// Context
import { useElection } from "../../context/ElectionsContext"

// Component
import Bureau from './Bureau'

const Map = (props) => {
    const [bureauVote, setBureauVote]  = useState([]);
    var API_BASE;
    if(props.departement == 75) {
        API_BASE = import.meta.env.VITE_API_PARIS_DATA_BV
    }
    const LIMIT = 100;
    
    const { electionSelected, electionNameSelected } = useElection();
    
    useEffect(() => {
        const fetchAllData = async () => {
            var allResults = [];
            var offset = 0;
            var hasMore = true;

            try {
                while (hasMore) {
                  const { data } = await axios.get(`${API_BASE}&limit=${LIMIT}&offset=${offset}`);
                  if (data.results && data.results.length > 0) {
                    allResults = [...allResults, ...data.results];
                    offset += LIMIT;
                  } else {
                    hasMore = false;
                  }
                }
                setBureauVote(allResults);
            } catch (error) {
                console.error('Erreur de récupération des données :', error);
            }
        };
        
        fetchAllData();
    }, []);

    const projection = d3.geoConicConformal()
        .center([2.35, 48.85]) // Paris
        .scale(360000)         // ajustable
        .translate([450, 360]); // position dans le svg

    const pathGenerator = d3.geoPath().projection(projection);

  return (
    <svg viewBox="0 0 800 600" version="1.1" >
        {bureauVote.map((bureau, index) => {
            const geometry = bureau.geo_shape.geometry;
            const departement = props.departement;
            var arrondissement = bureau.arrondissement_bv < 10 ? '0'+bureau.arrondissement_bv : bureau.arrondissement_bv;
            var bureau =  bureau.numero_bv < 10 ? '0' + bureau.numero_bv : bureau.numero_bv;
            
            if(electionNameSelected[0]
               && parseInt(arrondissement) < 5 
               && bureau != 10
               && bureau != 30) {
                if(electionNameSelected[0].annee < 2024) {
                    bureau = bureau.slice(1)
                    bureau = '0' + bureau
                }
            }
            var circo = bureau.circonscription_bv < 10 ? '0' + bureau.circonscription_bv : bureau.circonscription_bv;
            
            var bureauSelect = departement + '-' + arrondissement + bureau;

            if (!geometry || !geometry.coordinates) return null;

            // On crée un GeoJSON Feature pour D3
            const geoJson = {
                type: "Feature",
                geometry: geometry
            };

            return (
                <Bureau 
                    key={index}
                    bureau={bureau}
                    bureauSelect={bureauSelect} 
                    class={
                        (arrondissement && 'arr-' + arrondissement) + ' ' +
                        (circo && ' circo-' + circo)
                    } 
                    coordonne={pathGenerator(geoJson)}
                />
            )
        })}
    </svg>           
  )
}

export default Map