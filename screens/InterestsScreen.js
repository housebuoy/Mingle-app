import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Pressable } from 'react-native';

const InterestsScreen = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const interests = [
    { id: 1, label: 'Photography' },
    { id: 2, label: 'Shopping' },
    { id: 3, label: 'Karaoke' },
    { id: 4, label: 'Yoga' },
    { id: 5, label: 'Cooking' },
    { id: 6, label: 'Tennis' },
    { id: 7, label: 'Run' },
    { id: 8, label: 'Swimming' },
    { id: 9, label: 'Art' },
    { id: 10, label: 'Traveling' },
    { id: 11, label: 'Extreme' },
    { id: 12, label: 'Music' },
    { id: 13, label: 'Drink' },
    { id: 14, label: 'Video games' },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <Pressable style={{alignSelf: 'flex-start', }} onPress={() => navigation.goBack()}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 40, color: "#E94057", lineHeight: 50, marginTop: 30 }}>
            {'<'}
          </Text>
      </Pressable>
      <Pressable style={{alignSelf: 'flex-end', }} onPress={() => navigation.navigate('EnableLocation')}>
          <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color: "#E94057", lineHeight: 50, marginTop: -50 }}>
            Skip
          </Text>
      </Pressable>

      <Text style={styles.title}>Your interests</Text>
      <Text style={styles.subtitle}>Select a few of your interests and let everyone know what you're passionate about.</Text>
      <ScrollView contentContainerStyle={styles.interestsContainer}>
        {interests.map(interest => (
          <TouchableOpacity
            key={interest.id}
            style={[
              styles.interestButton,
              selectedInterests.includes(interest.label) && styles.selectedInterestButton
            ]}
            onPress={() => toggleInterest(interest.label)}
          >
            <Text style={[
              styles.interestButtonText,
              selectedInterests.includes(interest.label) && styles.selectedInterestButtonText
            ]}>{interest.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedInterests.length === 0 && styles.disabledContinueButton
        ]}
        disabled={selectedInterests.length === 0}
        onPress={() => navigation.navigate('EnableLocation')}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InterestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 40,
    marginVertical: 5,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center', // Center the subtitle text
    // marginTop: 10,
    marginBottom: 20, // Add margin bottom to create space between subtitle and interests
    fontFamily: 'Poppins-Medium',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 0,
    paddingHorizontal: 10, // Add padding to make space around the interests
  },
  interestButton: {
    width: '48%',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  selectedInterestButton: {
    backgroundColor: '#E94057',
  },
  interestButtonText: {
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  selectedInterestButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  continueButton: {
    backgroundColor: '#E94057',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60, // Add margin to create space between continue button and bottom
    width: '80%', // Make the continue button take 80% of the width
    alignSelf: 'center', // Center the continue button
  },
  disabledContinueButton: {
    backgroundColor: '#ffcccc',
  },
  continueButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
  },
})