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
        const userId = await AsyncStorage.getItem('userToken');
        if (userId) {
          const userRef = doc(getFirestore(), 'users', userId);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            // Example: Calculating age
            const birthdate = new Date(userData.birthdate.toDate());
            const age = differenceInYears(new Date(), birthdate);
            const gallery = userData.gallery || [];

            setUserData({
              ...userData,
              age,
              gallery,
            });
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
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
