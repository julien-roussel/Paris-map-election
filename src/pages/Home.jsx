import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as d3 from 'd3';

const Home = () => {
    const [bureauVote, setBureauVote]  = useState([]);
    const API_BASE = import.meta.env.VITE_API_PARIS_DATA_BV
    const LIMIT = 100;

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
                console.log(allResults[0].geo_shape.geometry.coordinates);
                setBureauVote(allResults);
                console.log('Total bureaux :', allResults.length);
            } catch (error) {
                console.error('Erreur de récupération des données :', error);
            }
        };
        
        fetchAllData();
    }, []);

     // Projection : adaptée pour la France
    const projection = d3.geoConicConformal()
        .center([2.35, 48.85]) // Paris
        .scale(350000)         // ajustable
        .translate([450, 360]); // position dans le svg

    const pathGenerator = d3.geoPath().projection(projection);

  return (
    <div id="homepage">
        <h1>Analyse élections</h1>
        <div id="container" className="map">
            <div id="map-container" className="map-image"> 
                <svg width="800" height="600" version="1.1" >
                    {bureauVote.map((bureau, index) => {
                        const geometry = bureau.geo_shape.geometry;
                        if (!geometry || !geometry.coordinates) return null;

                        // On crée un GeoJSON Feature pour D3
                        const geoJson = {
                            type: "Feature",
                            geometry: geometry
                        };

                        return (
                            <a  id={'bureau-'+bureau.id_bv} 
                                className={
                                    'arr-' + bureau.arrondissement_bv +
                                    ' circo-' + bureau.circonscription_bv
                                } 
                                key={index}>
                                <path 
                                    d={pathGenerator(geoJson)}
                                    fill="black"
                                    stroke="white"
                                    strokeWidth={0.5}
                                />
                            </a>
                        )
                    })}
                </svg>
            </div>
        </div>
    </div>
  )
}

export default Home