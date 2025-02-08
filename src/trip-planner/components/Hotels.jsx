import React from 'react'
import { Link } from 'react-router-dom'

import ReactStars from 'react-stars';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank'key={index} >
            <div className='cursor-pointer hover:scale-105 transition-all shadow-lg p-3 rounded-md min-h-[430px]' >
              <img src="/place.jpg" alt="" className='rounded-xl' />
              <div className='my-3 flex flex-col gap-1'>
                <div className='flex items-center justify-between gap-3'>
                  <h2 className='font-medium'>{hotel?.hotelName}</h2>
                  <p className='font-medium flex-shrink-0'>{hotel?.price}</p>

                </div>
                <ReactStars
                  count={5} // Number of stars
                  value={hotel?.rating} // Current rating (e.g., 4, 4.5)
                  size={18} // Size of stars
                  color2="#ffd700" // Color of active stars
                  edit={false} // Disable editing
                  half={true} // Enable half-stars
                />
                <p>📌 <span className='text-gray-500 text-xs'>{hotel?.hotelAddress}</span></p>
                <p className='text-gray-500 text-xs'>{hotel?.description}</p>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotels
