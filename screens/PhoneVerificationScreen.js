import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from '../utils/firebaseConfig';


const PhoneVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const refs = useRef([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateCodeInputs = () => {
    const allFilled = code.every(input => input!== '');
    if (!allFilled) {
      setModalMessage("Please fill in all verification code inputs.");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('PhoneVerificationScreen');
      }, 1000);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const resetTimer = () => {
    setTimer(60); // Assuming 60 seconds is the initial timer value
  };

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < 3 && value) {
      const nextInput = refs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (index === 3 && value) {
      // All inputs are filled
      navigation.navigate('Profile');
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber
          handleSignInWithPhoneNumber();
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaVerifier.reset(widgetId);
          });
        },
      },
      auth
    );
  }, []);

  const handleSignInWithPhoneNumber = async () => {
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        route.params.mobileNumber,
        window.recaptchaVerifier
      );
      // User is now signed in
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error signing in with phone number:', error);
      setModalMessage('Error verifying phone number. Please try again.');
      setModalVisible(true);
    }
  };

  const handleVerify = () => {
    if (validateCodeInputs()) {
      handleSignInWithPhoneNumber();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContainer}>
      <Text style={styles.SectionTitle}>Verification Code</Text>
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 20, color: "#8D8B8B", lineHeight: 25, width: '80%', textAlign: 'center' }}>Type the verification code we've sent you via sms.</Text>
        <Text style={styles.timerText}>{`00:${timer < 10 ? '0' : ''}${timer}`}</Text>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => refs.current[index] = ref}
              style={[styles.input, styles.codeInput, digit && styles.filledInput]}
              keyboardType="number-pad"
              maxLength={1}
              // placeholder='0'
              value={digit}
              onChangeText={(value) => handleChange(index, value)}
            />
          ))}
        </View>
        <TouchableOpacity onPress={() => {
          handleVerify
          }} style={styles.button}>
          <Text style={styles.buttonText}>
              Verify
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={styles.buttonResend}>
          <Text style={styles.buttonResendText}>
              Resend
          </Text>
          </TouchableOpacity>
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
      </View>
    </SafeAreaView>
  );
};

export default PhoneVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  timerText: {
    fontSize: 40,
    color: '#000000',
    marginVertical: 20,
    fontFamily: 'Poppins-Bold'
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    width: '80%',
    marginBottom: 30,
  },
  codeInput: {
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ccc',
    fontSize: 26,
    textAlign: 'center',
    paddingVertical: 10,
    width: '22%',
    borderRadius: 10,
    backgroundColor: 'white',
    color: '#E94057',
    fontFamily: 'Poppins-Bold',
  },
  filledInput: {
    backgroundColor: '#E94057',
    color: '#ffffff',
  },
  input: {
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#d80808',
    borderRadius: 25,
    fontSize: 26,
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
    color: '#c04b4b',
  },
  inputButton: {
    backgroundColor: '#E94057',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },

  SectionTitle: {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 10,
    lineHeight: 60,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#E94057',
    marginVertical: 10,
    paddingHorizontal: 110,
    paddingVertical: 18,
    borderRadius: 10,
  },
  buttonResend: {
    backgroundColor: '#ffffff',
    marginVertical: 10,
    paddingHorizontal: 110,
    paddingVertical: 18,
    borderRadius: 10,
    borderColor: '#E94057',
    borderWidth: 1,
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  buttonResendText: {
    backgroundColor: '#ffffff',
    color: '#E94057',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
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
})
