import { Link } from "react-router-dom";
import DataCard from "../../../Shared/DataCard";

export default function Preview() {
    return (
        <div className="relative">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-[300px] p-5 rounded-b-2xl">
                <div className='common-nav'>
                    <Link className="py-1 px-5 border hover:bg-purple-500 hover:text-white border-purple-500 rounded-md text-purple-500" to="/">Back to editor</Link>
                    <Link className='py-1 px-5 border bg-purple-500 border-purple-500 rounded-md text-white' to="/preview">Share Link</Link>
                </div>
            </div>
            <div className="flex justify-center -mt-28">
                <div className='h-[440px] w-[250px]  shadow-2xl rounded-2xl bg-white'>
                    <DataCard />
                </div>
            </div>
        </div>
    )
}
