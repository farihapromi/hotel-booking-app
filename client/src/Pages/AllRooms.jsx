import React, { useMemo, useState } from 'react';
import { roomsDummyData } from '../assets/assets';
import RoomCard from './RoomCard';
import { CheckBox, RadioButton } from '../Components/FiltesOptions';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();

  const [openFilters, setOpenFilters] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  cont[(selectedSort, setSelectedSort)] = useState('');

  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState('');

  const handleRoomTypeChange = (checked, label) => {
    setSelectedRoomTypes((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

  const handlePriceRangeChange = (checked, label) => {
    setSelectedPriceRanges((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

  const handleSortOptionChange = (checked, label) => {
    if (checked) setSelectedSortOption(label);
  };

  const roomTypes = ['Single Bed', 'Double Bed', 'Luxury Bed', 'Family Suite'];
  const PriceRanges = [
    '0 to 500',
    '500 to 1000',
    '1000 to 2000',
    '2000 to 3000',
  ];
  const sortOptions = [
    'Price Low to High',
    'Price High to Low',
    'Newsest First',
  ];

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type].push(value);
      } else {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
        return updatedFilters;
      }
    });
  };
  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    //funciton to check if a room mathec the selcted room types
    const mathcesRoomType = (room) => {
      return (
        setSelectedFilters.roomType.length === 0 ||
        selectedFilters.roomType.includes(room.roomType)
      );
    };
  };
  //fucniton to check if a room matches seletced price ranges
  const matchesPriceRange = (room) => {
    return (
      selectedFilters.priceRange.length === 0 ||
      selectedFilters.priceRange.some((range) => {
        const [min, max] = range.split(' to ').map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };
  const sortRooms = (a, b) => {
    if (selectedSort === 'Price Low to High') {
      return a.pricePerNight - b.pricePerNight;
    }
    if (selectedSort === 'Price High to Low  ') {
      return b.pricePerNight - a.pricePerNight;
    }
    if (selectedSort === 'Newest First ') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };
  //filter destination
  const filterDestination = (room) => {
    const destination = searchParams.get('destination');
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };
  //filter and sort room bases on selcted fitler and srt options
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          mathcesRoomType(room) &&
          matchesPriceRange(room) &&
          filterDestination(room)
      )
      .sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);
  //clear all fitler
  const clearFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort('');
    setSearchParams({});
  };

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div>
        <div className='flex flex-col items-start text-left'>
          <h1 className='font-bold text-4xl font-playfair text-blue-400'>
            Hotel Rooms
          </h1>
          <p className='tetx-sm md:text-base text-black mt-2 max-w-174'>
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {/* room card */}
        {roomsDummyData.map((rooms) => (
          <RoomCard key={rooms._id} rooms={rooms} />
        ))}
      </div>

      {/* filters */}
      <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
        <div
          className={`flex items-center justify-between px-5 py-3 min-lg:border-b border-gray-300 ${
            openFilters && 'border-b'
          }`}
        >
          <p className='text-base font-medium text-gray-800'>FILTERS</p>
          <div className='textt-xs cursor-pointer'>
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className='lg:hidden'
            >
              {openFilters ? 'HIDE' : 'SHOW'}
            </span>
            <span className='hidden lg:block'>CLEAR</span>
          </div>
        </div>
        {/* filters items */}
        <div
          className={`${
            openFilters ? 'h-auto' : 'h-0 lg:h-auto'
          } overflow-hidden transition-all duration-700`}
        >
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Popular Filters</p>
            {roomTypes.map((room) => (
              <CheckBox
                key={room}
                label={room}
                selected={selectedRoomTypes.includes(room)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>
          {/* for price */}
          <div className='px-5 pt-5 text-blue-400 font-bold'>
            <p className='font-medium text-gray-800 pb-2 text-xl'>
              Price Ranges
            </p>
            {PriceRanges.map((price) => (
              <CheckBox
                key={price}
                label={`$ ${price}`}
                selected={selectedPriceRanges.includes(`$ ${price}`)}
                onChange={handlePriceRangeChange}
              />
            ))}
          </div>
          {/* sort options */}
          <div className='px-5 pt-5 pb-7'>
            <p className='font-medium text-gray-800 pb-2'>Sort By</p>
            {sortOptions.map((option) => (
              <RadioButton
                key={option}
                label={option}
                selected={selectedSortOption === option}
                onChange={handleSortOptionChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
