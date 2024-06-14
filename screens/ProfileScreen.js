import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity,Pressable, Image, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
// import { Calendar } from 'react-native-calendars';
// import styles from './styles';

const ProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const selectProfileImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleDayPress = (day) => {
    setBirthday(day.dateString);
    setCalendarVisible(false);
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
        <TouchableOpacity style={styles.profileImageContainer} onPress={selectProfileImage}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/images/onboarding/female1.png')}
            style={styles.profileImage}
            resizeMode='cover'
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
        <TouchableOpacity style={styles.birthdayButton} onPress={() => setCalendarVisible(true)}>
          <Text style={styles.birthdayButtonText}>
            {birthday ? birthday : 'Choose birthday date'}
          </Text>
        </TouchableOpacity>
        {/* <Modal visible={isCalendarVisible} transparent={true} animationType="slide">
          <View style={styles.calendarModal}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{ [birthday]: { selected: true, marked: true, selectedColor: '#FF5733' } }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setCalendarVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}
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
    backgroundColor: '#F8D7DA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  birthdayButtonText: {
    color: '#E94057',
    fontSize: 16,
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
  }
})