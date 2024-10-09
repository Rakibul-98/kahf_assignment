export default function ProfileSkeleton({ profileData }) {

    return (
        <div className="flex gap-2 flex-col items-center">
            {profileData.profilePicture ? (
                <div className="bg-zinc-200 h-[70px] w-[70px] rounded-full">
                    <img
                        src={URL.createObjectURL(profileData.profilePicture)}
                        alt="Profile"
                        className="h-full w-full object-cover rounded-full border-4 border-violet-500"
                    />
                </div>
            ) : (
                <div className="bg-zinc-200 h-[70px] w-[70px] rounded-full"></div>
            )}
            {
                profileData.fName && profileData.lName ? (
                    <h3 className="text-lg font-medium">{profileData.fName} {profileData.lName}</h3>
                ) : (<div className="bg-zinc-200 h-3 w-40 rounded-lg mt-1"></div>)
            }
            {
                profileData.email ? (
                    <p className="text-sm -mt-1">{profileData.email}</p>
                ) : (<div className="bg-zinc-200 h-[6px] w-20 rounded-lg"></div>)
            }
        </div>
    );
}
