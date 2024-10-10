import { useContext, useState } from 'react';
import PageTitle from '../../../PageTitle/PageTitle';
import LinkBoxes from './LinkBoxes/LinkBoxes';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AppContext } from '../../../context/AppContext';

export default function LinkEditor() {
    const { handleLinkDataChange } = useContext(AppContext);
    const { register, unregister, handleSubmit, reset } = useForm();
    const [linkBoxes, setLinkBoxes] = useState([]);
    const [nextId, setNextId] = useState(1);

    const onSubmit = (data) => {

        const formattedData = linkBoxes.map(box => ({
            id: box.id,
            link: data[`link_${box.id}`],
            platform: data[`platform_${box.id}`],
        }));


        const isLinkMissing = formattedData.some(box => !box.link);

        const missingPlatforms = formattedData
            .filter(box => !box.platform)
            .map(box => box.id.split('-')[0]);


        if (linkBoxes.length === 0) {
            return;
        }
        else if (missingPlatforms.length > 0) {
            toast.error(`Please select platform for links : ${missingPlatforms.join(', ')}`, {
                style: {
                    background: 'red',
                },
                position: 'top-center',
            });
            return;
        }
        else if (isLinkMissing) {
            toast.error('Please ensure all links are filled correctly before submitting!', {
                style: {
                    background: 'red',
                },
                position: 'top-center',
            });
            return;
        }
        else {
            handleLinkDataChange(formattedData);
            toast.success('Your links successfully saved!');
            reset();
            setLinkBoxes([]);
            setNextId(1);
        }
    };

    const addLinkBox = () => {
        const uniqueId = `${nextId}-${Date.now()}`;
        setLinkBoxes(prev => [{ id: uniqueId }, ...prev]);
        setNextId(prev => prev + 1);
    };

    const removeLinkBox = (id) => {
        setLinkBoxes(prev => prev.filter(box => box.id !== id));
    };

    return (
        <div className='p-7'>
            <PageTitle title="Home - Edit link" />
            <h3 className='text-2xl font-bold'>Customize your links</h3>
            <p className='text-sm mt-1'>Add/edit/remove links below and then share all your profiles with the world!</p>
            <button className='my-7 border border-purple-500 text-purple-500 w-full py-1 rounded-md hover:bg-purple-500 hover:text-white font-medium' onClick={addLinkBox}>+ Add new link</button>
            <div className='h-[calc(100vh-360px)] border-b -mx-7 scrollable'>
                <form className='mx-7' onSubmit={handleSubmit(onSubmit)}>
                    {linkBoxes.map(box => (
                        <LinkBoxes
                            key={box.id}
                            id={box.id}
                            register={register}
                            unregister={unregister}
                            removeLinkBox={() => removeLinkBox(box.id)}
                        />
                    ))}
                    <input className={`absolute bottom-5 right-7 rounded-md font-medium  ${linkBoxes.length === 0 ? 'bg-purple-400 cursor-default' : 'bg-purple-500 hover:bg-purple-700 cursor-pointer '}  text-white py-1 px-5`} type="submit" value="Save" />
                </form>
            </div>
        </div>
    );
}
