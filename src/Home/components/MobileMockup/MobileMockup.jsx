import ProfileSkeleton from './profileSkeleton/ProfileSkeleton'
import LinkSkeleton from './LinkSkeleton/LinkSkeleton'
import { TbBrandGithubFilled } from 'react-icons/tb';
import { FaArrowRight, FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function MobileMockup({ linkData, profileData }) {

  console.log(profileData);

  const totalSkeletons = 5;
  const displayedLinks = linkData.slice(0, totalSkeletons);

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
    <div className=''>
      <div className='mobile-outer relative p-2 h-[450px] w-[260px] border-2 rounded-[50px]'>
        <div className='notch absolute w-[140px] h-[18px] left-1/2 transform -translate-x-1/2 top-2 rounded-b-[10px] border-2 border-t-0 bg-white' />
        <div className='mobile-inner p-4 pt-8 h-full border-2 rounded-[40px] bg-transparent'>
          <div>
            <ProfileSkeleton profileData={profileData} />
          </div>
          <div className='mt-6 space-y-[10px] h-[230px] scrollable'>
            {displayedLinks.map((link) => (
              <div key={link.id} className={`link-item ${platformData[link.platform]?.bgColor || 'bg-gray-300'} h-9 rounded-lg flex items-center px-4`}>
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
      </div>
    </div>
  )
}
