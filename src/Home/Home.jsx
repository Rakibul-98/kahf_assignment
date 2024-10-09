import React from 'react'
import MobileMockup from './components/MobileMockup/MobileMockup'
import { Link, Outlet } from 'react-router-dom'
import { FaLink } from 'react-icons/fa'

export default function Home() {
    return (
        <div className=' bg-[#FAFAFA] h-screen flex flex-col p-5'>
            <div className='flex justify-between items-center bg-white h-16 rounded-xl px-5 py-2 mb-5'>
                <h1 className='uppercase text-xl font-bold tracking-wider'>company.logo</h1>
                <div className='flex'>
                    <Link className='flex items-center gap-2' to="/link-editor"> <FaLink/> Links</Link>
                    <Link to="/profile-editor">profile editor</Link>
                </div>
                <Link to="/preview">Preview</Link>
            </div>

            <div className='flex-1 grid grid-cols-5 gap-5'>
                <div className='col-span-2 flex justify-center bg-white items-center rounded-xl'>
                    <MobileMockup />
                </div>
                <div className="col-span-3 rounded-xl bg-white">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
