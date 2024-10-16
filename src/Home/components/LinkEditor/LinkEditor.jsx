import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PageTitle from '../../../PageTitle/PageTitle';
import LinkBoxes from './LinkBoxes/LinkBoxes';
import { AppContext } from '../../../context/AppContext';

export default function LinkEditor() {
    const { handleLinkDataChange, displayedLinks } = useContext(AppContext);
    const { reset, register, unregister, handleSubmit, setValue } = useForm();
    const [linkBoxes, setLinkBoxes] = useState([]);
    const [nextId, setNextId] = useState(1);
    const sectionRef = useRef(null);


    useEffect(() => {
        if (displayedLinks.length > 0) {
            const initializedLinkBoxes = displayedLinks.map((link) => ({
                id: link.id,
                link: link.link,
                platform: link.platform,
            }));
            setLinkBoxes(initializedLinkBoxes);
            setNextId(Math.max(...initializedLinkBoxes.map(box => box.id)) + 1);
        }
    }, [displayedLinks]);

    const validateLink = (platform, link) => {
        const isValid = {
            GitHub: link.includes('github.com'),
            YouTube: link.includes('youtube.com'),
            Linkedin: link.includes('linkedin.com'),
            Facebook: link.includes('facebook.com'),
            Instagram: link.includes('instagram.com'),
        };
        return isValid[platform];
    };

    const onSubmit = (data) => {
        const updatedLinkBoxes = linkBoxes.map((box) => ({
            id: box.id,
            link: data[`link_${box.id}`],
            platform: data[`platform_${box.id}`],
        }));
        const missingPlatforms = updatedLinkBoxes
            .filter((box) => !box.platform)
            .map((box) => box.id);

        const invalidLinks = updatedLinkBoxes.filter((box) => {
            return box.platform && !validateLink(box.platform, box.link);
        }).map((box) => box.id);

        if (linkBoxes.length === 0) {
            return;
        } else if (missingPlatforms.length > 0) {
            toast.error(`Please select platform for links: ${missingPlatforms.join(', ')}`, {
                style: { background: 'red' },
                position: 'top-center',
            });
            return;
        } else if (invalidLinks.length > 0) {
            toast.error(`Invalid links for platforms: ${invalidLinks.join(', ')}`, {
                style: { background: 'red' },
                position: 'top-center',
            });
            return;
        } else {
            handleLinkDataChange(updatedLinkBoxes);
            toast.success('Your links have been successfully saved!');
            setNextId(1);
        }
    };

    const addLinkBox = () => {
        setLinkBoxes((prev) => [{ id: nextId, link: '', platform: '' }, ...prev]);
        setNextId((prev) => prev + 1);
        toast.success('New link box created successfully!');
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const removeLinkBox = (id) => {
        setLinkBoxes((prev) => {
            const updatedBoxes = prev.filter((box) => box.id !== id);
            if (updatedBoxes.length === 0) {
                window.location.reload();
                setNextId(1);
            }
            return updatedBoxes;
        });
        reset();
    };

    const moveLink = (fromIndex, toIndex) => {
        const updatedBoxes = [...linkBoxes];
        const [movedBox] = updatedBoxes.splice(fromIndex, 1);
        updatedBoxes.splice(toIndex, 0, movedBox);
        setLinkBoxes(updatedBoxes);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="px-5 py-0 md:p-7">
                <PageTitle title="Home - Edit link" />
                <h3 className="text-2xl font-bold">Customize your links</h3>
                <p className="text-sm mt-1">Add/edit/remove links below and then share all your profiles with the world!</p>
                <button
                    className="my-7 border border-purple-500 text-purple-500 w-full py-1 rounded-md hover:bg-purple-500 hover:text-white font-medium"
                    onClick={addLinkBox}>
                    + Add new link
                </button>
                <div className="h-[calc(100vh-360px)] border-b lg:-mx-7 scrollable-link">
                    <form className="lg:px-7 w-full" onSubmit={handleSubmit(onSubmit)} ref={sectionRef}>
                        {linkBoxes.map((box, index) => (
                            <LinkBoxes
                                key={box.id}
                                id={box.id}
                                index={index}
                                setValue={setValue}
                                register={register}
                                unregister={unregister}
                                defaultLink={box.link || ''}
                                defaultPlatform={box.platform || ''}
                                removeLinkBox={() => removeLinkBox(box.id)}
                                moveLink={moveLink}
                                validateLink={validateLink}
                            />
                        ))}
                        <input
                            className={`w-[calc(100%-40px)] md:w-fit absolute bottom-5 md:right-7 rounded-md font-medium ${linkBoxes.length === 0 ? 'bg-purple-400 cursor-default' : 'bg-purple-500 hover:bg-purple-700 cursor-pointer '
                                } text-white py-1 px-5`}
                            type="submit"
                            value="Save"
                        />
                    </form>
                </div>
            </div>
        </DndProvider>
    );
}
