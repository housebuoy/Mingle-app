import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState, useCallback } from 'react';
import BottomNavBar from '../components/BottomNavBar'
import cards from '../assets/images/icons/card-solid-trans.png';
import heart from '../assets/images/icons/heart-solid-36.png';
import messages from '../assets/images/icons/message-square-detail-solid-36.png';
import user from '../assets/images/icons/user-solid-36.png';
import { Icon } from '@rneui/themed';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GalleryViewer from '../components/GalleryViewer';
import * as ImagePicker from 'expo-image-picker';
import female1 from '../assets/images/user-solid-60.png'
import { differenceInYears } from 'date-fns';



const UserMatchesInfoScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { userId, userName } = route.params;
  const [currentUserLocation, setCurrentUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [userData, setUserData] = useState(null);  // Initialize userData as null
  const [storedUserId, setStoredUserId] = useState(null);
  const [error, setError] = useState(null);
  

  const toggleReveal = () => {
    setReveal(!reveal);
  };

const db = getFirestore();
const auth = getAuth();

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = route.params?.userId; // Get userId from route.params
        if (userId) {
          const db = getFirestore(); // Initialize Firestore
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const birthdate = new Date(userData.birthdate.toDate());
            const age = differenceInYears(new Date(), birthdate);
            const gallery = userData.gallery || [];

            const updatedUserData = {
              ...userData,
              age,
              gallery,
            };

            setUserData(updatedUserData);

            const currentUserData = await AsyncStorage.getItem('userdata');
            if (currentUserData) {
              const parsedUserData = JSON.parse(currentUserData);
              const { latitude, longitude } = parsedUserData.location;

              setCurrentUserLocation({ latitude, longitude });

              const userLatitude = userData.location.latitude;
              const userLongitude = userData.location.longitude;

              const distance = haversineDistance(latitude, longitude, userLatitude, userLongitude);
              setDistance(distance.toFixed(2));
            }
          } else {
            console.error('No such document!');
          }
        } else {
          console.error('No user ID provided in route parameters');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [route.params?.userId]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#e94057" style={{ flex: 1 }} />
    );
  }

  if (!userData) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24 }}>User data not found.</Text>
      </View>
    );
  }
    
  
    if (loading) {
      return (
        <ActivityIndicator size="large" color="#e94057" style={{flex:1}}/>
      );
    }
  


    const closeModal = () => {
      setModalVisible(false);
      setModalMessage(""); // Optional: Reset the message when closing the modal
    };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={{ width: '100%', height: 130, borderRadius: 60, marginTop: 5, alignItems: 'center' }}>
          <Image
            source={userData.profileImageUrl ? { uri: userData.profileImageUrl } : female1}
            resizeMode='cover'
            style={{ width: 130, height: '100%', borderBottomLeftRadius: 30, borderTopRightRadius: 30, padding: 2 }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0 }}>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24 }}>{userData.firstName} {userData.lastName}, {userData.age}</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: -7 }}>{userData.occupation}</Text>
          </View>
          {/* <TouchableOpacity style={styles.topRightNav} onPress={() => navigation.navigate('ProfileUpdate')}>
            <Icon name="user-edit" type='font-awesome-5' size={24} color="#E94057" />
          </TouchableOpacity> */}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>Username</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: -7 }}>{userData.username}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>Email Address</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: -7 }}>{userData.email}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>Gender</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: -7 }}>{userData.gender}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>Location</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: -7 }}>{userData.address?.city}, {userData.address?.country}</Text>
          </View>
          <View style={[styles.topRightNav, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
            <Icon name="location-pin" size={24} color="#E94057" />
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>{distance} km</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 10 }}>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>About</Text>
            {reveal ? (
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: 2 }}>
                {userData.userInfo}
              </Text>
            ) : (
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: 2 }}>
                {userData.userInfo.length > 50 ? userData.userInfo.slice(0, 76) + '...' : userData.userInfo}
              </Text>
            )}
          </View>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={toggleReveal}>
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#E94057' }}>{reveal ? 'Read less' : 'Read more'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>Interests</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 5 }}>
            {userData.interests && userData.interests.map((interest, index) => (
              <TouchableOpacity key={index} style={[styles.interestTab, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={styles.interestTabText}>{interest}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 10 }}>
          {modalVisible && (
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>{modalMessage}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserMatchesInfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  topRightNav: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E8E6EA',
    borderRadius: 10,
  },
  scrollContainer: {
    paddingTop: 0,
    paddingHorizontal: 30,
  },
  interestTab:{
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E94057',
    borderRadius: 8,
  },
  galleryTab1:{
    paddingHorizontal: 30,
    width: '40%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E94057',
    borderRadius: 8,
  },
  interestTabText:{
    color: '#E94057',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,

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
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 50,
  },
})