import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import apple from '../assets/images/signIcons/apple.png';
import facebook from '../assets/images/signIcons/facebook.png';
import google from '../assets/images/signIcons/google.png';
import line from '../assets/images/line.png';
import {getAuth, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'
import SignIn from './SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [validateMessage, setValidateMessage] = useState('');
  const isFocused = useRef(false);


  
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken !== null) {
          // User is already logged in, navigate to the Home screen
          navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Error checking user login:', error);
      }
    };
    checkUserLogin();
  }, [navigation]);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError(""); // Clear the error message if the email is valid
    return true;
  };

  const validateForm = () => {
    return email !== '' && password !== '';
  };

  async function login() {
    if (email === '' || password === '') {
      setModalMessage("Please enter your email and password.");
      setModalVisible(true);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser !== null) {
        // Store the user's login token in AsyncStorage
        await AsyncStorage.setItem('userToken', auth.currentUser.uid);
        navigation.navigate('Home');
      } else {
        setModalMessage("Check your email to reset your password.");
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }, 3000);
      }
    } catch (error) {
      setModalMessage(error.message);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      // Remove the user's login token from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalMessage(""); // Optional: Reset the message when closing the modal
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContainer}>
        <Text style={{marginTop: 10, color: 'red'}}>{validateMessage}</Text>
        <Text style={styles.signInTitle}>Welcome Back!</Text>
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 22, color: "#8D8B8B", lineHeight: 25, textAlign: 'left', marginBottom: 20}}>Please sign in to continue</Text>
        <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', gap: 10, marginTop: 10, }}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Email Address
            </Text>
            <TextInput
              style={[styles.input,!email? styles.requiredField : {}]}
              onBlur={() => (isFocused.current = false)}
              placeholder="Enter Email address"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text); // Validate the email as the user types
              }}
            />
          
          {emailError && <Text style={{color: 'red'}}>{emailError}</Text>}
          </View>        
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Password
              </Text>
              <TextInput
                style={[styles.input, isFocused.current? styles.inputFocused : {},!email? styles.requiredField : {}]}
                onBlur={() => (isFocused.current = false)}
                // keyboardType="visible-password"
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                required
              />
            </View>
          </View>
          <TouchableOpacity  style={{marginRight: -150, marginVertical: 10,}} onPress={()=>navigation.navigate('ForgotPassword') }>
                <Text style={{textAlign: 'right', fontFamily: 'Poppins-Bold'}}>
                    Forgot Password?
                </Text>
            </TouchableOpacity>
          <TouchableOpacity onPress={login} style={styles.button}>
                <Text style={styles.buttonText}>
                    Sign in to Continue
                </Text>
            </TouchableOpacity>

        <View style={{flexDirection: 'row', marginTop: 20, justifyContent: "center", marginHorizontal: 20, marginVertical: 30}}>
            <Image source={line} style={styles.line} resizeMode="contain" />
            <Text style={{fontFamily: 'Poppins-Medium', color: '#000', marginTop: -20, fontSize: 18, textAlign: 'center', width: 70}}>or sign in with</Text>
            <Image source={line} style={styles.line} resizeMode="contain" />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} onPress={() => navigation.navigate('FacebookSignIn')}>
            <Image source={facebook} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => navigation.navigate('GoogleSignIn')}>
            <Image source={google} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => navigation.navigate('AppleSignIn')}>
            <Image source={apple} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        <Text style={{fontFamily: 'Poppins-Bold', color: "#8D8B8B", marginTop: 24, fontSize: 16, textAlign: 'center'}}>
          Don't have an account? <Text style={styles.signInLink} onPress={() => navigation.navigate('SignIn')}>Sign Up</Text>
        </Text>
        <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                closeModal();
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

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 100,
    paddingBottom: 50,
    paddingHorizontal: 5,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 1,
  },
  signInSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#878686',
    width: '100%',
    paddingHorizontal:  5,
    paddingTop : 5,
},
  inputButton: {
    backgroundColor: '#E94057',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 60,
    height: 60,
    justifyContent: 'center',
  },
  signInText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
  signInLink: {
    color: '#FF5733',
    fontWeight: 'bold',
  },
  signInTitle: {
    fontSize: 44,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 10,
    lineHeight: 60,
    textAlign: 'left',
  },
  inputContainer:{
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#cecdcd',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal:  13,
    paddingVertical : 3,
  },
  inputLabel: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#E94057',
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