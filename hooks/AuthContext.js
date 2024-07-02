import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from './SignInScreen';

const AuthContext = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(isLoggedIn === 'true');
    } catch (error) {
      console.error('Error checking login state:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error saving login state:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error removing login state:', error);
    }
  };
}
  export default AuthContext;