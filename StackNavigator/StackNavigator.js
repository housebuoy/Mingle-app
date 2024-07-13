import React, { useContext, useEffect } from 'react'
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
import MatchScreen from '../screens/MatchScreen.js';
import MessageScreen from '../screens/MessageScreen.js';
import {LikedUsersProvider} from '../hooks/likedUsersContext.js';
import ChatScreen from '../screens/ChatScreen.js';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import AccountProfileScreen from '../screens/AccountProfileScreen.js';
import ProfileUpdate from '../screens/ProfileUpdate.js';
import UpdateInterests from '../screens/UpdateInterests.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth, signOut, } from 'firebase/auth'
import { useUser } from '../context/UseContext';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import UpdateGender from '../screens/UpdateGender.js';


export default function App({profilePicture}) {
    const navigation = useNavigation();
    const { setUserData } = useUser();
    const handleGoBack = () => {
        navigation.goBack();
    };
    const auth = getAuth();
    const logout = async () => {
        try {
          await signOut(auth);
          // Remove the user's login token from AsyncStorage
          await AsyncStorage.removeItem('userToken');
          navigation.navigate('Login');
        //   setUserData(null)
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };
    
  return (
    <LikedUsersProvider>
      <Stack.Navigator
       initialRouteName="Welcome"
       >
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
            name="ProfileUpdate" 
            component={ProfileUpdate}
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
            name="UpdateGender" 
            component={UpdateGender}
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
            name="InterestUpdate" 
            component={UpdateInterests}
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
            <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
                headerShown: false,
            }} 
            />
            <Stack.Screen 
            name="Matches" 
            component={MatchScreen}
            options={{
                headerShown: false,
            }} 
            />
            <Stack.Screen 
            name="Messages" 
            component={MessageScreen}
            options={{
                headerShown: false,
            }} />
            <Stack.Screen 
            name="Chat" 
            component={ChatScreen}
            options={({ route }) => ({
                title: route.params.userName,
                headerLeft: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'space-between',}}>
                      <Image
                        source={ route.params.profilePicture }
                        style={{ width: 50, height: 50, borderRadius: 30, marginLeft: 25 }}
                        resizeMode='cover'
                      />
                    </View>),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'space-between',}}>
                          <TouchableOpacity style={{        
                                paddingVertical: 12,
                                paddingHorizontal: 12,
                                borderWidth: 1,
                                borderColor: '#E8E6EA',
                                borderRadius: 10, 
                                marginRight: 15}} >
                            <Icon name="options-vertical" type='simple-line-icon' size={20} color="#E94057" />
                          </TouchableOpacity>
                        </View>),
                    headerTitleStyle: {
                        fontFamily: 'Poppins-Bold',
                        fontSize: 20
                      },
                      headerStyle: {
                        height: 100,
                        borderBottomWidth: 1,
                        borderColor: '#ccc'
                      },
      
            })}/>
                    <Stack.Screen 
            name="Account" 
            component={AccountProfileScreen}
            options={{
                headerLeft: () => (
                    <TouchableOpacity style={styles.topRightNav} onPress={handleGoBack}>
                        <Icon name="chevron-left" type='entypto' size={30} color="#E94057" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                      <TouchableOpacity 
                      onPress={() => {
                        logout()
                        // console.log(auth.currentUser.uid)
                      }}
                      style={{        
                            paddingVertical: 12,
                            paddingHorizontal: 12,
                            borderWidth: 1,
                            borderColor: '#E8E6EA',
                            borderRadius: 10, 
                            marginRight: 15}} >
                        <Icon name="logout" size={30} color="#E94057" />
                      </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontFamily: 'Poppins-Bold',
                    fontSize: 30,
                },
                headerStyle: {
                    height: 100,
                    borderBottomWidth: 1,
                    borderColor: '#ccc'
                },
                    
            }} />
      </Stack.Navigator>
      </LikedUsersProvider>
  );
}

const styles = StyleSheet.create({
    topRightNav: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#E8E6EA',
        borderRadius: 10,
        marginLeft: 10
      },
})

