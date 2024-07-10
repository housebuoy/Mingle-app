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
import { useUser } from '../context/UseContext';
import female1 from '../assets/images/user-solid-60.png'

const db = getFirestore();
const auth = getAuth();
const AccountProfileScreen = ({navigation}) => {
  const [galleryImages, setGalleryImages] = useState([]);
  // const [userData, setUserData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { userData, loading, error } = useUser();


  const toggleReveal = () => {
    setReveal(!reveal);
  };

  const data = 
    {
      id: '1',
      name: 'Jessica Parker',
      age: 23,
      profession: 'Professional model',
      location: 'Chicago, Ghana',
      distance: '1 km',
      image: require('../assets/images/photo.png'),
      activity: require('../assets/images/photo.png'),
      about: 'My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading..',
    }

    const pickGalleryImagesAsync = async () => {
      if ((galleryImages || []).length >= 5) {
        setModalMessage('You can only add up to 5 images');
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
        return;
      }
  
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setModalMessage('Sorry, we need camera roll permissions to select images');
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
  
      if (!result.canceled) {
        setIsLoading(true);
        const auth = getAuth();
        const userId = await AsyncStorage.getItem('userToken');
  
        if (userId) {
          const storage = getStorage();
          const firestore = getFirestore();
  
          const newImages = await Promise.all(
            result.assets.map(async (asset) => {
              try {
                const response = await fetch(asset.uri);
                const blob = await response.blob();
                const metadata = {
                  contentType: 'image/jpeg',
                };
                const fileName = `${Date.now()}-${asset.fileName}`;
                const storagePath = `users/${userId}/${fileName}`;
                const imageRef = ref(storage, storagePath);
                const snapshot = await uploadBytes(imageRef, blob, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
  
                const userRef = doc(firestore, 'users', userId);
                await updateDoc(userRef, {
                  gallery: arrayUnion({ downloadURL, storagePath }),
                });
  
                return { downloadURL, storagePath };
              } catch (error) {
                console.error('Error uploading image:', error);
                setModalMessage('Error uploading image:', error);
                setModalVisible(true);
                setTimeout(() => {
                  setModalVisible(false);
                }, 3000);
                return null;
              }
            })
          );
  
          setGalleryImages([...galleryImages, ...newImages.filter(Boolean)]);
        } else {
          setModalMessage('You need to be signed in to upload images.');
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 1000);
        }
        setIsLoading(false);
      } else {
        setModalMessage("You didn't add any images to the gallery");
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      }
    };
  
    const removeImage = async (index) => {
      setIsLoading(true);
  
      try {
        const auth = getAuth();
        const userId = await AsyncStorage.getItem('userToken');
  
        if (userId) {
          const storage = getStorage();
          const firestore = getFirestore();
  
          const image = galleryImages[index];
          const { storagePath, downloadURL } = image;

          
  
          const imageRef = ref(storage, storagePath);
  
          await deleteObject(imageRef);
  
          const userRef = doc(firestore, 'users', userId);
          await updateDoc(userRef, {
            gallery: arrayRemove({ downloadURL, storagePath }),
          });
  
          setGalleryImages(galleryImages.filter((_, i) => i !== index));
        } else {
          setModalMessage('You need to be signed in to remove images.');
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 1000);
        }
      } catch (error) {
        console.error('Error removing image:', error);
        setModalMessage('Error removing image.');
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      } finally {
        setIsLoading(false);
      }
    };
    
    
    

    // const fetchUserData = async () => {
    //   try {
    //   const userId = await AsyncStorage.getItem('userToken');
    //   if (userId) {
    //     const userRef = doc(db, 'users', userId);
        
    //       const docSnap = await getDoc(userRef);
    //       if (docSnap.exists()) {
    //         const userData = docSnap.data();
    //         // getting the age from the user
    //         const birthdate = new Date(userData.birthdate.toDate());
    //         const age = differenceInYears(new Date(), birthdate);
    //         const gallery = userData.gallery || [];
    //         const userInfo = userData.userInfo
    //         setUserData({
    //           ...userData,
    //           age,
    //           gallery,
    //         });
    //         setGalleryImages(gallery);
    //       } else {
    //         console.error('No such document!');
    //       }    
    //     setLoading(false);
    //   } else {
    //     console.error('No user is signed in');
    //     setLoading(false);
    //   }} catch (error) {
    //     setError(error);
    //     console.error('Error fetching user data:', error);
    //     setModalMessage('Error fetching user data:', error);
    //     setModalVisible(true);
    //     setTimeout(() => {
    //       setModalVisible(false);
    //     }, 3000);
    //   }
    // };
  
    // useEffect(() => {
    //   fetchUserData();
    // }, []);
  
  
    if (loading) {
      return (
        <ActivityIndicator size="large" color="#e94057" style={{flex:1}}/>
      );
    }
  
    if (error) {
      setModalMessage('Something went wrong! Login again');
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
      return (
        <View style={styles.errorContainer}>
          <Text>Error: {error.message}</Text>
        </View>
      );
    }

    const closeModal = () => {
      setModalVisible(false);
      setModalMessage(""); // Optional: Reset the message when closing the modal
    };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={{width: '100%', height: 130, borderRadius: 60, marginTop: 5, alignItems: 'center'}}>
          <Image source={userData.profileImageUrl ? { uri: userData.profileImageUrl } : female1} resizeMode='cover' style={{width: 130, height: '100%', borderBottomLeftRadius: 30 , borderTopRightRadius: 30 , padding: 2}}/>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20}}>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0}}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 24}}>{userData.firstName} {userData.lastName}, {userData.age}</Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: -7}}>{userData.occupation}</Text>
          </View>
          <TouchableOpacity style={styles.topRightNav} onPress={() => navigation.navigate('ProfileUpdate')}>
            <Icon name="user-edit" type='font-awesome-5' size={24} color="#E94057" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>Location</Text>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 18, color: '#7f7e7e', marginTop: -7}}>{userData.address.city}, {userData.address.country}</Text>
          </View>
          <TouchableOpacity style={[styles.topRightNav, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]} >
            <Icon name="location-pin" size={24} color="#E94057" />
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 12}}>{data.distance}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 10}}>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0}}>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>About</Text>
            {reveal ? (
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            color: '#7f7e7e',
            marginTop: 2,
          }}
        >
          {userData.userInfo}
        </Text>
      ) : (
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            color: '#7f7e7e',
            marginTop: 2,
          }}
        >
          {userData.userInfo.length > 50
            ? userData.userInfo.slice(0, 76) + '...'
          : userData.userInfo}
        </Text>
      )}
          </View>
          <TouchableOpacity style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}  onPress={toggleReveal}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16, color: '#E94057'}}>{reveal ? 'Read less' : 'Read more'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 10}}>
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>Interests</Text>
          <View  style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 5}}>            
              {userData.interests && userData.interests.map((interest, index) => (
                <TouchableOpacity style={[styles.interestTab, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]} >
                  <Text key={index} style={styles.interestTabText}>{interest}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>Gallery</Text>
          <View>
            <GalleryViewer images={galleryImages} onRemoveImage={removeImage} />
            <TouchableOpacity
              style={[styles.galleryTab1]}
              onPress={pickGalleryImagesAsync}
            >
              <Icon name="add-photo-alternate" size={48} color="#E94057" />
            </TouchableOpacity>
          </View>

      {modalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
          </View>
        </View>
      )}
    </View>
        
      </ScrollView>
      <BottomNavBar navigation={navigation} 
                    cardIcon={cards}
                    matchIcon={heart}
                    messageIcon={messages}
                    userIcon={user}
      />
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
    </SafeAreaView>
  )
}

export default AccountProfileScreen

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