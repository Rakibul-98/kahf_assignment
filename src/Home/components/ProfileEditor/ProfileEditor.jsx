import React from 'react';
import PageTitle from '../../../PageTitle/PageTitle';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';

export default function ProfileEditor() {
    const { register, handleSubmit, reset } = useForm();
    const { handleProfileDataChange } = useOutletContext();

    const onSubmit = (data) => {
        const profileData = {
            ...data,
            profilePicture: data.profilePicture.length > 0 ? data.profilePicture[0] : null,
        };
        handleProfileDataChange(profileData);
        reset();
    };

    const inputFields = [
        { label: 'First name*', type: 'text', registerKey: 'fName' },
        { label: 'Last name*', type: 'text', registerKey: 'lName' },
        { label: 'Email', type: 'email', registerKey: 'email' },
    ];

    return (
        <div className='p-7'>
            <PageTitle title="Home - Edit profile" />
            <div>
                <h3 className='text-2xl font-bold'>Profile Details</h3>
                <p className='text-sm mt-1'>Add your details to create a personal touch to your profile.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='h-[calc(100vh-310px)] mt-6 space-y-4'>
                <div className='h-1/2 bg-[#FAFAFA] rounded-xl grid grid-cols-3 items-center px-5'>
                    <p>Profile Picture</p>
                    <input type="file" {...register('profilePicture')} />
                    <p className='text-sm'>Image must be below 1024x1024px. <br />Use PNG, JPG or BMP format.</p>
                </div>
                <div className='h-1/2 bg-[#FAFAFA] rounded-xl grid content-between ps-5 p-3'>
                    {inputFields.map(({ label, type, registerKey }, index) => (
                        <div className='grid grid-cols-3' key={index}>
                            <p>{label}</p>
                            <input className='col-span-2 border rounded-lg py-2 px-3 outline-none text-sm' type={type} {...register(registerKey)} />
                        </div>
                    ))}
                </div>
                <input className='absolute bottom-5 right-7 rounded-md font-medium cursor-pointer hover:bg-purple-700 bg-purple-500 text-white py-1 px-5' type="submit" value="Save" />
            </form>
        </div>
    );
}
