import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { differenceInYears } from 'date-fns';

// Create context
const UserContext = createContext();

// Custom hook to use user context
export const useUser = () => useContext(UserContext);

// UserProvider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user data is already stored in AsyncStorage
        const storedUserData = await AsyncStorage.getItem('userdata');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
          setLoading(false);
          return;
        }

        // If user data is not in AsyncStorage, fetch it from Firestore
        const userId = await AsyncStorage.getItem('userToken');
        if (userId) {
          const userRef = doc(getFirestore(), 'users', userId);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            // Calculating age
            const birthdate = new Date(userData.birthdate.toDate());
            const age = differenceInYears(new Date(), birthdate);
            const gallery = userData.gallery || [];

            const updatedUserData = {
              ...userData,
              age,
              gallery,
            };

            // Save user data to AsyncStorage
            await AsyncStorage.setItem('userdata', JSON.stringify(updatedUserData));
            setUserData(updatedUserData);
          } else {
            console.error('No such document!');
          }
        } else {
          console.error('No user is signed in');
        }
      } catch (error) {
        setError(error);
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading, error, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};