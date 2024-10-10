import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [linkData, setLinkData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const totalSkeletons = 5;
    const displayedLinks = linkData;
    const [previewActive, setPreviewActive] = useState(false);

    const handleLinkDataChange = (newData) => {
        setLinkData((prevData) => [...prevData, ...newData]);
    };

    const handleProfileDataChange = (newData) => {
        setProfileData(newData);
    };

    return (
        <AppContext.Provider value={{ linkData, profileData, handleLinkDataChange, handleProfileDataChange, totalSkeletons, displayedLinks, previewActive, setPreviewActive }}>
            {children}
        </AppContext.Provider>
    );
};