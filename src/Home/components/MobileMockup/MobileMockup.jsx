
import DataCard from '../../../Shared/DataCard';

export default function MobileMockup() {

  return (
    <div className=''>
      <div className='mobile-outer relative p-2 h-[450px] w-[260px] border-2 rounded-[50px] bg-white'>
        <div className='notch absolute w-[140px] h-[18px] left-1/2 transform -translate-x-1/2 top-2 rounded-b-[10px] border-2 border-t-0 bg-white' />
        <div className='border-2 rounded-[40px]'>
          <DataCard />
        </div>
      </div>
    </div>
  )
}
