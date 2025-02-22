
import React, { useEffect, useState } from 'react'
import PlaceCard from './PlaceCard'

function ItineraryCard({ day, place }) {


    return (
        <div>
            {day?.title}

            {day?.schedule?.map((schedule, index) => (
                <div>
                    <PlaceCard place={place} schedule={schedule} key={index} />
                </div>

            ))}
        </div>
    )
}

export default ItineraryCard
