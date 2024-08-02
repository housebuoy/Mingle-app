import fonts from './components/Fonts.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import StackNavigator from './StackNavigator/StackNavigator.js'
import { UserProvider } from './context/UseContext.js';
import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  fonts()
  return (    
      <NavigationContainer>
        <UserProvider>
        <StackNavigator />
        </UserProvider>
      </NavigationContainer>
  );}

