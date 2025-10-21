import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard';
import Title from './Title';
import { useAppContext } from '../Context/AppContext';

const RecommodenedHotel = () => {
  const { rooms = [], searchedCities = [] } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    let filteredHotels = [];

    if (searchedCities.length > 0) {
      // Filter rooms based on searched cities
      filteredHotels = rooms.filter(
        (room) => room.hotel && searchedCities.includes(room.hotel.city)
      );
    }

    // If no matches or no searched cities, show first 4 hotels as fallback
    if (filteredHotels.length === 0) {
      filteredHotels = rooms.slice(0, 4);
    }

    setRecommended(filteredHotels);
  }, [rooms, searchedCities]);

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title
        title='Recommended Hotels'
        subTitle='Handpicked hotels just for you — experience comfort, luxury, and unforgettable stays wherever you travel.'
      />

      <div className='flex flex-wrap justify-center gap-6 mt-6'>
        {recommended.map((room) => (
          <HotelCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RecommodenedHotel;
