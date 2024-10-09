import { FaLink } from 'react-icons/fa'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {

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
        <div className='flex justify-between items-center bg-white h-16 rounded-xl px-5 py-2 mb-5'>
            <h1 className='uppercase text-xl font-bold tracking-wider'>company.logo</h1>
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
            <Link className='py-1 px-5 border hover:bg-purple-50 border-purple-500 rounded-md text-purple-500' to="/preview">Preview</Link>
        </div>
    )
}
