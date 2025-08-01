import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffer = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30' >
        <div className='flex flex-col md:flex-row items-center justify-between w-full'>
            <Title align='left' title='Exclusive Offers' subTitle='Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories'/>
            <button className="flex items-center gap-2 group text-blue-600 font-medium">
  View All Offers
  <img
    src={assets.arrowIcon}
    alt="arrow-icon"
    className="transition-all group-hover:translate-x-1"
  />
</button>

        </div>
        {/* display card */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
        {
          exclusiveOffers.map((item)=>(
            <div key={item._id} className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center' style={{backgroundImage:`url(${item.image})`}}>
              <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'>{item.priceOff}% OFF</p>
              <div>
                <p className='font-medium text-2xl font-playfair'>{item.title}</p>
                <p>{item.description}</p>
                <p className='text-xs text-white/70 mt-4'>Expires {item.expiryDate}</p>
              </div>
             <button className="flex items-center gap-2 group  font-medium mt-4 mb-5">
                View Offers
                <img
    src={assets.arrowIcon}
    alt="arrow-icon"
    className=" invert transition-all group-hover:translate-x-1 "
  />
              </button>

              </div>
          ))
        }

        <div>

        </div>
      
    </div>
    </div>
  )
}

export default ExclusiveOffer

