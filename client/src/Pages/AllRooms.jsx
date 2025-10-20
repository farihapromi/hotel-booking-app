import React, { useMemo, useState } from 'react';
import { roomsDummyData } from '../assets/assets';
import RoomCard from './RoomCard';
import { CheckBox, RadioButton } from '../Components/FiltesOptions';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms = roomsDummyData, currency } = useAppContext(); // fallback

  const [openFilters, setOpenFilters] = useState(false);

  // SINGLE-SELECTION state (only one item can be selected per filter)
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: '', // single selection
    priceRange: '', // single selection
  });

  const [selectedSort, setSelectedSort] = useState('');

  const roomTypes = ['Single Bed', 'Double Bed', 'Luxury Bed', 'Family Suite'];
  const priceRanges = [
    '0 to 500',
    '500 to 1000',
    '1000 to 2000',
    '2000 to 3000',
  ];
  const sortOptions = [
    'Price Low to High',
    'Price High to Low',
    'Newest First',
  ];

  // Handle filter checkbox change (single selection only)
  const handleFilterChange = (value, type) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? '' : value, // toggle selection
    }));
  };

  const handleSortChange = (option) => setSelectedSort(option);

  const matchesRoomType = (room) =>
    !selectedFilters.roomType || room.roomType === selectedFilters.roomType;

  const matchesPriceRange = (room) => {
    if (!selectedFilters.priceRange) return true;
    const [min, max] = selectedFilters.priceRange.split(' to ').map(Number);
    return room.pricePerNight >= min && room.pricePerNight <= max;
  };

  const filterDestination = (room) => {
    const destination = searchParams.get('destination');
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  const sortRooms = (a, b) => {
    if (selectedSort === 'Price Low to High')
      return a.pricePerNight - b.pricePerNight;
    if (selectedSort === 'Price High to Low')
      return b.pricePerNight - a.pricePerNight;
    if (selectedSort === 'Newest First')
      return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  };

  const filteredRooms = useMemo(
    () =>
      rooms
        .filter(
          (room) =>
            matchesRoomType(room) &&
            matchesPriceRange(room) &&
            filterDestination(room)
        )
        .sort(sortRooms),
    [rooms, selectedFilters, selectedSort, searchParams]
  );

  const clearFilters = () => {
    setSelectedFilters({ roomType: '', priceRange: '' });
    setSelectedSort('');
    setSearchParams({});
  };

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-6 md:px-16 lg:px-24 xl:px-32'>
      {/* Room Listings */}
      <div className='flex-1'>
        <div className='flex flex-col items-start text-left mb-8'>
          <h1 className='font-bold text-4xl font-playfair text-blue-400'>
            Hotel Rooms
          </h1>
          <p className='text-sm md:text-base text-black mt-2 max-w-174'>
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => <RoomCard key={room._id} rooms={room} />)
        ) : (
          <p className='text-gray-500'>
            No rooms found for the selected filters.
          </p>
        )}
      </div>

      {/* Filters Sidebar */}
      <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
        <div className='flex items-center justify-between px-5 py-3 border-b border-gray-300'>
          <p className='text-base font-medium text-gray-800'>FILTERS</p>
          <span
            onClick={clearFilters}
            className='text-xs cursor-pointer text-blue-400'
          >
            CLEAR
          </span>
        </div>

        <div className='px-5 pt-5'>
          {/* Room Type Filters */}
          <p className='font-medium text-gray-800 pb-2'>Room Type</p>
          {roomTypes.map((room, index) => (
            <CheckBox
              key={index}
              label={room}
              selected={selectedFilters.roomType === room} // only one selected
              onChange={() => handleFilterChange(room, 'roomType')}
            />
          ))}

          {/* Price Filters */}
          <p className='font-medium text-gray-800 pb-2 pt-5'>Price Range</p>
          {priceRanges.map((range, index) => (
            <CheckBox
              key={index}
              label={range}
              selected={selectedFilters.priceRange === range} // only one selected
              onChange={() => handleFilterChange(range, 'priceRange')}
            />
          ))}

          {/* Sort Options */}
          <p className='font-medium text-gray-800 pb-2 pt-5'>Sort By</p>
          {sortOptions.map((option) => (
            <RadioButton
              key={option}
              label={option}
              selected={selectedSort === option}
              onChange={() => handleSortChange(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
