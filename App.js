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
import {useState} from 'react'
import StackNavigator from './StackNavigator/StackNavigator.js'
import { AuthProvider } from './hooks/useAuth.js';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  fonts()


  return (
    
      <NavigationContainer>
        {/* <AuthProvider> */}
        <StackNavigator />
        {/* </AuthProvider>r */}
      </NavigationContainer>
    
  );}

