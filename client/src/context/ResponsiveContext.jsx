import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
        // State pour récupérer la largeur de la page
        const [widthPage, setWidthPage] = useState(0)
        
        // Function pour définir la largeur de la page dans l'état widthPage
        const handleResize = () => {  
            setWidthPage(document.querySelector('#root').offsetWidth)  
        }

        useEffect(() => {
            window.addEventListener("resize", handleResize);
            handleResize(); // Lancer la function au chargement 
            
            return () => {
                // Dès que la fenêtre est redimensionner, relancer la function
                window.addEventListener("resize", handleResize);
            };
        }, []);
        

        return (
            <ResponsiveContext.Provider value={{ 
                    widthPage,
                    handleResize
                    }}>
                {children}
            </ResponsiveContext.Provider>
        )
    }
    
    export const useResponsive = () => useContext(ResponsiveContext);
    