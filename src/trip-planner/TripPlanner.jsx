import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { chatSession } from '@/config/AI-Model'
import { AI_PROMPT, SelectBudgetOptions, SelectNoOfPersons } from '@/constants/options'
import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import toast from 'react-hot-toast'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'


function TripPlanner() {

  const [place, setPlace] = useState()


  const [formData, setFormData] = useState([])

  const [openDialog, setOpenDialog] = useState(false)

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      getUserProfile(credentialResponse)
    },
    onError: (error) => { console.log(error) }
  })

  const getUserProfile = (token) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token?.access_token}`, {
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
        Accept: "Appliction/json"
      }
    }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res?.data))
      setOpenDialog(false)
      handleGenerateTrip()
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleGenerateTrip = async () => {

    const user = localStorage.getItem('user')

    if (!user) {
      setOpenDialog(true)
      return;
    }

    if (formData?.totalDays > 30) {
      toast.error("Max trip days can be 30")
    }
    if (!formData.budget || !formData?.location || !formData.totalDays || formData?.totalDays <= 0 || !formData?.traveller) {
      toast.error("Please fill all the options")
    }

    setLoading(true)

    const finalPrompt = AI_PROMPT
      .replace('{totalDays}', formData?.totalDays)
      .replace('{location}', formData?.location.label)
      .replace('{traveller}', formData?.traveller)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.totalDays)
      .replace('{budget}', formData?.budget)


    const result = await chatSession.sendMessage(finalPrompt);

    setLoading(false)
    saveAITrip(result?.response?.text())

  }


  const saveAITrip = async (tripData) => {
    setLoading(true)

    const docId = Date.now().toString()

    const user = JSON.parse(localStorage.getItem('user'))

    // Add a new document in collection "cities"
    await setDoc(doc(db, "AITrips", docId), {
      userPrompts: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId
    });

    setLoading(false)
    navigate('/view-trip/'+docId)
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Plannn mannn</h2>
      <p className='mt-3 text-gray-500 text-xl'>just tell and plan</p>

      <div className='mt-20 flex flex-col gap-6'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Where tooo??</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>For how many fucking days??</h2>
          <Input type="number" placeholder="Ex: 3"
            onChange={(e) => handleInputChange('totalDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Budget??</h2>
          <p className='my-3 text-gray-500 text-xl'>for party</p>

          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} className={`p-4 border cursor-pointer rounded-lg hover:shadow
                  ${formData?.budget === item.title && 'shadow-lg border-black'}
                `}
                onClick={() => handleInputChange('budget', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>whom with??</h2>
          <p className='my-3 text-gray-500 text-xl'>tell please</p>

          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectNoOfPersons.map((item, index) => (
              <div key={index} className={`p-4 border cursor-pointer rounded-lg hover:shadow
                ${formData?.traveller === item.no && 'shadow-lg border-black'}
              `}
                onClick={() => handleInputChange('traveller', item.no)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                {/* <h2 className='text-sm text-gray-500'>{item.no}</h2> */}
              </div>
            ))}
          </div>
        </div>
        <div className='my-10 mx-auto w-[50%]'>
          <Button disabled={loading} className='w-full' onClick={handleGenerateTrip}>
            {loading ? <AiOutlineLoading3Quarters className='min-h-7 min-w-7 animate-spin' /> : "Plan the trip"}
          </Button>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
            </DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" alt="" />

              <span className='font-bold text-lg mt-7'>Sign in with Google</span><br />
              Sign in to the App with Google authentication securely

              <Button className='mt-5 w-full flex gap-4 items-center' onClick={login}><FcGoogle className='min-h-7 min-w-7' /> Sign In With Google </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default TripPlanner
