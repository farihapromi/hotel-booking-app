import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HotelCard = ({room,index}) => {
  return (
   <Link
  to={`/rooms/` + room._id}
  onClick={() => scrollTo(0, 0)}
  key={room._id}
  className="w-[270px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative"
>
  <div className="relative">
    <img
      src={room.images[0]}
      alt=""
      className="w-full h-[180px] object-cover rounded-t-xl"
    />
    {index % 2 === 0 && (
      <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full shadow">
        Best Seller
      </p>
    )}
    {index === 3 && (
      <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-yellow-400 text-black font-medium rounded-full shadow">
        New
      </p>
    )}
  </div>

  <div className="p-4">
    <div className="flex items-center justify-between">
      <p className="font-playfair text-lg font-medium text-gray-800">
        {room.hotel.name}
      </p>
      <div className="flex items-center gap-1 text-sm text-orange-500 font-medium">
        <img src={assets.starIconFilled} alt="" className="w-4 h-4" /> 4.9
      </div>
    </div>

    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
      <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
      <span>{room.hotel.address}</span>
    </div>

    <div className="flex items-center justify-between mt-4">
      <p>
        <span className="text-xl text-gray-800 font-semibold">
          ${room.pricePerNight}
        </span>{" "}
        <span className="text-sm text-gray-500 font-light">/night</span>
      </p>
      <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-100 transition-all">
        View Details
      </button>
    </div>
  </div>
</Link>

  )
}

export default HotelCard
