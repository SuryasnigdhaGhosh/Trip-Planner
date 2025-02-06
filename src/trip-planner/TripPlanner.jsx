import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { chatSession } from '@/config/AI-Model'
import { AI_PROMPT, SelectBudgetOptions, SelectNoOfPersons } from '@/constants/options'
import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import toast from 'react-hot-toast'

function TripPlanner() {

  const [place, setPlace] = useState()

  const [formData, setFormData] = useState([])

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleGenerateTrip = async () => {
    if (formData?.totalDays > 30) {
      toast.error("Max trip days can be 30")
    }
    if (!formData.budget || !formData?.location || !formData.totalDays || formData?.totalDays === 0 || !formData?.traveller) {
      toast.error("Please fill all the options")
    }

    const finalPrompt = AI_PROMPT
      .replace('{totalDays}', formData?.totalDays)
      .replace('{location}', formData?.location.label)
      .replace('{traveller}', formData?.traveller)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.totalDays)
      .replace('{budget}', formData?.budget)

    console.log(finalPrompt)

    const result = await chatSession.sendMessage(finalPrompt);

    console.log(result?.response?.text())

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
          <Button className='w-full' onClick={handleGenerateTrip}>Plan the trip</Button>
        </div>
      </div>
    </div>
  )
}

export default TripPlanner
