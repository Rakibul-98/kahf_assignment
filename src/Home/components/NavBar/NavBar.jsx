import { useContext } from 'react';
import { FaLink } from 'react-icons/fa'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';

export default function NavBar() {

    const {setPreviewActive} = useContext(AppContext);

    const buttons = [
        {
            to: '/link-editor',
            icon: <FaLink />,
            label: 'Links',
        },
        {
            to: '/profile-editor',
            icon: <HiOutlineUserCircle className='text-xl' />,
            label: 'Profile Details',
        },
    ];


    return (
        <div className='common-nav'>
            <h1 className='uppercase text-xl font-bold tracking-wider ms-5'>company</h1>
            <div className='flex gap-5'>
                {
                    buttons.map((button, index) => (
                        <NavLink key={index} className={({ isActive }) =>
                            `flex items-center gap-[6px] py-1 px-5 rounded-md ${isActive ? 'text-purple-500 bg-purple-100 cursor-default' : 'hover:text-purple-500'
                            }`} to={button.to}>
                            {button.icon} {button.label}
                        </NavLink>
                    ))
                }
            </div>
            <Link className='py-1 px-5 border hover:bg-purple-50 border-purple-500 rounded-md text-purple-500' to="/preview" onClick={()=>setPreviewActive(true)}>Preview</Link>
        </div>
    )
}
