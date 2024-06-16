import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import notification from '../assets/images/notification.png'
import * as Notifications from 'expo-notifications';

const AllowNotificationScreen = () => {
  const [notificationPermission, setNotificationPermission] = useState(null);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationPermission(status);
  };

  const handleNotificationButtonPress = async () => {
    if (notificationPermission === 'granted') {
      console.log('Notification permission already granted');
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      setNotificationPermission(status);
      if (status === 'granted') {
        console.log('Notification permission granted');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Image source={notification}/>
        <Text style={styles.title}>Enable Notifications</Text>
        <Text style={styles.subtitle}>Get push-notification when you get the match or receive a message.</Text>
      </View>

      <TouchableOpacity style={styles.accessButton} onPress={handleNotificationButtonPress}>
        <Text style={styles.accessButtonText}>Turn on notification</Text>
      </TouchableOpacity>
    </View>
  );
};



export default AllowNotificationScreen;


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
    marginBottom: -10,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 36,
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


// export default AllowNotificationScreen;
