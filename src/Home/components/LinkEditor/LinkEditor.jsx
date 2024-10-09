import { useState } from 'react';
import PageTitle from '../../../PageTitle/PageTitle'
import LinkBoxes from './LinkBoxes/LinkBoxes'
import { useForm } from 'react-hook-form'

export default function LinkEditor() {

    const { register, handleSubmit } = useForm();
    const [linkBoxes, setLinkBoxes] = useState([]);
    const [nextId, setNextId] = useState(1);

    const onSubmit = (data) => {
        console.log(data)
    }

    const addLinkBox = () => {
        setLinkBoxes((prev) => [...prev, { id: nextId }]);
        setNextId((prev) => prev + 1);
    };

    const removeLinkBox = (id) => {
        setLinkBoxes((prev) => {
            const updatedBoxes = prev.filter(box => box.id !== id);
            if (updatedBoxes.length === 0) {
                setNextId(1);
            }
            return updatedBoxes;
        });
    };

    return (
        <div className='p-7'>
            <PageTitle title="Home - Edit link" />
            <div>
                <h3 className='text-2xl font-bold'>Customize your links</h3>
                <p className='text-sm mt-1'>Add/edit/remove links below and then share all your profiles with the world!</p>
                <button className='my-7 border border-purple-500 text-purple-500 w-full py-1 rounded-md hover:bg-purple-500 hover:text-white font-medium' onClick={addLinkBox}>+ Add new link</button>
            </div>
            <div className=' h-[calc(100vh-360px)] overflow-y-scroll border-b -mx-7'>
                <form className='mx-7' onSubmit={handleSubmit(onSubmit)}>
                    {linkBoxes.map((box) => (
                        <LinkBoxes
                            key={box.id}
                            id={box.id}
                            register={register}
                            removeLinkBox={() => removeLinkBox(box.id)}
                        />
                    ))}

                    <input className='absolute bottom-5 right-7 rounded-md font-medium cursor-pointer hover:bg-purple-700 bg-purple-500 text-white py-1 px-5' type="submit" />
                </form>
            </div>
        </div >
    )
}
