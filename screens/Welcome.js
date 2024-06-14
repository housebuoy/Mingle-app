import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo.png';
import fonts from '../components/Fonts'
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';




const Welcome = () => {
  fonts()
    const navigation = useNavigation();

    useEffect(() => {
    const timer = setTimeout(() => {
        navigation.navigate('Onboarding');
    }, 3000); // 3000 milliseconds = 3 seconds
        return () => clearTimeout(timer);
    }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logoText}>mingle</Text>
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
    fontSize: 64,
    fontFamily: 'GrandHotel-Regular',
    color: '#000',
    marginLeft: 20
  },
  subLogoText: {
    fontSize: 24,
    fontFamily: 'GrandHotel-Regular',
    color: '#690002'
  },
  subText: {
    fontSize: 16,
    marginBotto : 10,
    fontFamily: 'Poppins-Medium',
    color: '#7D7D7B'
  },
});