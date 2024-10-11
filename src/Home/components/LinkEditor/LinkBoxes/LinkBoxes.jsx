/* eslint-disable react/prop-types */


import { useState, useEffect, useContext, useMemo } from 'react';
import { FaChevronDown, FaFacebookSquare, FaGripLines, FaInstagramSquare, FaLink, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { TbBrandGithubFilled } from 'react-icons/tb';
import { AppContext } from '../../../../context/AppContext';
import { useDrag, useDrop } from 'react-dnd';


export default function LinkBoxes({ register, unregister, setValue, id, defaultLink, defaultPlatform, removeLinkBox,index, moveLink }) {
  const { handleRemoveLink } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState('');

  const [{ isDragging }, drag] = useDrag({
    type: 'LINK_BOX',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'LINK_BOX',
    hover: (item) => {
      if (item.index !== index) {
        moveLink(item.index, index);
        item.index = index;
      }
    },
  });

  const linkOptions = useMemo(() => [
    { value: 'GitHub', label: 'GitHub', icon: <TbBrandGithubFilled /> },
    { value: 'YouTube', label: 'YouTube', icon: <FaYoutube /> },
    { value: 'Linkedin', label: 'LinkedIn', icon: <FaLinkedin /> },
    { value: 'Facebook', label: 'Facebook', icon: <FaFacebookSquare /> },
    { value: 'Instagram', label: 'Instagram', icon: <FaInstagramSquare /> }
  ], []);

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

  const handleSelect = (option) => {
    unregister(`platform_${id}`);
    setSelectedOption(option);
    register(`platform_${id}`, { value: option.value });
    setIsOpen(false);
    setError('');
    setValue(`link_${id}`, '');
  };

  const handleLinkChange = (e) => {
    const link = e.target.value;
    const isValid = validateLink(selectedOption.value, link);
    setError(isValid ? '' : `Invalid ${selectedOption.label} link`);
    setValue(`link_${id}`, link);
  };

  const handleRemove = () => {
    handleRemoveLink(id);
    removeLinkBox();
  };

  useEffect(() => {
    const selected = linkOptions.find(option => option.value === defaultPlatform);
    if (selected) {
      setSelectedOption(selected);
      register(`platform_${id}`, { value: defaultPlatform });
    }
  }, [defaultPlatform, id, register, linkOptions]);

  return (
    <div className={`${isDragging ? 'opacity-50' : ''}bg-[#FAFAFA] p-3 mb-4 rounded-lg`}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className='flex justify-between'>
        <h2 ref={(node) => drag(drop(node))} title='Drag and drop to reorder' className='flex items-center gap-2 hover:cursor-move'><FaGripLines />Link #{id}</h2>
        <button className='hover:text-red-500 font-medium' onClick={handleRemove}>Remove</button>
      </div>
      <div className='space-y-2'>
        <div>
          <label htmlFor={`platform_${id}`}>Platform</label>
          <div className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`form-control ps-3 w-full border p-1 outline-none rounded-md bg-white cursor-pointer`}
            >
              {selectedOption ? (
                <div className="flex items-center">
                  {selectedOption.icon}
                  <span className="ml-3">{selectedOption.label}</span>
                </div>
              ) : (
                <span>Select a platform</span>
              )}
            </div>
            <span className={`absolute right-3 inset-y-2 transition-all duration-500 ${isOpen && 'rotate-180'}`}><FaChevronDown /></span>
            {isOpen && (
              <ul className="absolute w-full border border-gray-300 rounded-md mt-1 bg-white z-50">
                {linkOptions.map((option, i) => (
                  <li key={i} onClick={() => handleSelect(option)} className="flex items-center ps-3 p-2 hover:bg-gray-200 cursor-pointer">
                    {option.icon}
                    <span className="ml-3">{option.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className='relative'>
          <label htmlFor={`link_${id}`}>Link</label>
          <input
            className={`form-control ps-10 border w-full rounded-md outline-none p-1 `}
            {...register(`link_${id}`)}
            onChange={handleLinkChange}
            defaultValue={defaultLink || ''}
            required
          />
          <span className='absolute bottom-[10px] left-3 text-gray-500'><FaLink /></span>
          {error && <p className='absolute -mt-[2px] text-xs text-red-500'>{error}</p>}
        </div>
      </div>
    </div>
  );
}



