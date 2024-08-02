import React from 'react'
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import logo from '../assets/images/logo.png';
import line from '../assets/images/line.png';
import apple from '../assets/images/signIcons/apple.png';
import facebook from '../assets/images/signIcons/facebook.png';
import google from '../assets/images/signIcons/google.png';
import { SafeAreaView } from 'react-native-safe-area-context';


const SignIn = ({navigation}) => {

    const handleSocialLoginClick = () => {
        Alert.alert(
          'Notice',
          'Oops! There is a problem and our engineers are working hard to solve it.',
          [{ text: 'OK' }]
        );
      };

  return (
    <SafeAreaView style={styles.container}>
        <View>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={{fontFamily: 'Poppins-Bold', color: '#000', marginTop: 20, fontSize: 24, textAlign: 'center'}} >
                Sign up to continue
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('EmailInput')} style={styles.button}>
                <Text style={styles.buttonText}>
                    Continue with email
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('MobileLogin')} style={{}}>
                <Text style={{fontFamily: 'Poppins-Bold', color: '#E94057', marginTop: 20, fontSize: 18, textAlign: 'center'}}>Use phone number</Text>
            </TouchableOpacity> */}
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: "center", marginHorizontal: 20}}>
            <Image source={line} style={styles.line} resizeMode="contain" />
            <Text style={{fontFamily: 'Poppins-Medium', color: '#000', marginTop: 20, fontSize: 18, textAlign: 'center', width: 70}}>or sign up with</Text>
            <Image source={line} style={styles.line} resizeMode="contain" />
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: "center", gap: 40, marginHorizontal: 20}}>
            <TouchableOpacity onPress={() => handleSocialLoginClick()} style={{paddingHorizontal:15, paddingVertical:15, borderRadius: 10, backgroundColor: '#d6d8d8'}}>
                <Image source={facebook} style={{}} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSocialLoginClick()} style={{paddingHorizontal:15, paddingVertical:15, borderRadius: 10, backgroundColor: '#d6d8d8'}}>
                <Image source={google} style={{}} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSocialLoginClick()} style={{paddingHorizontal:15, paddingVertical:15, borderRadius: 10, backgroundColor: '#d6d8d8'}}>
                <Image source={apple} style={{}} resizeMode="contain" />
            </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginEnd: 1, justifyContent: "center", gap: 40,}}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={{}}>
                <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16, color: '#E94057'}} onPress={() => navigation.navigate('TermsAndConditions')}>
                    Terms of use
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={{}}>
                <Text style={{fontFamily: 'Poppins-Medium', fontSize: 16, color: '#E94057',}} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
                    Privacy Policy
                </Text>
            </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: "center", gap: 4,}}>
        <Text style={{fontFamily: 'Poppins-Medium', color: "#8D8B8B", marginTop: 20, fontSize: 14, textAlign: 'center'}}>
            Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{fontFamily: 'Poppins-Bold', color: '#E94057', marginLeft: 20}}>Sign In</Text>
        </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 80,
        paddingBottom: 30,
    },
    logo: {
        marginLeft: 65,
        width: 150,
        height: 150,
    },
    line: {
        width: 150, 
        marginTop: 65,
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
        fontSize: 18,
      }
})