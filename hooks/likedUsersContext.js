import React, { createContext, useContext, useState } from 'react';

const LikedUsersContext = createContext();

export const LikedUsersProvider = ({ children }) => {
    const [likedUsers, setLikedUsers] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
      };

    return (
        <LikedUsersContext.Provider value={{ likedUsers, setLikedUsers, selectedInterests, setSelectedInterests, isModalVisible, toggleModal }}>
            {children}
        </LikedUsersContext.Provider>
    );
};

export const useLikedUsers = () => useContext(LikedUsersContext);

export default LikedUsersContext;