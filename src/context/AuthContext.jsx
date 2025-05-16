import { createContext, useState } from "react";
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

    const login = async (dataForm) => {
        setIsLoading(true)
        try {
            const { data, status } = await axios.post(`${LOCALHOST}/api/users/login`, dataForm);

            if(status === 200) {
                setAuth(data.others);
                navigate('/')
                setIsLoading(false);
                setSession(true)                
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