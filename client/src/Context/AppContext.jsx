import axios from 'axios';
import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSeachedCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/rooms');
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUser = async () => {
    try {
      const token = await getToken();

      //console.log('🧩 Clerk token:', token);
      const { data } = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setIsOwner(data.role === 'hotelOwner');
        setSeachedCities(data.recentSearchedCities);
      } else {
        //retey fetching user details after 5 sec
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const syncUserToDB = async () => {
    try {
      const token = await getToken();

      await axios.post(
        '/api/sync-user',
        {
          username: user.fullName || 'Guest User',
          email: user.primaryEmailAddress?.emailAddress,
          image: user.imageUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('✅ Clerk user synced to MongoDB');
    } catch (error) {
      console.error('❌ Sync user error:', error.message);
    }
  };

  useEffect(() => {
    const initUser = async () => {
      if (!user) return;

      try {
        const token = await getToken();
        console.log('get token', token);

        // 1️⃣ Sync user to backend
        await axios.post(
          '/api/sync-user',
          {
            username: user.fullName || 'Guest User',
            email: user.primaryEmailAddress?.emailAddress,
            image: user.imageUrl,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        //console.log('✅ User synced to MongoDB');

        // 2️⃣ Fetch user data from backend
        const { data } = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setIsOwner(data.role === 'hotelOwner');
          setSeachedCities(data.recentSearchedCities);
        }
      } catch (err) {
        toast.error(err.message);
        console.error('❌ User sync/fetch error:', err.message);
      }
    };

    initUser();
  }, [user]);

  //fetcvhrooms
  useEffect(() => {
    fetchRooms();
  }, []);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    setShowHotelReg,
    showHotelReg,
    searchedCities,
    setSeachedCities,
    rooms,
    setRooms,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
