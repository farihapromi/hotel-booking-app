import React, { useState } from 'react';
import Title from '../../Components/Title';
import { assets } from '../../assets/assets';

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenties: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });
  return (
    <form>
      <Title
        align='left'
        font='outfit'
        title='Add Room'
        subTitle='Fill in the  details carefully and accurate room details,pricing and amenties  to enhacne the user booking experience .'
      />
      {/* upload area for images */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className='max-h-13 cursor-pointer opacity-80'
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=''
            />
            <input
              type='file'
              name=''
              id={`roomImage${key}`}
              accept='image/*'
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
          // when we will upload any images it will store in images state
        ))}
      </div>
      <div className='flex max-sm:flex-col sm:gap-4 mt-4 w-full'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select className='border opacity-70 border-gray-300 mt-1 rounded-p-2 w-full'>
            <option value=''>Select Room type</option>
            <option value='Single bed'>Single bed</option>
            <option value='Double Bed'>Double Bed</option>
            <option value='Luxury room'>Luxury room</option>
            <option value='Family Suit'>Family Suit</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default AddRoom;
