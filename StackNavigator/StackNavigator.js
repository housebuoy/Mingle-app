import {useState} from 'react'
import Welcome from '../screens/Welcome';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../screens/Onboarding';
import SignIn from '../screens/SignIn';
import MobileLogin from '../screens/MobileLogin';
import EmailInputScreen from '../screens/EmailInputScreen.js';
import Login from '../screens/Login.js';
import PhoneVerificationScreen from '../screens/PhoneVerificationScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
const Stack = createStackNavigator();
import GenderScreen from '../screens/GenderScreen.js';
import InterestsScreen from '../screens/InterestsScreen.js';
import EnableLocationScreen from '../screens/EnableLocationScreen.js';
import SearchFriendsScreen from '../screens/SearchFriendsScreen.js';
import AllowNotificationScreen from '../screens/AllowNotificationsScreen.js';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import useAuth from '../hooks/useAuth.js';

export default function App() {

    const {user} = useAuth()
  return (
      <Stack.Navigator initialRouteName="Welcome">
        {user ? (
            <>
            <Stack.Screen 
            name="Welcome" 
            component={Welcome}
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen 
            name="Onboarding" 
            component={Onboarding}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="SignIn" 
            component={SignIn}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="Login" 
            component={Login}
            options={{
              headerShown: false,
            }} />
            <Stack.Screen 
            name="MobileLogin" 
            component={MobileLogin}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="EmailInput" 
            component={EmailInputScreen}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="PhoneVerificationScreen" 
            component={PhoneVerificationScreen}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="Gender" 
            component={GenderScreen}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="Interests" 
            component={InterestsScreen}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="EnableLocation" 
            component={EnableLocationScreen}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="Searchfriend" 
            component={SearchFriendsScreen}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="AllowNotification" 
            component={AllowNotificationScreen}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="ForgotPassword" 
            component={ForgotPasswordScreen}
            options={{
                headerShown: false,
            }} />
            </>
            ) : (
            <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
                headerShown: false,
            }} />)}
      </Stack.Navigator>
  );
}

