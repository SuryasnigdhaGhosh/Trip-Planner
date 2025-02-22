import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'


function Navbar() {

    const user = JSON.parse(localStorage.getItem('user'))

    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)


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
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div className='p-2 px-6 shadow-md flex justify-between items-center'>
            <img src="/logo.svg" alt="" />
            {
                user ?
                    <div className='flex items-center gap-5'>
                        <Button variant='outline'>My Trips</Button>

                        <Popover>
                            <PopoverTrigger>
                                <img src={user?.picture} alt="" className='h-[30px] w-[30px] rounded-full' />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h2 className='cursor-pointer' onClick={() => { googleLogout(); localStorage.clear(); navigate('/') }}>Logout</h2>
                            </PopoverContent>
                        </Popover>

                    </div>
                    :
                    <Button onClick={() => { setOpenDialog(true) }}>Sign In</Button>
            }

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

export default Navbar
