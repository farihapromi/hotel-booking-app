import React from 'react'
import { useNavigate } from 'react-router-dom'

const RoomCard = ({rooms}) => {
   const{ _id, hotel, roomType, pricePerNight, amenities, images, isAvailable }=rooms
   const navigate=useNavigate()
  return (
    <div className="flex gap-6 p-4 border rounded-lg shadow-md">
      {/* Left side: Image */}
      <div className="w-1/2">
        <img onClick={()=>navigate(`/rooms/${rooms._id}`)}
        src={images[0]} alt="Room" className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer" />
      </div>

      {/* Right side: Details */}
      <div className="w-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">{roomType}</h2>
          <p className="text-gray-600 mb-1">Price: ${pricePerNight} per night</p>
          <p className="text-gray-600 mb-1">Available: {isAvailable ? 'Yes' : 'No'}</p>
          <p className="text-gray-600 mb-1">Amenities: {amenities.join(', ')}</p>
        </div>
     
      </div>
    </div>
  )
}

export default RoomCard
