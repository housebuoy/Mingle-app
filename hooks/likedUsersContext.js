import React, { createContext, useContext, useState } from 'react';

const LikedUsersContext = createContext();

export const LikedUsersProvider = ({ children }) => {
    const [likedUsers, setLikedUsers] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);

    return (
        <LikedUsersContext.Provider value={{ likedUsers, setLikedUsers, selectedInterests, setSelectedInterests }}>
            {children}
        </LikedUsersContext.Provider>
    );
};

export const useLikedUsers = () => useContext(LikedUsersContext);

export default LikedUsersContext;