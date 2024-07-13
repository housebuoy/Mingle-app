import React, { useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity,Pressable, Image, Modal, ActivityIndicator } from 'react-native';
// import firebase from 'firebase/app';
import 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';// import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import female1 from '../assets/images/user-solid-60.png'
import calendar from '../assets/images/calendar-solid-24.png'
import ImageViewer from '../components/ImageViewer';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore();
const auth = getAuth();
const ProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [occupation, setOccupation] = useState(''); 
  const [userInfo, setUserInfo] = useState(''); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loading, setLoading] = useState(false);
 
  

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  //Birthdate calendar
  const [date, setDate] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  
    if (!result.canceled) {
      await uploadProfileImage(result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
      setModalVisible(false);
    } else {
      setModalMessage("You didn't add a profile pic");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    }
  };
  
  const uploadProfileImage = async (imageUri) => {
    setLoading(true);
  
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is signed in');
      }
  
      const userId = user.uid;
      const storage = getStorage();
      const storageRef = ref(storage, `users/${userId}/profile.jpg`);
  
      // Convert the image to a blob
      const response = await fetch(imageUri);
      const blob = await response.blob();
  
      // Upload the blob to Firebase Storage
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      // Save the download URL to Firestore
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, {
        profileImageUrl: downloadURL,
      });
  
      console.log('Profile image uploaded and URL saved to Firestore');
    } catch (error) {
      console.error('Error uploading profile image:', error);
      setModalMessage('Failed to upload profile image');
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };
  
  const saveProfileToFirestore = async (userId, firstName, lastName, occupation, date, selectedImage, userInfo) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
        occupation: occupation,
        birthdate: date,
        profileImageUrl: selectedImage, // Use the selected image URL from Firebase Storage
        userInfo: userInfo,
      });
      console.log('User profile info updated successfully');
    } catch (error) {
      console.error('Error storing profile info:', error);
    }
  };


const handleProfileUpdate = async () => {
  try {
    const userId = await AsyncStorage.getItem('userToken');
    if(firstName !== '' && lastName !== '' && occupation !== '' && date !== null && selectedImage !== null && userInfo !== ''){
        await saveProfileToFirestore(userId, firstName, lastName, occupation, date, selectedImage, userInfo);
            console.log('profile updated');
            navigation.navigate('Gender')
    }else{
      setModalMessage('Please fill all fields including the profile image');
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    }
    
  } catch (error) {
    console.error('Error', 'Failed to update profile');
    console.error(error);
  }
};
  


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContainer}>
      {/* <Pressable style={{alignSelf: 'flex-end', }} onPress={() => navigation.navigate('Gender')}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color: "#E94057", lineHeight: 25, marginTop: -100 }}>
            Skip
          </Text>
        </Pressable> */}
        <Text style={styles.profileTitle}>Profile details</Text>
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImageAsync}>
        <ImageViewer
          placeholderImageSource={female1}
          selectedImage={selectedImage}
        />
          <View style={styles.profileImageOverlay}>
            <Text style={styles.profileImageText}>+</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.profileinput}
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.profileinput}
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.profileinput}
          placeholder="Occupation"
          value={occupation}
          onChangeText={setOccupation}
        />
                <TextInput
          style={styles.infoInput}
          placeholder="More Info"
          value={userInfo}
          multiline
          onChangeText={setUserInfo}
        />
        <TouchableOpacity style={styles.birthdayButton} onPress={showDatepicker}>
          <Image source={calendar} style={{width: 24, height: 24}}/>
          <Text style={styles.birthdayButtonText}>
            {date ? date.toLocaleDateString() : 'Choose Birthday' }
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date || new Date()}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={() => {
          handleProfileUpdate()
          }}>
            {loading ? (
                <ActivityIndicator size="large" color="#fff" />
                ) : (
                <Text style={styles.profilebuttonText}>Confirm</Text>
            )}
        </TouchableOpacity>
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
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    profileTitle: {
    fontSize: 34,
    // fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold'
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    // borderTopLeftRadius: 20,
  },
  profileImageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#E94057',
    width: 30,
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins-Bold'
  },
  profileinput: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    fontSize: 20,
    marginBottom: 20,
    borderRadius: 15,
    fontFamily: 'Poppins-Bold'
  },
  infoInput: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    fontSize: 20,
    marginBottom: 20,
    borderRadius: 15,
    fontFamily: 'Poppins-Bold'
  },
  birthdayButton: {
    backgroundColor: '#FDECEE',
    paddingVertical: 15,
    paddingHorizontal: 0,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
    justifyContent : "center",
    flexDirection: 'row',
    gap: 10
  },
  birthdayButtonText: {
    color: '#E94057',
    fontSize: 16,
    fontFamily: 'Poppins-Bold'
  },
  confirmButton: {
    backgroundColor: '#E94057',
    paddingVertical: 15,
    paddingHorizontal: 0,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  profilebuttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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