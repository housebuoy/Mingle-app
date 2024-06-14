import React, { useState } from 'react';
import { View, Text, StatusBar, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Pressable, Modal } from 'react-native';

const MobileLogin = ({navigation}) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const validateMobileNumberFormat = (number) => {
        const regex = /^\+\d{4,15}/;
        if (!regex.test(number)) {
            setModalMessage("Please enter a valid mobile number with country code.");
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
              }, 1000);
            return false;
        }else{
            setTimeout(() => {
                setModalVisible(false);
                navigation.navigate('PhoneVerificationScreen');
              }, 1000);
            return true;
        }
    };

    const handleSubmit = () => {
        if (validateMobileNumberFormat(mobileNumber)) {
            console.log('Mobile Number:', mobileNumber);
            verifyMobileNumber(mobileNumber);
        }
    };

    const verifyMobileNumber = (number) => {
        console.log('Verifying mobile number:', number);
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
                            keyboardType='phone-pad'
                        />
                    </View>
                </View>
                <Pressable style={styles.button} onPress={ handleSubmit}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                    </View>
                </View>
            </Modal>
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
      modalView: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },

});