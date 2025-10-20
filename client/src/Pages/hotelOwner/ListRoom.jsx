import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Title from '../../Components/Title';
import { useAppContext } from '../../Context/AppContext';

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user } = useAppContext();
  //fetch rooms for hotel owner
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //toggle room avaibality
  const toggleAvailabilty = async (roomId) => {
    const { data } = await axios.post(
      '/api/rooms/toggle-availabilty',
      { roomId },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    if (data.success) {
      toast.success(data.message);
      // fetchRooms();
      setRooms((prev) =>
        prev.map((room) =>
          room._id === roomId
            ? { ...room, isAvailable: !room.isAvailable }
            : room
        )
      );
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div>
      <Title
        align='left'
        font='outfit'
        title='Room Listing'
        subTitle='View,Edit or mnage listed rooms.keep the information up to date to provide the best experinece for users'
      />
      <p className='text-gray-500 mt-8'>All Rooms</p>
      <div className='w-full max-w-3xl tetx-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-4 text-gray-800 font-medium'> Name</th>
              <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>
                Facility
              </th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>
                Price / night
              </th>
              <th className='py-3 px-4 text-gray-800 font-medium text-center'>
                Actions
              </th>
            </tr>
          </thead>
          {/* table body */}
          <tbody className='text-sm'>
            {rooms.map((item, index) => (
              <tr key={index}>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {item.roomType}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                  {item.amenities.join(',')}
                </td>
                <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                  {item.pricePerNight}
                </td>
                <td className='py-3 px-4 text-red-500 border-t border-gray-300 text-center'>
                  <input
                    type='checkbox'
                    id={`toggle-${item._id}`} // unique id per room
                    className='sr-only peer'
                    checked={item.isAvailable}
                    onChange={() => toggleAvailabilty(item._id)}
                  />
                  <label
                    htmlFor={`toggle-${item._id}`} // links label to input
                    className='relative inline-flex items-center w-12 h-7 cursor-pointer bg-slate-300 rounded-full peer-checked:bg-blue-700 transition-colors duration-200'
                  >
                    <span className='dot absolute left-1 top-1 h-5 w-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
