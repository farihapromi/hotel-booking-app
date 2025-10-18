import React, { useState } from 'react';
import Title from '../../Components/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: '',
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages({ ...images, [key]: file });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !Object.values(images).some(Boolean)
    ) {
      toast.error(
        'Please fill in all the details and upload at least one image.'
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('roomType', inputs.roomType);
      formData.append('pricePerNight', inputs.pricePerNight);
      const selectedAmenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append('amenities', JSON.stringify(selectedAmenities));

      Object.keys(images).forEach((key) => {
        if (images[key]) formData.append('images', images[key]);
      });

      const { data } = await axios.post('/api/rooms', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setInputs({
          roomType: '',
          pricePerNight: '',
          amenities: {
            'Free Wifi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex-1 flex flex-col min-h-[80vh] p-4 md:p-10'>
      <form className='flex-1 flex flex-col' onSubmit={onSubmitHandler}>
        <Title
          align='left'
          font='outfit'
          title='Add Room'
          subTitle='Fill in accurate room details, pricing, and amenities to enhance user booking experience.'
        />

        {/* Image Upload */}
        <p className='text-gray-800 mt-6'>Images</p>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2'>
          {Object.keys(images).map((key) => (
            <label
              key={key}
              htmlFor={`roomImage${key}`}
              className='cursor-pointer'
            >
              <img
                src={
                  images[key]
                    ? URL.createObjectURL(images[key])
                    : assets.uploadArea
                }
                alt=''
                className='w-full h-32 sm:h-24 object-cover rounded'
              />
              <input
                type='file'
                id={`roomImage${key}`}
                accept='image/*'
                hidden
                onChange={(e) => handleImageChange(e, key)}
              />
            </label>
          ))}
        </div>

        {/* Room Type & Price */}
        <div className='flex flex-col sm:flex-row gap-4 mt-6'>
          <div className='flex-1'>
            <p className='text-gray-800'>Room Type</p>
            <select
              value={inputs.roomType}
              onChange={(e) =>
                setInputs({ ...inputs, roomType: e.target.value })
              }
              className='border border-gray-300 rounded p-2 w-full mt-1'
            >
              <option value=''>Select Room type</option>
              <option value='Single bed'>Single bed</option>
              <option value='Double Bed'>Double Bed</option>
              <option value='Luxury room'>Luxury room</option>
              <option value='Family Suit'>Family Suit</option>
            </select>
          </div>

          <div>
            <p className='text-green-800'>
              Price <span className='text-xs'>/night</span>
            </p>
            <input
              type='number'
              placeholder='0'
              className='border border-gray-300 rounded p-2 w-full sm:w-24 mt-1'
              value={inputs.pricePerNight}
              onChange={(e) =>
                setInputs({ ...inputs, pricePerNight: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Amenities */}
        <p className='text-gray-800 mt-6'>Amenities</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2'>
          {Object.keys(inputs.amenities).map((amenity, idx) => (
            <div key={idx} className='flex items-center gap-2'>
              <input
                type='checkbox'
                id={`amenity${idx}`}
                checked={inputs.amenities[amenity]}
                onChange={() =>
                  setInputs({
                    ...inputs,
                    amenities: {
                      ...inputs.amenities,
                      [amenity]: !inputs.amenities[amenity],
                    },
                  })
                }
                className='w-5 h-5 accent-green-500 cursor-pointer'
              />
              <label htmlFor={`amenity${idx}`} className='text-black'>
                {amenity}
              </label>
            </div>
          ))}
        </div>

        <button
          type='submit'
          disabled={loading}
          className='bg-primary text-white px-6 py-2 rounded-lg mt-6 w-full sm:w-auto'
        >
          {loading ? 'Adding...' : 'Add Room'}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
