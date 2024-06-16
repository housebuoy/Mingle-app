import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import locationsvg from '../assets/images/locationsvg.png'
// import Icon from 'react-native-vector-icons/FontAwesome';

const EnableLocationScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission Denied', 'Permission to access location was denied');
      }
    } else {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission Denied', 'Permission to access location was denied');
        } else {
          console.log('You can use the location');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleAccessLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      console.log(location);
      // navigation.navigate('Searchfriend');  // Navigate to the SearchFriends screen
    } catch (error) {
      console.error('Error', 'Failed to access location');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Searchfriend')}>
        <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color: "#E94057", lineHeight: 50, marginTop: 0 }}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <Image source={locationsvg}/>
      </View>
      <Text style={styles.title}>Enable Locations</Text>
      <Text style={styles.description}>
        Grant app permission to location to have a full experience of the app.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleAccessLocation}>
        <Text style={styles.buttonText}>Access Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#e0f7fa',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 36,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7d7d7d',
    marginBottom: 40,
    fontFamily: 'Poppins-Medium'
  },
  button: {
    backgroundColor: '#E94057',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '80%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
});

export default EnableLocationScreen;
