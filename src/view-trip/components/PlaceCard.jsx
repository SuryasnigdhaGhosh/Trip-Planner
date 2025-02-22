import { GetPlaceDetails } from '@/config/Global-API'
import { PHOTO_REF_URL } from '@/constants/options'
import React, { useEffect, useState } from 'react'

function PlaceCard({ schedule, place }) {

    const [photoURL, setPhotoURL] = useState()

    useEffect(() => {
        schedule?.placeImageURL && getPlacePhoto()
    }, [schedule])
    console.log(schedule)

    const getPlacePhoto = async () => {
        const data = {
            textQuery: `${schedule?.placeName},${place}`
        }
        await GetPlaceDetails(data).then(resp => {

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp?.data?.places[0]?.photos[0]?.name)
            setPhotoURL(PhotoUrl)
        })
    }


    return (
        <div>
            <h1>{schedule?.time}</h1>
            <h1 className='p-2 px-6 border  cursor-pointer hover:scale-105 transition-all rounded-lg border-gray-300'
            >{schedule?.activity}</h1>
            {schedule?.placeImageURL && <img src={photoURL} alt="" className='h-[200px]' />}
            <h1>{schedule?.placeName}</h1>
            <h1>{schedule?.placeDetails}</h1>
            <h1>{schedule?.rating}</h1>
            <h1>{schedule?.ticketPricing}</h1>
            <h1>{schedule?.timeTakenToTravel}</h1>

        </div>
    )
}

export default PlaceCard
