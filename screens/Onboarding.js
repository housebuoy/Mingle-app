import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import female1 from '../assets/images/onboarding/female1.png';
import female2 from '../assets/images/onboarding/female2.png';
import male from '../assets/images/onboarding/male.png';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import Swiper from 'react-native-swiper';

const Onboarding = ({navigation}) => {

return (
    <SafeAreaView style={styles.container}>
        <Swiper
            style={styles.wrapper}
            autoplay
            showsPagination={false}
            autoplayTimeout={5}
        >
            <View style={styles.slide}>
                <View style={styles.subSlide}>
                    <Image source={female2} style={styles.subImage} resizeMode="cover"/>
                    <Image source={female1} style={styles.image} resizeMode="contain" />
                    <Image source={male} style={styles.subImage} resizeMode="cover"/>
                </View>                
            </View>
                <View style={styles.slide}>
                    <View style={styles.subSlide}>
                    <Image source={female1} style={styles.subImage} resizeMode="cover" />
                    <Image source={male} style={styles.image} resizeMode="contain" />
                    <Image source={female2} style={styles.subImage} resizeMode="cover" />
                </View>
            </View>
            <View style={styles.slide}>
                    <View style={styles.subSlide}>
                    <Image source={male} style={styles.subImage} resizeMode="cover" />
                    <Image source={female2} style={styles.image} resizeMode="contain" />
                    <Image source={female1} style={styles.subImage} resizeMode="cover" />
            </View>
            </View>
        </Swiper>
        <View style={styles.contentContainer}>
            <Text style={styles.text}>
                mingle
            </Text>
            <View style={{marginTop: 5}}>
                <Text style={styles.tipText}>
                    By tapping "
                    <Text style={{color: '#E94057', fontFamily: 'Poppins-Bold'}}>
                        Create an account
                        <Text style={styles.tipText}>
                            " or "
                            <Text style={{color: '#E94057', fontFamily: 'Poppins-Bold'}}>
                                Sign in
                                <Text style={styles.tipText}>
                                    " you agree to our
                                    <Text style={{color: '#E94057', fontFamily: 'Poppins-Bold',}}>
                                        Terms
                                        <Text style={styles.tipText}>
                                            and
                                            <Text style={{color: '#E94057', fontFamily: 'Poppins-Bold'}}>
                                                Conditions
                                            </Text>
                                        </Text>
                                    </Text>
                                </Text>
                            </Text>
                        </Text>
                    </Text>
                </Text>             
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.button}>
                <Text style={styles.buttonText}>
                    Create an account
                </Text>
            </TouchableOpacity>
            <Text style={styles.tipText}>
                    Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={{}}>
                <Text style={{fontFamily: 'Poppins-Bold', color: '#E94057', marginLeft: 20}}>Sign In</Text>
            </TouchableOpacity>
        </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
  },
  subSlide:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  swiperWrapper: {
    // Adjustments to ensure the swiper takes up less space
    marginBottom: 0, // Ensure there's no extra space below the swiper
  },
  contentContainer: {
    marginTop: 0, // Adjust based on your needs, or remove if unnecessary
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },

  tipText: {
    color: "#8D8B8B",
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    paddingHorizontal: 43,
    marginTop: 20
  },

  image: {
    width: 250,
    height: 450,
  },

  subImage: {
    width: 70,
    height: 280,
  },

  slide: {
    flex: 1,
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 0
  },

  text: {
    fontSize: 64,
    fontFamily: 'GrandHotel-Regular',
    color: '#000',
    marginTop: -40,
  },

  Button: {
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 15,
    fontFamily: 'Poppins-Bold'
  },

  button: {
    backgroundColor: '#E94057',
    marginVertical: 10,
    paddingHorizontal: 55,
    paddingVertical: 18,
    borderRadius: 10,
  },

  buttonText: {
    backgroundColor: '#E94057',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  }

});
