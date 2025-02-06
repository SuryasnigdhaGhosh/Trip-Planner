import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

function Hero() {

    const navigate = useNavigate()

  return (
    <div className='flex justify-center py-3'>
      <Button onClick={()=> navigate('/trip-planner')}>Plan a trip</Button>
    </div>
  )
}

export default Hero
