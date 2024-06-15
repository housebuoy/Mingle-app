import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, TouchableOpacity,Pressable, Image, Modal } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';// import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import female1 from '../assets/images/onboarding/female1.png'
import ImageViewer from '../components/ImageViewer';

const ProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  //Birthdate calendar
  const [date, setDate] = useState(new Date(1598051730000));
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


  //Image Picker
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.');
    }
  };
  


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContainer}>
      <Pressable style={{alignSelf: 'flex-end', }}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color: "#E94057", lineHeight: 25, marginTop: -100 }}>
            Skip
          </Text>
        </Pressable>
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
        <TouchableOpacity style={styles.birthdayButton} onPress={showDatepicker}>
          <Text style={styles.birthdayButtonText}>
            Birthday-
          {date.toLocaleDateString()}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('Gender')}>
          <Text style={styles.profilebuttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
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
  },
  profileImageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#E94057',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    color: 'white',
    fontSize: 20,
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
  birthdayButton: {
    backgroundColor: '#FDECEE',
    paddingVertical: 15,
    paddingHorizontal: 0,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 0,
    width: '100%'
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
  }
})