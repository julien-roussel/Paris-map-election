import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
        // State pour récupérer la largeur de la page
        const [widthPage, setWidthPage] = useState(0)
        const [containerGuiMap, setContainerGuiMap] = useState(0)
        const [ratioGraph, setRatioGraph] = useState(0.8);
        const [messageElection, setMessageElection] = useState("Sélectionnez une élection");
        const [messageDepartement, setMessageDepartement] = useState("Sélectionnez un département");

        // Function pour définir la largeur de la page dans l'état widthPage
        const handleResize = () => {  
            const root = document.querySelector('#root')
            if (root) setWidthPage(root.offsetWidth)  
                
                const containerGuiMap = document.querySelector('#container-map-graph')
                if(containerGuiMap) setContainerGuiMap(containerGuiMap.offsetWidth)                
            }
            
            useEffect(() => {
                handleResize(); 
                
                return () => {
                    window.addEventListener("resize", handleResize);
                };
            }, []);
            
        useEffect(() => {
            if(root && widthPage > 860) setRatioGraph(1);
            
            if(widthPage < 860) {
                setMessageElection("Élection")
                setMessageDepartement("Département")
            } else {
                setMessageElection("Sélectionnez une élection");
                setMessageDepartement("Sélectionnez un département");
            }
        }, [widthPage]);
        

        return (
            <ResponsiveContext.Provider value={{ 
                    widthPage,
                    handleResize,
                    containerGuiMap,
                    setContainerGuiMap,
                    ratioGraph,
                    messageElection,
                    messageDepartement
                    }}>
                {children}
            </ResponsiveContext.Provider>
        )
    }
    
    export const useResponsive = () => useContext(ResponsiveContext);
    