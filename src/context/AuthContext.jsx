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
          const res = await axios.get(`${LOCALHOST}/api/users/verify`, {
            withCredentials: true
          });
          setSession(true);
          setAuth({ id: res.data.userId });
        } catch (err) {
          console.log("Pas connecté");
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
              console.log(data);
                setAuth(data.others);
                setIsLoading(false);
                setSession(true);   
                localStorage.setItem('token', data.token);
                localStorage.setItem("userId", data.others._id);  
                navigate('/');
            }

        } catch(error) {
          console.log(error.message);
          setIsLoading(false)
        }
    }

  return (
    <AuthContext.Provider value={{ login, session, auth, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext