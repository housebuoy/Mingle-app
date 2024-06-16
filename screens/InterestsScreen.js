import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';

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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>
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
        onPress={() => navigation.navigate('Location')}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InterestsScreen;
