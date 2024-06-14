import React, {useState, useEffect} from 'react'
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity, TextInput, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
// import Constants from 'expo-constants';
import { useCallback } from 'react';


const MobileLogin = ({navigation}) => {
    // const [selected, setSelected] = React.useState('+91');
    // const [country, setCountry] = React.useState('');
    // const [phone, setPhone] = React.useState('');

    const [mobileNumber, setMobileNumber] = useState('');

    const handleSubmit = () => {
        // Handle form submission and mobile number verification logic here
        console.log('Mobile Number:', mobileNumber);
        // Call a function to send the mobile number for verification
        verifyMobileNumber(mobileNumber);
    };

    const verifyMobileNumber = (number) => {
        // Implement your mobile number verification logic here
        console.log('Verifying mobile number:', number);
        // Simulate a successful verification
        console.log('Mobile number verified successfully!');
    };


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textHeading}>
                    My mobile
                </Text>
                <Text style={styles.textBody}>
                    Please enter your valid phone number. We will send you a 4-digit code to verify your account.
                </Text>
            </View>
            <View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity >
                        <View style={styles.countryCodeContainer}>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.inputTelContainer}>
                        <TextInput
                            style={[styles.input]}
                            placeholder="+233 207026823"
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>
                <Pressable style={styles.button} onPress={ handleSubmit}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
            </View>
            
        </SafeAreaView>
    )
}

export default MobileLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    textHeading: {
        fontSize: 44,
        fontFamily: 'Poppins-Bold',
        color: '#000'
    },
    textBody: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#4D4D4D'
    },
    input: {
        fontSize: 24,
        fontFamily: 'Poppins-Medium',
        color: '#4D4D4D',
        width: '100%',
        paddingHorizontal:  20,
        paddingVertical : 25,
    },
    inputContainer: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: '#000',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    inputTelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        width: '70%',
        flex: 2,

    },
    button: {
        backgroundColor: '#E94057',
        marginVertical: 10,
        paddingHorizontal: 55,
        paddingVertical: 18,
        borderRadius: 10,
      },

      buttonText: {
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        textAlign: 'center'
      },

});