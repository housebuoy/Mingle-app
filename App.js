import fonts from './components/Fonts.js';
import Welcome from './screens/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './screens/Onboarding';
import SignIn from './screens/SignIn';
import MobileLogin from './screens/MobileLogin';
import EmailInputScreen from './screens/EmailInputScreen.js';
// import Login from './screens/Login.js';
const Stack = createStackNavigator();

export default function App() {
  fonts()
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
        {/* <Stack.Screen 
          name="Login" 
          component={Login}
          options={{
            headerShown: false,
          }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
