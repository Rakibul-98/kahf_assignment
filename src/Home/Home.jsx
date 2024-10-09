import MobileMockup from './components/MobileMockup/MobileMockup'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import { useState } from 'react'


export default function Home() {

    const [linkData, setLinkData] = useState([]);
    const [profileData, setProfileData] = useState([]);

    const handleLinkDataChange = (newData) =>{
        setLinkData((prevData) => [...prevData, ...newData]);
    };

    const handleProfileDataChange = (newData) => {
        setProfileData(newData);
    };

    return (
        <div className=' bg-[#FAFAFA] h-screen flex flex-col p-5'>
            <NavBar/>
            <div className='relative flex-1 grid grid-cols-5 gap-5'>
                <div className='col-span-2 flex justify-center bg-white items-center rounded-xl'>
                    <MobileMockup profileData={profileData} linkData={linkData}/>
                </div>
                <div className="col-span-3 rounded-xl bg-white">
                    <Outlet context={{ handleLinkDataChange, handleProfileDataChange }} />
                </div>
            </div>
        </div>
    )
}
