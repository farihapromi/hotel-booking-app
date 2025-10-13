import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth;
  const [isOwner, setIsOwner] = useState(false);
  const [showHotel, setShowHotelReg] = useState(false);
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
    } catch (error) {}
  };

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    setShowHotelReg,
    showHotel,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
