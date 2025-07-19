import React from 'react'
import { useNavigate } from 'react-router-dom'
import StarRating from '../Components/StarRating'
import { assets, facilityIcons } from '../assets/assets'

const RoomCard = ({rooms}) => {
   const{ _id, hotel, roomType, pricePerNight, amenities, images, isAvailable }=rooms
   const navigate=useNavigate()
  return (
    <div  key={roomType._id} className="flex  flex-col gap-6 md:flex-row items-start py-10 border-b border-gray-300 last:pb-30 last:border-0">
   
     
        <img onClick={()=>{navigate(`/rooms/${rooms._id}`); scrollTo(0,0)}}
        src={images[0]} alt="Room" className="w-full md:w-[300px] h-[200px] rounded-xl shadow-lg object-cover cursor-pointer" />
        <div className='md:w-1/2 flex flex-col gap-2'>
            <p className='text-gray-500'>{hotel.city}</p>
            <p  onClick={()=>{navigate(`/rooms/${rooms._id}`); scrollTo(0,0)}}
            className='tetx-gray-800 font-playfair text-3xl cursor-pointer'>{hotel.name}</p>
            <div className="flex items-center">
                <StarRating/>
            <p className="ml-2">200+ reviews</p>
            </div>
            <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                <img src={assets.locationIcon} alt="location" />
                <span>{hotel.address}</span>
            </div>
            {/* room amenities */}
            <div className="flex flex-row gap-4 items-center mt-6 mb-4">
                {
                    amenities.map((item,index)=>(
                        <div key={index} className='flex flex-row gap-2 rounded-lg text-blue-700 font-bold text-xl px-3 py-2'>
                            <img src={facilityIcons[item]} alt="facility" className='w-5 h-5' />
                            <p className='text-xs'>{item}</p>
                            </div>
                    ))
                }

            </div>
            {/* price room */}
            <p className='text-xl font-medium text-gray-700'>${pricePerNight} /night</p>
        
        </div>
      </div>

      
  
  )
}

export default RoomCard
