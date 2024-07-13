import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo.png';
import mingle from '../assets/images/mingle.png';
import fonts from '../components/Fonts'
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
// import { checkUser } from '../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from '../utils/firebaseConfig';
import { getAuth } from '@firebase/auth';




const Welcome = () => {
  fonts()
  const auth = getAuth(app);

  const navigation = useNavigation();

  useEffect(() => {
    const checkUserToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        // User is already logged in, navigate to the home screen
        console.log(userToken)
        const timer = setTimeout(() => {
          navigation.navigate('Home');
        }, 3000); // 3000 milliseconds = 3 seconds
        return () => clearTimeout(timer);
      } else {
        // User is not logged in, navigate to the onboarding screen
        const timer = setTimeout(() => {
          navigation.navigate('Onboarding');
        }, 3000); // 3000 milliseconds = 3 seconds
        return () => clearTimeout(timer);
      }
    };
    checkUserToken();
  }, [navigation]);


  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={mingle} style={styles.logoText} resizeMode="contain" />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subText}>Powered by</Text>
        <Text style={styles.subLogoText}>mingle.inc</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  contentContainer: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoText: {
    width: 120,
    height: 80,
  },
  subLogoText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#e94057'
  },
  subText: {
    fontSize: 16,
    marginBotto : 10,
    fontFamily: 'Poppins-Medium',
    color: '#7D7D7B'
  },
});