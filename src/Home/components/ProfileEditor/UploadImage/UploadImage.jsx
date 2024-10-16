/* eslint-disable react/prop-types */


import { LiaImage } from "react-icons/lia";

export default function UploadImage({ setValue, image, setImage }) {

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/bmp')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setValue('profilePicture', file);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="h-full grid md:grid-cols-3 gap-2 grid-flow-row items-center px-2 md:px-5">
            <p className="">Profile Picture</p>
            <div className="">
                <label
                    className="flex items-center justify-center border border-gray-400 rounded-lg w-28 h-28 md:w-32 md:h-32 cursor-pointer"
                    htmlFor="file-upload"
                >
                    {image ? (
                        <div className="h-full w-full relative ">
                            <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg opacity-40" />

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl"><LiaImage /></span>
                                <p className="text-sm">Change Image</p>
                            </div>
                        </div>
                    ) : (
                        <p className="flex flex-col items-center text-sm"><span className="text-2xl"><LiaImage /></span>Add Image</p>
                    )}
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".png,.jpg,.bmp"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>
            <p className='text-xs'>Image must be below 1024x1024px. <br />Use PNG, JPG or BMP format.</p>
        </div>
    )
}
