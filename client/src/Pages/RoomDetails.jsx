import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import StarRating from '../Components/StarRating';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, []);
  return (
    room && (
      <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
        {/* room details */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
          <h1 className='text-3xl md:text-4xl font-playfair'>
            {room.hotel.name}
            <span className='font-inter text-sm'>({room.roomType})</span>
          </h1>
          <p className='font-inter text-xm py-1.5 px-3 text-white bg-orange-500 rounded-full'>
            20% OFF
          </p>
        </div>
        {/* room rating */}
        <div className='flex items-center gap-1 mt-2'>
          {/* <StarRating /> */}
          <StarRating />
          <p className='ml-2'>200+ reviews</p>
        </div>
        {/* room address */}
        <div className='flex items-center gap-2 text-gray-500 mt-2 '>
          <img src={assets.locationIcon} alt='' />
          <span>{room.hotel.address}</span>
        </div>
        {/* ROOM IMAGES */}
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
          <div className='lg:w-1/2 w-full'>
            <img
              src={mainImage}
              alt=''
              className='w-full rounded-xl shadow-lg object-cover'
            />
          </div>
          <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt='room image'
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImage === image && 'outline-3 outline-orange-500'
                  }`}
                />
              ))}
          </div>
        </div>
        {/* room hightlights */}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
          <div>
            <h1 className='font-playfair text-3xl md:text-4xl'>
              Experinece Luxary Like Never Before
            </h1>
            <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'
                >
                  <img
                    src={facilityIcons[item]}
                    alt='item'
                    className='w-5 h-5'
                  />
                  <p className='text-xs'>{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Room Price */}
          <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
        </div>
        {/* Check in check out form */}
        <form
          className='flex flex-col md:flex-row items-start md:item-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'
          action=''
        >
          <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
            <div className='flex flex-col'>
              <label htmlFor='CheckIn' className='font-medium'>
                Check-In
              </label>
              <input
                type='date'
                id='checkInDate'
                placeholder='Check-In'
                className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='CheckOut' className='font-medium'>
                Check-Out
              </label>
              <input
                type='date'
                id='checkOutDate'
                placeholder='Check-Out'
                className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='guests' className='font-medium'>
                Guests
              </label>
              <input
                type='number'
                id='guests'
                placeholder='0'
                className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                required
              />
            </div>
          </div>
          <button
            type='submit'
            className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-[26px] py-3 md:py-4 text-base cursor-pointer'
          >
            Book Now
          </button>
        </form>
      </div>
    )
  );
};

export default RoomDetails;
