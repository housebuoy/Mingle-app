import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import DropDown from '../components/DropDown';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const db = getFirestore();
const auth = getAuth();

const GenderScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [error, setError] = useState('');


  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    console.log('Selected gender:', gender);
  };

  const saveGenderToFirestore = async (userId, selectedGender) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        gender: selectedGender,
      });
      console.log('User gender updated successfully');
    } catch (error) {
      setError('Error storing gender: ' + error.message);
      console.error('Error storing gender:', error);
    }
  };
  const userId = auth.currentUser.uid;

  const handleGenderStore = async () => {
    console.log(userId)
    try {
      await saveGenderToFirestore(userId, selectedGender);
      console.log('Gender updated');
      navigation.navigate('Interests');
    } catch (error) {
      setError('Failed to update gender: ' + error.message);
      console.error('Error', error);
    }
  };


  return (
    <View style={styles.gendercontainer}>
      <Pressable style={{alignSelf: 'flex-start', }} onPress={() => navigation.goBack()}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 40, color: "#E94057", lineHeight: 50, marginTop: -100 }}>
            {'<'}
          </Text>
      </Pressable>
      <Pressable style={{alignSelf: 'flex-end', }} onPress={() => navigation.navigate('Interests')}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color: "#E94057", lineHeight: 50, marginTop: -100 }}>
            Skip
          </Text>
      </Pressable>
      <Text style={styles.gendertitle}>I am a</Text>
      <TouchableOpacity
        style={[
          styles.option,
          selectedGender === 'Woman' && styles.selectedOption,
        ]}
        onPress={() => handleGenderSelect('Woman')}
      >
        <Text
          style={[
            styles.genderoptionText,
            selectedGender === 'Woman' && styles.selectedGenderText,
          ]}
        >Woman</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedGender === 'Man' && styles.selectedOption,
        ]}
        onPress={() => handleGenderSelect('Man')}
      >
        <Text
          style={[
            styles.genderoptionText,
            selectedGender === 'Man' && styles.selectedGenderText,
          ]}
        >Man</Text>
      </TouchableOpacity>
      <DropDown onGenderSelect={handleGenderSelect}/>
      <TouchableOpacity style={styles.gendercontinueButton} onPress={() => handleGenderStore()}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  gendercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  genderheader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 50,
  },
  backButton: {
    fontSize: 18,
    color: '#000',
    padding: 10,
  },
  gendertitle: {
    fontSize: 44,
    marginVertical: 20,
    fontFamily: 'Poppins-Bold'
  },
  option: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    paddingHorizontal: 55,
    paddingVertical: 18,
    borderRadius: 10,
  },
  selectedOption: {
    borderColor: '#E94057',
    backgroundColor: '#E94057',
  },
  genderoptionText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold'
  },
  selectedGenderText: {
    color: 'white'
  },
  gendercontinueButton: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
    backgroundColor: '#E94057',
    marginVertical: 10,
    paddingHorizontal: 55,
    paddingVertical: 18,
    borderRadius: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold'
  },
})