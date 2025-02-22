import { GetPlaceDetails } from '@/config/Global-API'
import { PHOTO_REF_URL } from '@/constants/options'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'

function HotelCard({ hotel }) {

    const [photoURL, setPhotoURL] = useState()

    useEffect(() => {
        hotel && getPlacePhoto()
    }, [hotel])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        await GetPlaceDetails(data).then(resp => {

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp?.data?.places[0]?.photos[0]?.name)
            setPhotoURL(PhotoUrl)
        })
    }

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank'  >
            <div className='cursor-pointer hover:scale-105 transition-all shadow-lg p-3 rounded-md min-h-[430px]' >
                <img src={photoURL} alt="" className='rounded-xl h-[220px] w-full object-cover' />
                <div className='my-3 flex flex-col gap-1'>
                    <div className='flex items-center justify-between gap-3'>
                        <h2 className='font-medium'>{hotel?.hotelName}</h2>
                        <p className='font-medium flex-shrink-0'>{hotel?.price.split(" ").slice(0, 3).join(" ")}</p>

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
    )
}

export default HotelCard
