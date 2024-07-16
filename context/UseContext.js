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
  const [lastMessages, setLastMessages] = useState([])
  const [error, setError] = useState(null);
  const [storedUserId, setStoredUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user data is already stored in AsyncStorage
        const storedUserData = await AsyncStorage.getItem('userdata');
        

        // If user data is not in AsyncStorage, fetch it from Firestore
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          if (userToken !== storedUserId) {
            // Fetch user data from Firestore
            const userRef = doc(getFirestore(), 'users', userToken);
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
              await AsyncStorage.setItem('userToken', userToken);
              setStoredUserId(userToken);
              setUserData(updatedUserData);
            } else {
              console.error('No such document!');
            }
          } else {
            // User data is already in AsyncStorage, no need to fetch from Firestore
            if (storedUserData) {
              const parsedUserData = JSON.parse(storedUserData);
              setUserData(parsedUserData);
              setLoading(false);
              return;
            }
            setLoading(false);
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