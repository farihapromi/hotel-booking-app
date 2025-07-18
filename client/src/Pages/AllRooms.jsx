import React from 'react'
import { roomsDummyData } from '../assets/assets'
import RoomCard from './RoomCard'

const AllRooms = () => {
  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-6 md:px-16 lg:px-24 xl:px-32'>
     
      <div>
         <div className='flex flex-col items-start text-left'>
          <h1 className='font-bold text-4xl font-playfair text-blue-400'>Hotel Rooms</h1>
        <p className='tetx-sm md:text-base text-black mt-2 max-w-174'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>

         </div>

         {/* room card */}
         {
          roomsDummyData.map((rooms)=>(<RoomCard key={rooms._id} rooms={rooms}/>))
         }
          </div>
     
      {/* filters */}
      <div>

      </div>
      
   
     </div>
  )
}

export default AllRooms
