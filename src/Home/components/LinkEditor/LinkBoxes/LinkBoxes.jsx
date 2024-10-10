import { useState, useEffect } from 'react';
import { FaChevronDown, FaFacebookSquare, FaGripLines, FaInstagramSquare, FaLink, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { TbBrandGithubFilled } from 'react-icons/tb';

export default function LinkBoxes({ register, unregister, removeLinkBox, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const linkOptions = [
    { value: 'GitHub', label: 'GitHub', icon: <TbBrandGithubFilled /> },
    { value: 'YouTube', label: 'YouTube', icon: <FaYoutube /> },
    { value: 'Linkedin', label: 'LinkedIn', icon: <FaLinkedin /> },
    { value: 'Facebook', label: 'Facebook', icon: <FaFacebookSquare /> },
    { value: 'Instagram', label: 'Instagram', icon: <FaInstagramSquare /> }
  ];

  const validateLink = (platform, link) => {
    const isValid = {
      GitHub: link.includes('github.com'),
      YouTube: link.includes('youtube.com'),
      Linkedin: link.includes('linkedin.com'),
      Facebook: link.includes('facebook.com'),
      Instagram: link.includes('instagram.com'),
    };
    return isValid[platform] ? '' : `Please provide a valid ${platform} link`;
  };

  const handleSelect = (option) => {
    if (selectedOption) {
      unregister(`platform_${id}`);
    }
    setSelectedOption(option);
    setIsOpen(false);
    setLink('');
    setError('');
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleLinkBlur = () => {
    if (selectedOption) {
      const linkValidationError = validateLink(selectedOption.value, link);
      setError(linkValidationError);

      if (!linkValidationError) {
        register(`link_${id}`, { value: link });
      }
    }
  };

  useEffect(() => {
    if (selectedOption) {
      register(`platform_${id}`, { value: selectedOption.value });
      const linkValidationError = validateLink(selectedOption.value, link);
      setError(linkValidationError);
    }
  }, [selectedOption, register,id, link]);

  return (
    <div className='bg-[#FAFAFA] p-3 mb-4 rounded-lg'>
      <div className='flex justify-between'>
        <h2 className='flex items-center gap-2'><FaGripLines />Link #{id.split('-')[0]}</h2>
        <button className='hover:text-red-500 font-medium' onClick={removeLinkBox}>Remove</button>
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
            value={link}
            onChange={handleLinkChange}
            onBlur={handleLinkBlur}
            required
          />
          <span className='absolute bottom-[10px] left-3 text-gray-500'><FaLink /></span>
          {error && <p className='absolute -mt-[2px] text-xs text-red-500'>{error}</p>}
        </div>
      </div>
    </div>
  );
}
