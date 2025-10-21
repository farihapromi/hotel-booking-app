import { roomsDummyData } from '../assets/assets';
import HotelCard from './HotelCard';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import { useState } from 'react';

const RecommodenedHotel = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);
  const filterHotels = () => {
    const filteredHotels = rooms
      .slice()
      .filter((room) => searchedCities.includes(room.hotel.city));
  };

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title
        title='Featured Destination'
        subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'
      />
      {rooms.length > 0 ? (
        <div className='flex flex-wrap justify-center gap-6'>
          {rooms.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
      ) : (
        <p className='text-gray-500 mt-6'>Loading featured rooms...</p>
      )}
      {/* 
Button */}
      <button
        onClick={() => {
          navigate('/rooms');
          scrollTo(0, 0);
        }}
        className='bg-blue-400 text-white  px-4 py-4 mt-8  my-16 rounded-lg hover:bg-blue-600 transition-all cursor-pointer'
      >
        View All Destinations
      </button>
    </div>
  );
};

export default RecommodenedHotel;
