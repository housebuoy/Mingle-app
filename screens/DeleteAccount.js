import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image,  Modal, Alert, } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteAccount = ({navigation, route}) => {
    const { screenName } = route.params;
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [deleteText, setDeleteText] = useState('');
    const [validateMessage, setValidateMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const isFocused = useRef(false);

    useEffect(() => {
        // Ensure the user is authenticated
        const checkUser = async () => {
            console.log(auth.currentUser.uid)
            const userToken = await AsyncStorage.getItem('userToken');
            if (!userToken) {
                setModalMessage("User is not authenticated.");
                setModalVisible(true);
                setTimeout(() => {
                    setModalVisible(false);
                }, 3000);
            }
        };
        checkUser();
    }, []);

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
        if (email === '' || password === '' || deleteText !== 'Delete Account') {
            setValidateMessage("Please fill all required fields correctly!");
            return false;
        }
        return true;
    };

        const handleAccountDeletion = async () => {
        try {
            if (validateForm()) {
                const currentUser = auth.currentUser;
                console.log(auth.currentUser)
                if (currentUser) {
                    // Re-authenticate the user
                    const credential = EmailAuthProvider.credential(email, password);
                    await reauthenticateWithCredential(currentUser, credential);

                    // Proceed to delete the user account
                    await deleteUser(currentUser);
                    await AsyncStorage.removeItem('userToken');
                    setModalMessage("Your account has been deleted.");
                    setModalVisible(true);
                    setTimeout(() => {
                        setModalVisible(false);
                        navigation.navigate('Login'); // Navigate to the appropriate screen after deletion
                    }, 3000);
                } else {
                    setModalMessage("User is not authenticated.");
                    setModalVisible(true);
                    setTimeout(() => {
                        setModalVisible(false);
                    }, 3000);
                    navigation.navigate('Login');
                }
            } else {
                setModalMessage("Please fill all required fields correctly!");
                setModalVisible(true);
                setTimeout(() => {
                    setModalVisible(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error.message)
            setModalMessage(`Error: ${error.message}`);
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
            }, 3000);
        }
    };


    const closeModal = () => {
        setModalVisible(false);
        setModalMessage(""); // Optional: Reset the message when closing the modal
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.centeredContainer}>
                {/* <Text style={{ marginTop: 10, color: 'red' }}>{validateMessage}</Text> */}
                <Text style={styles.signInTitle}>Delete Account</Text>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 22, color: "#8D8B8B", lineHeight: 25, textAlign: 'center', marginBottom: 20 }}>
                    Fill the form below to confirm Account Deletion
                </Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', gap: 10, marginTop: 10 }}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <TextInput
                            style={[styles.input, !email ? styles.requiredField : {}]}
                            onBlur={() => (isFocused.current = false)}
                            placeholder="Enter Email address"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                validateEmail(text); // Validate the email as the user types
                            }}
                        />
                        {emailError && <Text style={{ color: 'red' }}>{emailError}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput
                            style={[styles.input, isFocused.current ? styles.inputFocused : {}, !password ? styles.requiredField : {}]}
                            onBlur={() => (isFocused.current = false)}
                            placeholder="Enter Password"
                            value={password}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        {passwordError && <Text style={{ color: 'red' }}>{passwordError}</Text>}
                    </View>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: '#000', textAlign: 'center' }}>
                        Type "Delete Account" to confirm
                    </Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Confirm Delete</Text>
                        <TextInput
                            style={[styles.input, isFocused.current ? styles.inputFocused : {}, !deleteText ? styles.requiredField : {}]}
                            onBlur={() => (isFocused.current = false)}
                            placeholder="Delete Account"
                            value={deleteText}
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={setDeleteText}
                        />
                        {validateMessage && <Text style={{ color: 'red' }}>{validateMessage}</Text>}
                    </View>
                    <TouchableOpacity onPress={handleAccountDeletion} style={styles.button}>
                        <Text style={styles.buttonText}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
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

export default DeleteAccount

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
        paddingVertical: 50,
        gap: 1,
      },
      signInSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
      },
      inputButton: {
        backgroundColor: '#E94057',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignItems: 'center',
        width: '100%',
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
      input: {
        fontSize: 22,
        fontFamily: 'Poppins-Medium',
        color: '#878686',
        width: '100%',
        paddingHorizontal:  5,
        paddingTop : 5,
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