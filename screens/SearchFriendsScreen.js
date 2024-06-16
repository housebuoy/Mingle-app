import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Contacts from 'expo-contacts';

import friend from '../assets/images/friend.png'

const SearchFriendsScreen = ({navigation}) => {
  const [contactsPermission, setContactsPermission] = useState(null);

  useEffect(() => {
    const getContactsPermission = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setContactsPermission(status);
    };
    getContactsPermission();
  }, []);

  const handleAccessButtonPress = async () => {
    if (contactsPermission === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails],
      })
      console.log("permission granted")
      navigation.navigate('AllowNotification')
      ;
      if (data.length > 0) {
        const contact = data[0];
        console.log(contact);
      }
    } else {
      const { status } = await Contacts.requestPermissionsAsync();
      setContactsPermission(status);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Image source={friend} />
        <Text style={styles.title}>Search friends</Text>
        <Text style={styles.subtitle}>Get connected with friends from your contact list</Text>
      </View>

      <TouchableOpacity style={styles.accessButton} onPress={handleAccessButtonPress}>
        <Text style={styles.accessButtonText}>
          {contactsPermission === 'granted'
            ? 'Access your contact list'
            : 'Request access to contact list'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  skipButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 40,
  },
  skipButtonText: {
    color: '#E94057',
    fontSize: 20,
    fontFamily: 'Poppins-Bold'
  },
  contentContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -90
  },
  title: {
    fontSize: 40,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    fontFamily: 'Poppins-Medium',
  },
  accessButton: {
    backgroundColor: '#E94057',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 150,
    width: '80%',
  },
  accessButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center'
  },
});

export default SearchFriendsScreen;
