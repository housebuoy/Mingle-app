import React, { createContext, useContext, useState } from 'react';

const LikedUsersContext = createContext();

export const LikedUsersProvider = ({ children }) => {
    const [likedUsers, setLikedUsers] = useState([]);

    return (
        <LikedUsersContext.Provider value={{ likedUsers, setLikedUsers }}>
            {children}
        </LikedUsersContext.Provider>
    );
};

export const useLikedUsers = () => useContext(LikedUsersContext);

export default LikedUsersContext;