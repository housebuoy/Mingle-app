import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, ActivityIndicator, Modal } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import locationsvg from '../assets/images/locationsvg.png'
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const db = getFirestore();
const auth = getAuth();


const EnableLocationScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission Denied', 'Permission to access location was denied');
        setModalMessage('We need to access your location');
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
      }
    } else {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission Denied', 'Permission to access location was denied');
          setModalMessage('We need to access your location');
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 3000);
        } else {
          console.log('You can use the location');
          setModalMessage('Location granted');
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 3000);
        }
      } catch (err) {
        console.warn(err);
        setModalMessage(err.message);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
      }
    }
  };

  const handleAccessLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;
      const userId = auth.currentUser.uid;

      const addresses = await Location.reverseGeocodeAsync(location.coords);
      const address = addresses.length > 0 ? addresses[0] : {street: '', city: '', state: '', country: '', postalCode: '',subregion: '' ,};
      console.log(location);
      console.log(address);
      console.log(address.city);
      navigation.navigate('Searchfriend');      
      await storeLocationData(userId, latitude, longitude, address);
    } catch (error) {
      console.error('Error', 'Failed to access location');
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalMessage(""); // Optional: Reset the message when closing the modal
  };

  

    const storeLocationData = async (userId, latitude, longitude, address) => {
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          location: {
            latitude,
            longitude,
          },
            address: {
              street: address.street || '',
              city: address.city || '',
              state: address.region || '',
              country: address.country || '',
              postalCode: address.postalCode || '',
              subregion: address.subregion || ''
            },
        });
        console.log('Location data updated successfully');
      } catch (error) {
        console.error('Error storing location data:', error);
      }
    };





  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Searchfriend')}>
        <Text style={{fontFamily: 'Poppins-Bold', fontSize: 20, color: "#E94057", lineHeight: 50, marginTop: 0 }}>Skip</Text>
      </TouchableOpacity> */}
      <View style={styles.iconContainer}>
        <Image source={locationsvg}/>
      </View>
      <Text style={styles.title}>Enable Locations</Text>
      <Text style={styles.description}>
        Grant app permission to location to have a full experience of the app.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleAccessLocation}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
            ) : (
          <Text style={styles.buttonText}>Access Location</Text>
        )}
      </TouchableOpacity>
      <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                closeModal();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalMessage}</Text>
            </View>
          </View>
        </Modal>
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
    fontSize: 22,
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
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
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
});

export default EnableLocationScreen;
