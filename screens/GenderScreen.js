import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

const GenderScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <View style={styles.gendercontainer}>
      <View style={styles.genderheader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.gendertitle}>I am a</Text>
      <TouchableOpacity
        style={[
          styles.option,
          selectedGender === 'Woman' && styles.selectedOption,
        ]}
        onPress={() => handleGenderSelect('Woman')}
      >
        <Text style={styles.genderoptionText}>Woman</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedGender === 'Man' && styles.selectedOption,
        ]}
        onPress={() => handleGenderSelect('Man')}
      >
        <Text style={styles.genderoptionText}>Man</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          selectedGender === 'Other' && styles.selectedOption,
        ]}
        onPress={() => handleGenderSelect('Other')}
      >
        <Text style={styles.genderoptionText}>Choose another</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.gendercontinueButton} onPress={() => navigation.navigate('Interests')}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderScreen;
