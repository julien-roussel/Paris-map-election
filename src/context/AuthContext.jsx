import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

const AuthContext = createContext();
const LOCALHOST = import.meta.env.VITE_LOCALHOST;

export const AuthProvider = ({ children }) => {
    // Etat pour suivre l'authentification
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    // Etat pour stocker les infos de l'user connecté
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);

    // Navigate
    const navigate = useNavigate()

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const { data, status } = await axios.get(`${LOCALHOST}/api/users/verify`, {
            withCredentials: true
          });
          setUserId(data.userId);
          setSession(true);  
          getUserById(data.userId);        
        } catch (error) {
          console.log(error.message);
          setSession(false);
          setAuth(null);
        }
      };

      const getUserById = async (userId) => {
        try {
          const { data, status } = await axios.get(`${LOCALHOST}/api/users/getById/${userId}`, {
            withCredentials: true
          });
          setAuth(data);
          
        } catch (error) {
          console.log(error.message);
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
            setErrMsg('Votre email ou mot de passe est mauvais.');
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

  const signUp = async (dataForm) => {
    setIsLoading(true)
    try {
      const { data, status } = await axios.post(`${LOCALHOST}/api/users/signup`, dataForm, {
        withCredentials: true
      });

      if(status === 200) {
        setAuth(data.others);
        setIsLoading(false);
        setSession(true);     
      }
    } catch(error) {
      console.log(error.message);
      setErrMsg('Votre email ou mot de passe est mauvais.');
      setIsLoading(false)
    }
  };

  return (
    <AuthContext.Provider value={{ 
        login, 
        logout, 
        signUp,
        session, 
        auth, 
        errMsg, 
        setErrMsg, 
        isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
