import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosSend } from "react-icons/io";

function InformationSection({ trip }) {
    return (
        <div>
            <img src="/place.jpg" className='h-[300px] w-full object-cover rounded-xl' alt="" />
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
