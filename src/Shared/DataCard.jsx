import { TbBrandGithubFilled } from "react-icons/tb";
import ProfileSkeleton from "../Home/components/MobileMockup/profileSkeleton/ProfileSkeleton";
import { FaArrowRight, FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import LinkSkeleton from "../Home/components/MobileMockup/LinkSkeleton/LinkSkeleton";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";


export default function DataCard() {

    const { profileData, displayedLinks, totalSkeletons } = useContext(AppContext);

    const platformData = {
        GitHub: {
            icon: <TbBrandGithubFilled />,
            bgColor: 'bg-gray-800',
        },
        YouTube: {
            icon: <FaYoutube />,
            bgColor: 'bg-red-600',
        },
        Linkedin: {
            icon: <FaLinkedin />,
            bgColor: 'bg-[#0077B5]',
        },
        Facebook: {
            icon: <FaFacebookSquare />,
            bgColor: 'bg-[#1877F2]',
        },
        Instagram: {
            icon: <FaInstagramSquare />,
            bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
        },
    };

    return (
        <div className={`mobile-inner p-4 pt-5 h-full bg-transparent`}>
            <div>
                <ProfileSkeleton />
            </div>
            <div className={`${profileData ? 'mt-6' : 'mt-8'} space-y-[10px] h-[234px] scrollable-link`}>
                {displayedLinks.map((link) => (
                    <div
                        key={link.id}
                        className={`link-item ${platformData[link.platform]?.bgColor || 'bg-gray-300'} h-9 rounded-lg flex items-center px-4 }`}>
                        <div className='flex items-center w-full justify-between text-white'>
                            <div className='flex items-center'>
                                {platformData[link.platform]?.icon || null}
                                <span className='ml-2'>{link.platform}</span>
                            </div>
                            <span className='text-xs'><FaArrowRight /></span>
                        </div>
                    </div>
                ))}
                {displayedLinks.length < totalSkeletons &&
                    Array.from({ length: totalSkeletons - displayedLinks.length }).map((_, index) => (
                        <LinkSkeleton key={index} />
                    ))}
            </div>
        </div>
    )
}