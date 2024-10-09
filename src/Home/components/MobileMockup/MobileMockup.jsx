import React from 'react'
import ProfileSkeleton from './profileSkeleton/ProfileSkeleton'
import LinkSkeleton from './LinkSkeleton/LinkSkeleton'

export default function MobileMockup() {

  return (
    <div className=''>
      <div className='mobile-outer relative p-2 h-[450px] w-[290px] border-2 rounded-[50px]'>
        <div className='notch absolute w-[140px] h-[18px] left-1/2 transform -translate-x-1/2 top-2 rounded-b-[10px] border-2 border-t-0 bg-white' />
        <div className='mobile-inner p-4 pt-8 h-full border-2 rounded-[40px] bg-transparent'>
          <div>
            <ProfileSkeleton />
          </div>
          <div className='mt-7 space-y-3'>
            {[...Array(5)].map((_, index) => (
              <LinkSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
