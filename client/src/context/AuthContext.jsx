import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
    // State pour suivre l'authentification
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    // State pour stocker les infos de l'user connecté
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);

    // State pour stocker les villes et les métiers
    const [city, setCity] = useState()
    const [metiers, setMetiers] = useState([])

    // Navigate
    const navigate = useNavigate()

    useEffect(() => {
      const checkAuth = async () => {
        setIsLoading(true)
        try {
          const { data, status } = await axios.get(`${API_URL}/api/users/verify`, {
            withCredentials: true
          });
          setUserId(data.userId);
          setSession(true);  
          getUserById(data.userId);   
          setIsLoading(false)     
        } catch (error) {
          console.log(error.message);
          setSession(false);
          setAuth(null);
          setIsLoading(false)
        }
      };

      const getUserById = async (userId) => {
        try {
          const { data, status } = await axios.get(`${API_URL}/api/users/getById/${userId}`, {
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
            const { data, status } = await axios.post(`${API_URL}/api/users/login`, dataForm, {
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
        await axios.post(`${API_URL}/api/users/logout`, {}, {
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
      const { data, status } = await axios.post(`${API_URL}/api/users/signup`, dataForm, {
        withCredentials: true
      });

      if(status === 200) {
        setAuth(data.others);
        setIsLoading(false);
        setSession(true);    
        setErrMsg("Mail envoyé !"); 
      }
      if(status === 400) setErrMsg("Erreur dans les champs remplis");
      if(status === 500) setErrMsg("Une erreur s'est produite");
    } catch(error) {
      console.error("❌ Inscription échouée :", error);
      setIsLoading(false)
    }
  };

  const loadCity = async () => {
    try {
      const { data, status } = await axios.get('https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux&format=json')
      if(status === 200) setCity(data)        
    } catch(error) {
      console.log(error.message);
    }
  };

  var departements;
    if(city) departements = Array.from(new Set(city.map(c => c.code?.slice(0, 2))))
                                .sort()
                                .map(d => ({ value: d, label: d }));


   // Charger les métiers
  const loadMetiers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/profession`)
      const data = response.data;
      const arbo = data.arbo_principale;
      var professions = arbo.map(metier => ({ libelle: metier.libelle, code_metier: metier.code_metier }) )
      //var professions =  professions.concat("Retraité", "Étudiant", "Autre");
      setMetiers(professions)
    } catch (error) {
      console.error('❌ Erreur lors de récupération des données :', error.message);
    }
  };

  useEffect(() => {
    loadCity();
    loadMetiers();
  }, []);
  
  return (
    <AuthContext.Provider value={{ 
        login, 
        logout, 
        signUp,
        city,
        loadMetiers,
        metiers,
        session, 
        auth, 
        errMsg, 
        setErrMsg, 
        setIsLoading,
        isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
