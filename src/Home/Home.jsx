import MobileMockup from './components/MobileMockup/MobileMockup'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'


export default function Home() {

    return (
        <div className=' bg-[#FAFAFA] h-screen flex flex-col p-5'>
            <NavBar/>
            <div className='relative flex-1 grid grid-cols-5 gap-5'>
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
