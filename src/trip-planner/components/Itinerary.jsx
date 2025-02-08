import React from 'react'

function Itinerary({trip}) {

    console.log(trip?.tripData?.itinerary)
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Recommended Itinerary</h2>
      <div>
        {trip?.tripData?.itinerary?.map((day,index)=>(
            <h1>{day?.day}{day?.title}</h1>
        ))}
      </div>
      
    </div>
  )
}

export default Itinerary
