import { db } from '@/config/FirebaseConfig'
import Hotels from '@/view-trip/components/Hotels'
import InformationSection from '@/view-trip/components/InformationSection'
import Itinerary from '@/view-trip/components/Itinerary'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

function ViewTrip() {

    const { tripId } = useParams()

    const [tripData , setTripData] = useState()

    useEffect(() => {
        tripId && getTripData()
    }, [tripId])


    const getTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setTripData(docSnap.data())
        } else {
            console.log("No such document!")
            toast.error('No trip found')
        }
    }

    return (
        <div className='p-10 md:px-20 lg:px-36 xl:px-40 flex flex-col gap-3'>
            <InformationSection trip={tripData}/>
            <Hotels trip={tripData}/>
            <Itinerary trip={tripData}/>
        </div>
    )
}

export default ViewTrip
