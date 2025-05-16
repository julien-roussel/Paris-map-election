import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

const AuthContext = createContext();
const LOCALHOST = import.meta.env.VITE_LOCALHOST;

export const AuthProvider = ({ children }) => {
    // Etat pour suivre l'authentification
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState(false);

    // Etat pour stocker les infos de l'user connecté
    const [auth, setAuth] = useState(null);

    // Navigate
    const navigate = useNavigate()

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const { data, status } = await axios.get(`${LOCALHOST}/api/users/verify`, {
            withCredentials: true
          });
          setSession(true);          
        } catch (err) {
          setSession(false);
          setAuth(null);
        }
      };
    
      checkAuth();
    }, []);

    const login = async (dataForm) => {
        setIsLoading(true)
        try {
            const { data, status } = await axios.post(`${LOCALHOST}/api/users/login`, dataForm, {
              withCredentials: true
            });

            if(status === 200) {
                setAuth(data.others);
                setIsLoading(false);
                setSession(true);     
                navigate('/');
            }

        } catch(error) {
          console.log(error.message);
          setIsLoading(false)
        }
    }

    const logout = async () => {
      try {
        await axios.post(`${LOCALHOST}/api/users/logout`, {}, {
          withCredentials: true,
        });
    
        // Nettoyer l'état local
        setAuth(null);
        setSession(false);
    
        // Rediriger
        navigate('/');
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      }
    };

  return (
    <AuthContext.Provider value={{ login, logout, session, auth, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext