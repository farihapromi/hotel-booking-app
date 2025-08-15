import React, { useState } from 'react';
import Title from '../Components/Title';
import { userBookingsDummyData } from '../assets/assets';

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);
  return (
    <div className='py-28 md:pb-35 md:pt-32 ,d:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 '>
      <Title
        title='My Bookings'
        subTitle='Easily manage yputr booking and upcoming hotel reservation in one place. Plan your trip just a few clicks'
        align='left'
      />
      <div className='max-w-6xl mt-8 w-full text-gray-800'>
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full  border-b border-gray-300 font-medium text-base py-3'>
          <div className='w-1/3'>Hotels</div>
          <div className='w-1/3'>Date & Timings</div>
          <div className='w-1/3'>Payment</div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
