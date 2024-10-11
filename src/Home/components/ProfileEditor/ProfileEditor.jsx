import React, { useContext, useEffect, useState } from 'react';
import PageTitle from '../../../PageTitle/PageTitle';
import { useForm } from 'react-hook-form';
import UploadImage from './UploadImage/UploadImage';
import toast from 'react-hot-toast';
import { SiMdbook } from 'react-icons/si';
import { AppContext } from '../../../context/AppContext';

export default function ProfileEditor() {
    const { register, handleSubmit, setValue } = useForm();
    const { handleProfileDataChange } = useContext(AppContext);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const savedProfileData = JSON.parse(localStorage.getItem('profileData')) || {};
        if (savedProfileData) {
            setValue('fName', savedProfileData.fName || '');
            setValue('lName', savedProfileData.lName || '');
            setValue('email', savedProfileData.email || '');
            setImage(savedProfileData.profilePicture || null);
        }
    }, [setValue]);

    const onSubmit = (data) => {
        const profileData = {
            ...data,
            profilePicture: image
        };
        handleProfileDataChange(profileData);
        toast('Your changes have been successfully saved!', {
            icon: <SiMdbook />,
        });
    };

    const inputFields = [
        { label: 'First name*', type: 'text', registerKey: 'fName' },
        { label: 'Last name*', type: 'text', registerKey: 'lName' },
        { label: 'Email', type: 'email', registerKey: 'email' },
    ];

    return (
        <div className='px-5 py-0 md:py-5 md:px-7'>
            <PageTitle title="Home - Edit profile" />
            <div>
                <h3 className='text-2xl font-bold'>Profile Details</h3>
                <p className='text-sm mt-1'>Add your details to create a personal touch to your profile.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='h-[calc(100vh-275px)]  mt-5 pb-7 space-y-4 border-b scrollable-profile'>
                <div className='md:h-1/2 bg-[#FAFAFA] rounded-xl p-3'>
                    <UploadImage image={image} setImage={setImage} setValue={setValue} />
                </div>
                <div className='md:h-1/2 mb-5 bg-[#FAFAFA] rounded-xl grid content-between ps-3 md:ps-5 p-3'>
                    {inputFields.map(({ label, type, registerKey }, index) => (
                        <div className='grid md:grid-cols-3 mb-1' key={index}>
                            <p>{label}</p>
                            <input className='col-span-2 border rounded-lg py-2 px-3 outline-none text-sm' type={type} {...register(registerKey)}  required/>
                        </div>
                    ))}
                </div>
                <input className='w-[calc(100%-55px)] md:w-fit absolute bottom-5 right-7 rounded-md font-medium cursor-pointer hover:bg-purple-700 bg-purple-500 text-white py-1 px-5' type="submit" value="Save" />
            </form>
        </div>
    );
}
