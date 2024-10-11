import { useContext } from 'react';
import { FaLink } from 'react-icons/fa'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import { FiEye } from 'react-icons/fi';

export default function NavBar() {

    const { setPreviewActive } = useContext(AppContext);

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
            <h1 className='uppercase text-xl font-bold tracking-wider md:ms-5 cursor-default'><span>link<sup className='hidden md:inline text-purple-600'> plus</sup><sup className='md:hidden font-extrabold text-purple-600'>+</sup></span></h1>
            <div className='flex gap-5'>
                {
                    buttons.map((button, index) => (
                        <NavLink key={index} className={({ isActive }) =>
                            `flex items-center gap-[6px] py-3 md:py-1 px-5 rounded-md ${isActive ? 'text-purple-500 bg-purple-100 cursor-default' : 'hover:text-purple-500'
                            }`} to={button.to}>
                            {button.icon} <span className='hidden md:block'>{button.label}</span>
                        </NavLink>
                    ))
                }
            </div>
            <Link className='py-3 md:py-1 px-5 border hover:bg-purple-500 hover:text-white border-purple-500 rounded-md text-purple-500' to="/preview" onClick={() => setPreviewActive(true)}><span className='hidden md:block'>Preview</span><FiEye className='block md:hidden' /></Link>
        </div>
    )
}
