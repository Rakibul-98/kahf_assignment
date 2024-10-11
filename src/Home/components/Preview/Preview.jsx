import { Link } from "react-router-dom";
import DataCard from "../../../Shared/DataCard";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import toast, { Toaster } from "react-hot-toast";

export default function Preview() {

    const { setPreviewActive, displayedLinks, profileData } = useContext(AppContext);

    const handleShareLink = () => {
        const shareableLinks = displayedLinks.map(link => `${link.platform}: ${link.link}`).join('\n');
        const profileInfo = `
Profile Info:
Name: ${profileData.fName} ${profileData.lName}
Email: ${profileData.email}
`;

        const shareableData = `${profileInfo}\nLinks:\n${shareableLinks}`;

        navigator.clipboard.writeText(shareableData)
            .then(() => {
                toast.success("Links copied to clipboard!");
            })
            .catch(err => {
                toast.error("Failed to copy links to clipboard. Please try again!"), err;
            });
    };

    return (
        <div className="relative mb-10">
            <Toaster/>
            <div className="md:bg-gradient-to-r from-indigo-600 to-purple-600 h-[250px] p-5 rounded-b-2xl">
                <div className='common-nav -mt-3'>
                    <Link className="py-1 px-5 border hover:bg-purple-500 hover:text-white border-purple-500 rounded-md text-purple-500" onClick={() => setPreviewActive(false)} to="/">Back to editor</Link>
                    <button className={`py-1 px-5 border  ${displayedLinks.length === 0 ? 'bg-purple-400' : 'bg-purple-500 border-purple-500 hover:bg-purple-600'}  rounded-md text-white`} onClick={handleShareLink} disabled={displayedLinks.length === 0}>Share Link</button>
                </div>
            </div>
            <div className="flex justify-center -mt-40 md:-mt-28">
                <div className='h-[420px] w-[280px] md:shadow-2xl px-6 rounded-2xl bg-white'>
                    <DataCard />
                </div>
            </div>
        </div>
    )
}
