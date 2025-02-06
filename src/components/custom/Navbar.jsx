import React from 'react'
import { Button } from '../ui/button'

function Navbar() {
    return (
        <div className='p-2 px-6 shadow-md flex justify-between items-center'>
            <img src="/logo.svg" alt="" />
            <Button>Sign In</Button>
        </div>
    )
}

export default Navbar
