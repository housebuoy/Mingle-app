import fonts from './components/Fonts.js';
import Welcome from './screens/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './screens/Onboarding';
import SignIn from './screens/SignIn';
import MobileLogin from './screens/MobileLogin';
import EmailInputScreen from './screens/EmailInputScreen.js';
import Login from './screens/Login.js';
import PhoneVerificationScreen from './screens/PhoneVerificationScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
const Stack = createStackNavigator();
import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from 'firebase/auth';
import {useState} from 'react'
import firebase from 'firebase/compat/app';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  fonts()
  const firebaseConfig = {
    apiKey: "AIzaSyDixvimHovdeu5raYj4LTnkXH6YVdBOgFg",
    authDomain: "mingle-3b8ec.firebaseapp.com",
    projectId: "mingle-3b8ec",
    storageBucket: "mingle-3b8ec.appspot.com",
    messagingSenderId: "701325819599",
    appId: "1:701325819599:web:3de1e240c8881178f681ba"
  };

  if(firebase.apps.length){
    firebase.initializeApp(firebaseConfig);  
  }

  firebase.onAuthStateChanged(auth, (user) => {
    if (user != null){
      console.log('We are authenticated now!');
    }
  })


  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
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
          name="Login" 
          component={Login}
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
      </Stack.Navigator>
    </NavigationContainer>
  );}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
