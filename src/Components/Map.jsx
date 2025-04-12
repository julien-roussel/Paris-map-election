import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as d3 from 'd3';

// Context
import { useElection } from "../context/ElectionsContext"

const Map = () => {
    const [bureauVote, setBureauVote]  = useState([]);
    const API_BASE = import.meta.env.VITE_API_PARIS_DATA_BV
    const LIMIT = 100;

    const { electionMap, selectBureau } = useElection();

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
            const circo = bureau.circonscription_bv;
            const bureauSelect = (bureau.circonscription_bv < 10) ?
                    'bureau-' + bureau.arrondissement_bv + '-0' + bureau.circonscription_bv :
                    'bureau-' + bureau.arrondissement_bv + '-' + bureau.circonscription_bv;
            const bureauData = electionMap.find(bureau => bureau.id === bureauSelect);

            if (!geometry || !geometry.coordinates) return null;

            // On crée un GeoJSON Feature pour D3
            const geoJson = {
                type: "Feature",
                geometry: geometry
            };

            return (
                <path 
                    id={bureauSelect} 
                    className={
                        'arr-' + bureau.arrondissement_bv +
                        ' circo-' + bureau.circonscription_bv
                    } 
                    key={index}
                    d={pathGenerator(geoJson)}
                    fill="black"
                    stroke="white"
                    fillOpacity={bureauData ? bureauData.Abstentions/bureauData.Inscrits*4 : '1'}
                    strokeWidth={0.5}
                    onClick={() => selectBureau(bureauSelect)}
                />
            )
        })}
    </svg>           
  )
}

export default Map