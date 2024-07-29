import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image,  Modal, Pressable, SafeAreaView, Linking } from 'react-native';
import React, {useState, useRef} from 'react'
import {getAuth} from 'firebase/auth'
import DropDown from '../components/DropDown';

const data = [
    { label: 'None', value: '1' },
    { label: 'Harassment', value: '2' },
    { label: 'Infringement', value: '3' },
    { label: 'Spam', value: '4' },
    { label: 'Privacy violations', value: '5' },
    { label: 'Violence/Threats', value: '6' },
    { label: 'Other', value: '7' },
  ];

const ReportUser = ({navigation}) => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [reportInfo, setReportInfo] = useState('');
    const [selectedReason, setselectedReason] = useState('');
    const [validateMessage, setValidateMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const isFocused = useRef(false);

    const handleGenderSelect = (selectedReason) => {
        setselectedReason(selectedReason);
        console.log('Selected reason:', selectedReason);
    };

    const sendEmail = (email, subject, body) => {
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(url)
          .then((supported) => {
            if (!supported) {
              console.log('Email not supported');
            } else {
              return Linking.openURL(url);
            }
          })
          .catch((err) => console.error('An error occurred', err));
      };
      

    const validateEmail = (email) => {
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(email)) {
          setEmailError("Please enter a valid email address.");
          return false;
        }
        setEmailError(""); // Clear the error message if the email is valid
        // login();
        return true;
      };
    
      const validateForm = () => {
        return email!== '' ;
      };

      const reportUser= () =>{
        if (validateForm() && (selectedReason !== '' || reportInfo !== '')) {
            const subject = 'User Report';
            const body = `User email: ${email}\nReason: ${selectedReason}\nAdditional Info: ${reportInfo}`;
            sendEmail('datingappmingle@gmail.com', subject, body);
        setModalMessage("Our team will look into your report in no time");
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
            navigation.navigate('Account')
          }, 3000);
        }else {
            setModalMessage("Please fill all required fields!");
            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
            }, 1000);
          }
      }

      const closeModal = () => {
        setModalVisible(false);
        setModalMessage(""); // Optional: Reset the message when closing the modal
      };
      
  return (
    <SafeAreaView style={styles.container}>
        <Pressable style={{alignSelf: 'flex-start', }} onPress={() => navigation.goBack()}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 40, color: "#E94057", lineHeight: 50, marginTop: -10, marginLeft: 10 }}>
            {'<'}
          </Text>
      </Pressable>
    <ScrollView style={styles.container}>
      <View style={styles.centeredContainer}>
        <Text style={{marginTop: 10, color: 'red'}}>{validateMessage}</Text>
        <Text style={styles.signInTitle}>Report User</Text>
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: 22, color: "#8D8B8B", lineHeight: 25, textAlign: 'center', marginBottom: 20}}>Help us get rid of those who violate our community guidelines.</Text>
        <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', gap: 10, marginTop: 10, }}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Email Address
            </Text>
            <TextInput
              style={[styles.input,!email? styles.requiredField : {}]}
              onBlur={() => (isFocused.current = false)}
              placeholder="Enter User's Email address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text); // Validate the email as the user types
              }}
            />
          
          {emailError && <Text style={{color: 'red'}}>{emailError}</Text>}
          </View>
          <View style={styles.optionContainer}>
            <Text style={[styles.inputLabel, {textAlign: 'left'}]}>
                What are your reasons?
            </Text>
          </View>
          <DropDown onGenderSelect={handleGenderSelect} data={data}/>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Other reasons
            </Text>
            <TextInput
                style={styles.infoInput}
                placeholder="Tell us more"
                value={reportInfo}
                multiline
                onChangeText={setReportInfo}
            />
          </View>
        <TouchableOpacity onPress={reportUser} style={styles.button}>
            <Text style={styles.buttonText}>
                Continue
            </Text>
        </TouchableOpacity>
        
      </View>
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
      </View >
    </ScrollView>
    </SafeAreaView>
  )
}

export default ReportUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
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
    //   inputButton: {
    //     backgroundColor: '#E94057',
    //     paddingVertical: 15,
    //     paddingHorizontal: 40,
    //     borderRadius: 25,
    //     alignItems: 'center',
    //     width: '100%',
    //   },
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
        width: '90%',
        paddingHorizontal:  13,
        paddingVertical : 3,
      },
      optionContainer:{
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: '#000',
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '90%',
        paddingHorizontal:  13,
        marginBottom: -15
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
        fontSize: 20,
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
      infoInput: {
        width: '100%',
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'Poppins-Medium'
      },
})