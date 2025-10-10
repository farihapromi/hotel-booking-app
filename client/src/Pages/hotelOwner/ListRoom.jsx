import React, { useState } from 'react';
import { roomsDummyData } from '../../assets/assets';
import Title from '../../Components/Title';

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);
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
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
