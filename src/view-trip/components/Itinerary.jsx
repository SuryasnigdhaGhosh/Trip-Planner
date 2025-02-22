import React, { useState } from 'react'
import ItineraryCard from './ItineraryCard'

function Itinerary({ trip }) {

  const [dayData, setDayData] = useState()

  console.log()
  return (
    <div className='flex flex-col gap-3'>
      <h2 className='font-bold text-xl mt-5'>Recommended Itinerary</h2>
      <div className='flex gap-3'>
        {trip?.tripData?.itinerary?.map((day, index) => (
          <h1 className={`p-2 px-6 border  cursor-pointer hover:scale-105 transition-all rounded-lg ${ day?.day === dayData?.day ? 'border-black' : 'border-gray-300'}`}
            key={index}
            onClick={() => { setDayData(day) }}
          >{day?.day}</h1>
        ))}
      </div>
      <ItineraryCard place={trip?.userPrompts?.location?.label} day={dayData ?? trip?.tripData?.itinerary[0]} />

    </div>
  )
}

export default Itinerary
