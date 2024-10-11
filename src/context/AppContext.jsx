import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [linkData, setLinkData] = useState(() => {
        return JSON.parse(localStorage.getItem('linkData')) || [];
    });
    const [profileData, setProfileData] = useState(() => {
        return JSON.parse(localStorage.getItem('profileData')) || [];
    });
    const totalSkeletons = 5;
    const displayedLinks = linkData;
    const [previewActive, setPreviewActive] = useState(false);


    const handleLinkDataChange = (newData) => {
        setLinkData(newData);
        localStorage.setItem('linkData', JSON.stringify(newData));
    };

    const handleRemoveLink = (id) => {
        const updatedLinkData = linkData.filter(link => link.id !== id);
        setLinkData(updatedLinkData);
        localStorage.setItem('linkData', JSON.stringify(updatedLinkData));
    };

    const handleProfileDataChange = (newData) => {
        setProfileData(newData);
        localStorage.setItem('profileData', JSON.stringify(newData));
    };

    return (
        <AppContext.Provider
            value={{
                linkData,
                profileData,
                handleLinkDataChange,
                handleProfileDataChange,
                totalSkeletons,
                displayedLinks,
                previewActive,
                setPreviewActive,
                handleRemoveLink,
            }}>
            {children}
        </AppContext.Provider>
    );
};