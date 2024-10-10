import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";

export default function ProfileSkeleton() {

    const { profileData, previewActive } = useContext(AppContext);

    return (
        <div className="flex gap-2 flex-col items-center mt-2">
            {profileData.profilePicture ? (
                <div className="bg-zinc-200 h-[65px] w-[65px] rounded-full">
                    <img
                        src={URL.createObjectURL(profileData.profilePicture)}
                        alt="Profile"
                        className="h-full w-full object-cover rounded-full border-4 border-violet-500"
                    />
                </div>
            ) : (
                <div className="bg-zinc-200 h-[70px] w-[70px] rounded-full"></div>
            )}
            <div className={`${previewActive && profileData.fName ? 'my-1' : 'my-2'}`}>
                {
                    profileData.fName && profileData.lName ? (
                        <h3 className="text-xl font-medium -mt-1">{profileData.fName} {profileData.lName}</h3>
                    ) : (<div className="bg-zinc-200 h-3 w-40 rounded-lg mt-1"></div>)
                }
            </div>
                {
                    profileData.email ? (
                        <p className="text-xs -mt-2 -mb-2">{profileData.email}</p>
                    ) : (<div className="bg-zinc-200 h-[6px] w-20 rounded-lg"></div>)
                }
        </div>
    );
}
