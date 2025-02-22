import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/config/Global-API';
import { PHOTO_REF_URL } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";


function InformationSection({ trip }) {

    const [photoURL, setPhotoURL] = useState()

    useEffect(() => {
       trip && getPlacePhoto()
    }, [trip])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userPrompts?.location?.label
        }
        await GetPlaceDetails(data).then(resp => {

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp?.data?.places[0]?.photos[0]?.name)
            setPhotoURL(PhotoUrl)
        })
    }

    return (
        <div>
            <img src={photoURL} className='h-[350px] w-full object-cover rounded-xl' alt="" />
            <div className='my-5  flex justify-between items-start md:items-center'>
                <div className='flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>
                        {trip?.userPrompts?.location?.label}
                    </h2>
                    <div className='flex flex-col gap-5 mt-2 md:flex-row'>
                        <h2 className='p-1 px-4 bg-gray-200 rounded-full text-gray-500 ' >📆 {trip?.userPrompts?.totalDays} days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 ' >💰 {trip?.userPrompts?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 ' >✈️ {trip?.userPrompts?.traveller}</h2>
                    </div>
                </div>
                <Button><IoIosSend /></Button>

            </div>
        </div>
    )
}

export default InformationSection
